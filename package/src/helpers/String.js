export const format = function (args) {
    return this.replace(/###_(\w+)_###/g, function (match, value) {
        return typeof args[value] != 'undefined' ? args[value] : match
    })
}
