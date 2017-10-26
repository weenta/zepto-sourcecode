# zepto-sourcecode
zepto1.16源码阅读
**************************

## notes

- `document.getElementsByClassName() / document.getElementsByTagName()等`     	
> 返回`HTMLCollection`类型是`Object` 而非`Array`    
> 所以zepto中使用`[].slice.call()`方法将结果转换为`Array`    		
```js
	let cls = document.getElementsByTagName('span');
	cls instanceof Array	// false
	cls instanceof Object	// true
	
	// document.getElementsByClassName() 同上
```

- `document.querySelectorAll('span')`
	返回的是`NodeList`

- `$('ul')` 的实现原理 
```js
	var slice = [].slice, u, arrU
	u = document.getElementsByTagName('ul')
	arrU = slice.call(u) // arrU 即`zepto.Z`处理前的结果
```			

- `$('span','ul')` 的实现原理 (document中只有一个ul的情况下)
```js
	var slice = [].slice, u, arrU, result, res
	u = document.getElementsByTagName('ul')
	arrU = slice.call(u)	// 转成Array
	result = arrU[0].getElementsByTagName('span')
	res = slice.call(result)
```

- `$("<p />", { text:"Hello", id:"greeting"})` 的实现过程	    
> 最终结果  `<p id=greeting">Hello</p>`    
```js

	// STEP1: 一进 zepto.init 
		else if typeof selector == 'string'  // true	
			selector[0] == '<' && fragmentRE.test(selector) // true
				dom = zepto.fragment(selector, RegExp.$1, context) 

	// STEP2: 一进 zepto.fragment 获取dom
		// html === STEP1 中的selector; RegExp.$1 === p
		if singleTagRE.test(html)	// true	
			dom = $(document.createElement(RegExp.$1))

	// STEP3: 二进 zepto.init
		// 此时selector = document.createElement(p)
		else if typeof selector == 'string'	 	// false
		else if isFunction(selector) 			// false
		else if zepto.isZ(selector) 			// false
		else {
			// 进入else
			else if (isObject(selector)) 	// true
				dom = [selector]
		}
		return zepto.Z(dom, selector)

	// STEP4: 回到STEP2中的 
		// 此时已获取dom
		dom = return zepto.Z(dom, selector)
		// 继续往下走
			if isPlainObject(properties) // true
				nodes = $(dom) 

	// STEP5: 三进zepto.init
		else if (zepto.isZ(selector) // true
			return selector

	// STEP6: 回到STEP4中 
		// 此时已获取nodes值
		nodes = return selector

	// STEP7: $.each()	遍历处理  为 nodes 添加 properties
		$.each() $.text() $.attr() 处理

	// STEP8: zepto.fragment 处理结束
		return dom

	// STEP9: 回到STEP1中
		// 此时得到上一步返回的dom
		dom = zepto.fragment(selector, RegExp.$1, context)
		// 继续 往下走
		selector = null
		return zepto.Z(dom, selector)
		// zepto.Z处理完成后结束
		// 返回结果
		`<p id=greeting">Hello</p>`
```


- `$.type()` 实现原理    
> 使用`Object.prototype.toString.call()` 方法    
> [MDN: Object.prototype.toString()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)
```js
	var fn = function(val){
		return Object.prototype.toString.call(val).slice(8,-1).toLowerCase()
	};
	(function(){
		var num = 1,
		    str = 'abc',
		    arr = [1,2,3],
		    obj = {a:10},
		    d = new Date(),
		    f = function(){},
		    reg = new RegExp(),
		    bo = true,
		    e = Error,
		    nul = null,
		    und = undefined
		
		console.log('num: ',fn(num))
		console.log('str: ',fn(str))
		console.log('arr: ',fn(arr))
		console.log('obj: ',fn(obj))
		console.log('d: ',fn(d))
		console.log('f: ',fn(f))
		console.log('reg: ',fn(reg))
		console.log('bo: ',fn(bo))
		console.log('e: ',fn(e))
		console.log('nul: ',fn(nul))
		console.log('und: ',fn(und))
	})();

	// num:  number
	// str:  string
	// arr:  array
	// obj:  object
	// d:  	 date
	// f:    function
	// reg:  regexp
	// bo:   boolean
	// e:    function
	// nul:  null
	// und:  undefined
