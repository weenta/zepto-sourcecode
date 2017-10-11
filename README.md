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

- `$('span','ul')` 的实现原理 (document中只有一个ul的情况)
```js
	var slice = [].slice, u, arrU, result, res
	u = document.getElementsByTagName('ul')
	arrU = slice.call(u)	// 转成Array
	result = arrU[0].getElementsByTagName('span')
	res = slice.call(result)
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
