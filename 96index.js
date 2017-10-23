var target = { t:'a'},
source = {
    s:'1',
    obj: {
        o1: '111',
        o2: '222'
    }
}
console.log(111)
function c(target,source){
    console.log(target)
    console.log(source)
}
c(target,source)

$.extend(true,target,source);
console.log(target)