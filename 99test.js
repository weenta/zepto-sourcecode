var fn = function(){},
arr = [1,2,4],


var class2type = {};
var toString = class2type.toString;
function type(obj) {
	return obj == null ? String(obj) : class2type[toString.call(obj)] || "object"
}

function likeArray(obj) { return typeof obj.length == 'number' }

var arr = ["Boolean", "Number", "String"];
var class2type = {};
var each = function (elements, callback) {
	var i
	for (i = 0; i < elements.length; i++){
		callback.call(elements[i], i, elements[i])
	}
	return elements
}

// Populate the class2type map
// each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (i, name) {
each( arr, function (i, name) {
	class2type["[object " + name + "]"] = name.toLowerCase()
	console.log(i,name)
})

each(["Boolean", "Number"], function (i, name) {
	// console.log(i,name);
	return false
})


function fn(obj){
	console.log(class2type)
	// var t = class2type[{}.toString.call(obj)]
	// console.log(t)
}
Object.prototype.toString().call(new String("ssa"))

