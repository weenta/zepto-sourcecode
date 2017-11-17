var camelize = function (str) { 
    return str.replace(/-+(.)?/g, 
    function (match, chr) { 
        console.log(match,chr)
        return chr ? chr.toUpperCase() : '' }) 
    }

   var camelize = function (str) { return str.replace(/-+(.)?/g, function (match, chr) { return chr ? chr.toUpperCase() : '' }) }

{
css: function (property, value) {
    if (arguments.length < 2) {
        var computedStyle, element = this[0]
        if (!element) return
        computedStyle = getComputedStyle(element, '')
        if (typeof property == 'string')
            return element.style[camelize(property)] || computedStyle.getPropertyValue(property)
        else if (isArray(property)) {
            var props = {}
            $.each(property, function (_, prop) {
                props[prop] = (element.style[camelize(prop)] || computedStyle.getPropertyValue(prop))
            })
            return props
        }
    }

    var css = ''
    if (type(property) == 'string') {
        if (!value && value !== 0)
            this.each(function () { this.style.removeProperty(dasherize(property)) })
        else
            css = dasherize(property) + ":" + maybeAddPx(property, value)
    } else {
        for (key in property)
            if (!property[key] && property[key] !== 0)
                this.each(function () { this.style.removeProperty(dasherize(key)) })
            else
                css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';'
    }

    return this.each(function () { this.style.cssText += ';' + css })
}
}