$.contains = document.documentElement.contains ?
function (parent, node) {
    return parent !== node && parent.contains(node)
} :
function (parent, node) {
    while (node && (node = node.parentNode))
        if (node === parent) return true
    return false
}

var c = function(parent,node){
    var n, res
    if(parent !== node && parent.contains(node)){
       res = ture
    }else {
        if(node && ( p  = node.parentNode)){   // 如果node不为空 将node的父节点赋值给n
            if(n === parent){
                res = true
            } else {
                res =  false
            }
        }
    }
    return res
}