// 读取或设置dom的属性。
var fn = {
    attr: function (name, value) {
        var result 
                // name 是string         value未传值(即使传null 1 in arguments为true)
        return (typeof name == 'string' && !(1 in arguments)) ?
            // this.是$()返回的数组 nodetype == 1表示element元素
            // 如果 this.length<0 或 this[0]不为element元素 return undefined
            (!this.length || this[0].nodeType !== 1 ? undefined :
                (!(result = this[0].getAttribute(name)) && name in this[0]) ? this[0][name] : result
            ) :
            // value 不为空
            this.each(function (idx) {
                if (this.nodeType !== 1) return
                if (isObject(name)) for (key in name) setAttribute(this, key, name[key])
                else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)))
            })
    }
}

