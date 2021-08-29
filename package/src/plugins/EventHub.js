import mitt from 'mitt'

export default {
    plugin: null,
    create: function (cfg) {
        this.plugin = {
            install: (app, options) => {
                app.provide('event_hub', mitt())
            },
        }
    },
}
