var c = function (str) { 
    console.log(str)
    return str.replace(/-+(.)?/g, 
    function (match, chr) { 
        return chr ? chr.toUpperCase() : ''
     }) 
}