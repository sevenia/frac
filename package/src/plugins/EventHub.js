import mitt from 'mitt'

export default {
    create: function (cfg) {
        return {
            install: (app, options) => {
                app.provide('event_hub', mitt())
            },
        }
    },
}
