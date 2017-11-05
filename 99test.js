{

addClass: function (name) {
    if (!name) return this  // this指向调用该函数的对象
    return this.each(function (idx) {
        if (!('className' in this)) return
        classList = []
        var cls = className(this), newName = funcArg(this, name, idx, cls)
        newName.split(/\s+/g).forEach(function (klass) {
            if (!$(this).hasClass(klass)) classList.push(klass)
        }, this)
        classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "))
    })
}



// access className property while respecting SVGAnimatedString
// 返回当前node的className
// 如果value不为空 则node的className为value
function className(node, value) {
    var klass = node.className || '',
        svg = klass && klass.baseVal !== undefined

    if (value === undefined) return svg ? klass.baseVal : klass
    svg ? (klass.baseVal = value) : (node.className = value)
}

// newName如果不是function; 返回newName
function funcArg(context, arg, idx, payload) {
    return isFunction(arg) ? arg.call(context, idx, payload) : arg
}

// 判断DOM上是否已存在相同的className
hasClass: function (name) {
    if (!name) return false
    return emptyArray.some.call(this, function (el) {
        // 此处this指向classRE返回的正则
        return this.test(className(el))
    }, classRE(name))
}

// var classCache = {}
// classRE 返回一个正则
function classRE(name) {
    return name in classCache ?
        classCache[name] : (classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'))
};


each: function(callback) {
    emptyArray.every.call(this, function (el, idx) {
        return callback.call(el, idx, el) !== false
    })
    return this
};

$.each = function (elements, callback) {
    var i, key
    if (likeArray(elements)) {
        for (i = 0; i < elements.length; i++){
            if (callback.call(elements[i], i, elements[i]) === false) { 
                return elements
            }
        }
    } else {
        for (key in elements){
            if (callback.call(elements[key], key, elements[key]) === false){
                return elements
            }
        }
    }

    return elements

    
// 
var checkName = function(val){
    let name = 'abc'
    return new RegExp('(^|\\s)' + name + '(\\s|$)').test(val)
}

checkName('abc')    // true
checkName('abc ')    // true
checkName(' abc ')    // true
checkName(' abc    ')    // true
checkName(' ab c')    // false

}
