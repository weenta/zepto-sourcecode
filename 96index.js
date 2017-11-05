/* var obj = {
	a: '000'
}

var fn = {
	a:'111',
	sayName: function(){
		console.log(this.a)
	}
}

obj.__proto__ = fn;

// console.log(obj)
obj.sayName(); */

var u = document.getElementsByTagName('ul')[0];

var fn = {
	setClassName: function(node,value){
		var clsName = node.className
		if(value === undefined) return clsName
		node.className = value
	},
	
	addClass: function(name){
		let clsNames = []
		let clsName = this.setClassName(this);
		clsNames.push(clsName)
		// 转为数组
		var newName = name.split(/\s+/g);
		newName.forEach((e)=>{
			// 判断原DOM中是否存在相同className
			clsNames.push(e)
		});
		let clsNamesStr = clsNames.join(' ');
		return this.setClassName(this,clsNamesStr)
	}
}

u.__proto__.addClass = fn.addClass;
u.__proto__.setClassName = fn.setClassName;

u.addClass('sec-name fir-name')

