import { format } from '../helpers/String.js'

export default {
    plugin: null,
    create: function (cfg) {
        this.plugin = {
            install: (app, options) => {
                String.prototype.format = format
            },
        }
    },
}
