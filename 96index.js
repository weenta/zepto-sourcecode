


// var s = $.map(arr,cb)
// console.log(s)
// 数组扁平化
function flatten(array,flatArr) { 
    let arr = [];
    flatArr = flatArr || []
    if(array.length > 0){
        for(let i=0; i<arr.length; i++){
            if(Array.isArray(array[i])){
                flatten(array[i],flatArr)
            }else {
                flatArr = flatArr.concat.apply([],array[i])
            }
        }
    }
   
    return flatArr
}

var arr = [1,2,['a','b',[9,8]],3]

var arrs = flatten(arr)
console.log(arrs)








/* $.map = function (elements, callback) {
    var value, values = [], i, key
    if (likeArray(elements))
        for (i = 0; i < elements.length; i++) {
            value = callback(elements[i], i)
            if (value != null) values.push(value)
        }
    else
        for (key in elements) {
            value = callback(elements[key], key)
            if (value != null) values.push(value)
        }
    return flatten(values)
} */