each = function (elements, callback) {
    var key
    for (key in elements){
        if (callback.call(1, key, elements[key]) === false){
            console.log(elements[key])
            return elements
        }
        // console.log(elements[key], key, elements[key])
        // callback.call(elements[key], key, elements[key])
    }
    return elements
}


var obj = {
    a: 1,
    b: 2,
    c: 3
}
var obj2 = {}
each(obj,function(key,value){
    obj2[key] = value
})
console.log(obj2);