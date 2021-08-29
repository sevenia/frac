import I18n from './I18n.js'
import { createRouter, createWebHistory } from 'vue-router'

export default {
    plugin: null,
    menu: [],
    create: function (cfg) {
        this.menu = cfg.menu

        const _router = createRouter({
            history: createWebHistory(cfg.base_path),
            routes: [],
        })

        // setup routes
        cfg.controllers.forEach((controller) => {
            controller.actions.forEach((action) => {
                I18n.plugin.locales.forEach((locale) => {
                    const new_route = {
                        name: '',
                        path: action.paths[locale.code],
                        component: action.component,
                        meta: {
                            controller: controller.name,
                            action: action.name,
                            locale: locale.code,
                        },
                    }

                    if (!action.children) {
                        new_route.name = `${controller.name}_${action.name}_${locale.code}`
                    } else {
                        new_route.children = []
                        action.children.forEach((child) => {
                            new_route.children.push({
                                name: `${controller.name}_${child.name}_${locale.code}`,
                                path: child.paths[locale.code],
                                component: child.component,
                                meta: {
                                    controller: controller.name,
                                    action: child.name,
                                    locale: locale.code,
                                },
                            })
                        })
                    }

                    _router.addRoute(new_route)
                })
            })
        })

        // setup not found route
        _router.addRoute(cfg.not_found)

        // setup guard for redirects and locale setting
        _router.beforeEach(async (to, from) => {
            const redirect = cfg.redirects.find(
                (redirect) => redirect.from === to.path
            )
            if (redirect) {
                const route_name =
                    redirect.to + '_' + I18n.plugin.getBestLocale().code
                return _router
                    .getRoutes()
                    .find((route) => route.name === route_name)
            } else if (to.matched) {
                //we update the locale to the one defined in route
                await I18n.plugin.setLocale(
                    to.meta.locale || I18n.plugin.getBestLocale().code
                )
            }
        })

        this.plugin = _router
    },
}
