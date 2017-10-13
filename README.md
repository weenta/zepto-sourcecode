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
		return Object.prototype.toString.call(val)
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

	// num:  [object Number]
	// str:  [object String]
	// arr:  [object Array]
	// obj:  [object Object]
	// d:  	 [object Date]
	// f:    [object Function]
	// reg:  [object RegExp]
	// bo:   [object Boolean]
	// e:    [object Function]
	// nul:  [object Null]
	// und:  [object Undefined]
	
```

