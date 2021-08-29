import { format } from '../helpers/String.js'
import yup from '../helpers/Validation.js'

export default {
    plugin: null,
    create: function (cfg) {
        this.plugin = {
            install: (app, options) => {
                String.prototype.format = format

                app.provide('yup', yup)
            },
        }
    },
}