```

- `Object.getPrototypeOf()`	    
> 方法返回指定对象的原型（内部[[Prototype]]属性的值)    
可用于判断`Object/Array`类型   
```js
	var obj = { a: 1},
		arr = [1,2]
	
	Object.getPrototypeOf(obj) === Object.prototype 	// true
	Object.getPrototypeOf(arr) === Object.prototype  	// false
	Object.getPrototypeOf(arr) === Array.prototype 		// true
	Object.getPrototypeOf(arr).__proto__ === Object.prototype		// true

	// 检测是否是`Array`一般不用这么麻烦 直接使用 Array.isArray(obj)方法即可
	Array.isArray(arr) //true

``` 


- `$.contains` 实现原理
> 使用`Node.contains()`  
> *returns a Boolean value indicating whether a node is a descendant of a given node or not.*   
> [MDN:Node.contains()](https://developer.mozilla.org/en-US/docs/Web/API/Node/contains)
```js
	var d = document.getElementsByTagName('div')[0],
		u = document.getElementsByTagName('ul')[0],
		l = document.getElementsByTagName('li')[0]

	// Node.contains()
	document.body.contains(d)  // true

	// $.contains
	function c(parent,node){
		var n, res
		if(parent !== node && parent.contains(node)){
		res = true
		}else {
			if(node && ( p  = node.parentNode)){   // 如果node不为空 将node的父节点赋值给n
				if( n === parent){
					res = true
				} else {
					res =  false
				}
			}
		}
		return res
	}
	c(u,l) // true
	$.contains(u,l)  // true
```

- $.camelCase??

- `$.extend(target,source)` 浅copy	 
- `$.extend(true,target,source)` 深copy
> 通过源对象扩展目标对象的属性，源对象属性将覆盖目标对象属性。
```js
// 浅copy实现
	function extend(target,source){
		for (key in source){
			if(source[key] !== undefined){
				target[key] = source[key]
			}
		}
		return target
	}
	var target = { t:'target'},
		source = {
			s:'source',
			obj:{
				o1: 'obj1',
				o2: 'obj2'
			}
		}
	extend(target,source); 
	target; // {t:'target', s:'source',obj:{o1:'obj1',o2:'obj2'}}

	source.obj.o3 = 'obj3'	// source的obj属性改变 target的obj属性会同时变 因为他们的obj属性指向堆内存中同一地址 
	target;	// {t:'target', s:'source',obj:{o1:'obj1',o2:'obj2',o3:'obj3}}

	target.obj.o1 = 'obj111';	// 反之亦然
	source; // {s:'source',obj:{o1:'obj111',o2:'obj2',o3:'obj3}}

// 深copy实现
	function extend(target,source){
		for(key in source){
			// 判断source[key]是否是Object或Array
			if(Object.getPrototypeOf(source[key]) === Object.prototype || Array.isArray(source[key])){
				if((Object.getPrototypeOf(source[key]) === Object.prototype)){
					target[key] = {}
				}
				if(Array.isArray(source[key])){
					target[key] = []
				}
				extend(target[key],source[key])
			} 
			else {
				if(source[key] !== undefined){
					target[key] = source[key]
				} 
			}
		}
		return target
	}

	extend(target,source); 
	source.obj.o3 = 'obj3'	// 此时source的obj属性改变 target的obj属性不变 他们的obj属性指向不同地址
	target;	// {t:'target', s:'source',obj:{o1:'obj1',o2:'obj2'}}

```
