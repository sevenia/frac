export default {
    plugin: null,
    create: function (cfg) {
        this.plugin = {
            locales: cfg.locales,
            translations: {},
            active_locale: null,

            getBestLocale: () => {
                let locale = null
                if (navigator.languages) {
                    navigator.languages.forEach((nav_locale) => {
                        locale = this.plugin.locales.find(
                            (locale) => locale.code === nav_locale
                        )
                        if (locale) {
                            return false
                        }
                    })
                } else if (this.plugin.locales) {
                    locale = this.plugin.locales[0]
                }

                return locale
            },

            getLocale: () => this.plugin.active_locale,
            setLocale: async (code) => {
                const locale = this.plugin.locales.find(
                    (locale) => locale.code === code
                )

                if (locale) {
                    const file = await locale.file()
                    Object.assign(this.plugin.translations, file.default)
                    this.plugin.active_locale = locale
                    document
                        .querySelector('html')
                        .setAttribute('lang', locale.code)
                }
            },
            translate: (key) => {
                if (typeof key === 'string') {
                    return (
                        this.plugin.translations[key] ??
                        '__MISSING__' + key + '__'
                    )
                } else {
                    let str =
                        this.plugin.translations[key.key] ??
                        '__MISSING__' + key.key + '__'
                    return str.format(key.values)
                }
            },
            install: function (app) {
                app.provide('i18n', this)
                app.config.globalProperties.$i18n = this
            },
        }
    },
}
