var target = { t:'a'},
source = {
    s:'1',
    arr:[1,2],
    obj: {
        o1: '111',
        o2: '222'
    }
}



function extend(target,source){
    for(key in source){
        // 判断source[key]是否是Object或Array
        if(Object.getPrototypeOf(source[key]) === Object.prototype || Array.isArray(source[key])){
            if((Object.getPrototypeOf(source[key]) === Object.prototype)){
                target[key] = {}
                console.log('object')
                console.log(key)
            }
            if(Array.isArray(source[key])){
                target[key] = []
                console.log('array')
            }
            extend(target[key],source[key])
        } 
        else {
            if(source[key] !== undefined){
                target[key] = source[key]
            } 
        }
    }
    return target
}

extend(target,source);

console.log(target)
source.o1 = 'ssss'
source.arr.push(5)
console.log(target)