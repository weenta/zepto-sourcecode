var methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'];
function each (elements, callback) {
    var i, key
    if (false) {
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
}

each(properties, function (key, value) {
    if (methodAttributes.indexOf(key) > -1) nodes[key](value)
    else nodes.attr(key, value)
})


$("<p />", { text:"Hello z", id:"greeting"})
实现步骤
第一步 一进zepto.init
    
    typeof selector == 'string' 为 true
    selector[0] == '<' && fragmentRE.test(selector)  为true

第二步 进入 zepto.fragment
    dom = zepto.fragment(selector, RegExp.$1, context)
    singleTagRE.test(html)  为 true

第三步 二进入zepto.init 此时selector = document.createElement(RegExp.$1)
    typeof selector == 'string' 为 false
    此时 isObject(selector) 为true
    return zepto.Z(dom, selector)

第四步 回到zepto.fragment
    此时dom ==   return zepto.Z(dom, selector)    此时返回的dom 是一个数组
    继续往下走
    isPlainObject(properties) 为true   properties ==  { text:"Hellosssssss", id:"greetings"}
    nodes = $(dom)

第五步 三进入 zepto.init   
    此时zepto.isZ(selector)为true 
    直接 return selector
    
第六步 回到zepto.fragment
    此时nodes === return selector    

第七步 进入 $.each()  
    回调为
    // 做了什么?
    function(key, value) {
        if (methodAttributes.indexOf(key) > -1)
            nodes[key](value)
        else
            nodes.attr(key, value)
    }

    进入$.text() $.attr()
    处理完成

第八步  zepto.fragment 处理结束 return dom  
    此时 dom = Array(1)是一个数组

第九步 四进 zepto.init
    回到 else if (fragmentRE.test(selector)) 中
    得到 dom = zepto.fragment(selector.trim(), RegExp.$1, context)的结果
    设置selector = null
    return zepto.Z(dom, selector)
    结束


