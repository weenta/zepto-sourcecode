# zepto-sourcecode
zepto1.16源码阅读
**************************

## notes

- `document.getElementsByClassName() / document.getElementsByTagName()等` 	
> 返回`HTMLCollection`类型是`Object` 而非`Array`		 
> 所以zepto中使用`[].slice.call()`方法将其转换为`Array`		
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
	arrU = slice.call(u)
	// arrU 即`zepto.Z`处理前的结果
```			

- `$('span','ul')` 的实现原理 (document中只有一个ul的情况)
```js
	var slice = [].slice, u, arrU, result, res
	u = document.getElementsByTagName('ul')
	arrU = slice.call(u)	// 转成Array
	result = arrU[0].getElementsByTagName('span')
	res = slice.call(result)
```
