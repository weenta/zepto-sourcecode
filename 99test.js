// 源码
camelize = function (str) { return str.replace(/-+(.)?/g, function (match, chr) { return chr ? chr.toUpperCase() : '' }) }


var fn = function (match, chr) { 
    // console.log(chr)
    return chr ? chr.toUpperCase() : ''
}

var c = function (str) { 
    return str.replace(/-+(.)?/g, function (match, chr) { 
        console.log(1111)
        console.log(match)
        console.log('chr',chr)
        return chr ? chr.toUpperCase() : ''
    }) 
}

