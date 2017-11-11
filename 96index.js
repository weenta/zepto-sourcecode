var fn = {
    attr: function(name,value){
        if(!arguments[1]){
            if(typeof(name) !== 'string' || this.length==0 || this[0].nodeType !== 1 || !(name in this[0])) return null
            return this[0].getAttribute(name)
        }
        else {
            if(typeof(name) !== 'string' || this.length==0 || this[0].nodeType !== 1) return null
            return this[0].setAttribute(name,value)
        }
    }
}
var node = document.getElementsByTagName('input')
node.__proto__.attr = fn.attr

// let val = node.attr('class','pwd2')
// console.log(val)
// console.log(node.__proto__)
// console.log(document.prototype)
