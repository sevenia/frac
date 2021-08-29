import { format } from '../helpers/String.js'

export default {
    create: function (cfg) {
        return {
            install: (app, options) => {
                String.prototype.format = format
            },
        }
    },
}
