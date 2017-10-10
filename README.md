# zepto-sourcecode
zepto1.16源码阅读
**************************

## notes

- `document.getElementsByClassName() / document.getElementsByTagName()等` 	
	返回`HTMLCollection`类型 而非`Array`	 
	所以zepto中使用`[].slice.call()`方法将其转换为`Array`
			
```js
	let cls = document.getElementsByTagName('span');
	cls.__proto__; // HTMLCollection {Symbol(Symbol.toStringTag): "HTMLCollection", item: ƒ, namedItem: ƒ, constructor: ƒ, …}

	// document.getElementsByClassName() 同上
```

- `document.querySelectorAll('span')`
	返回的是`NodeList`


