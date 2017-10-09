// 自执行函数赋值
var num = (function(){
	var obj = {
		a:1,
		b:'zepto'
	}
	return obj;
})()


window.$ === undefined && (window.$ = Zepto)

var s= { a:'abc',b:1};
window.s === undefined && alert(123)	// 执行123
window.s === undefined || alert(123)	// 阻断效应 不执行123


isSimple && !maybeID ?  ( maybeClass ? element.getElementsByClassName(nameOnly) : element.getElementsByTagName(selector) ) :  element.querySelectorAll(selector) 