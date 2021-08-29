<template>
    <nav
        class="f_h-0 md:f_block md:f_h-auto md:f_w-2/6 md:f_max-w-xs md:f_border-r"
        :class="getClasses('nav')"
    >
        <ul
            class="f_min-h-screen f_w-6/7 f_pt-10 f_bg-white f_transform f_-translate-x-full md:f_translate-x-0 md:f_w-full"
            :class="getClasses('inner')"
        >
            <li v-for="link in links" :key="link.name">
                <router-link
                    :to="{ name: link.name }"
                    custom
                    v-slot="{ navigate, href, isActive, isExactActive }"
                >
                    <!--                    TODO @click="", use a global nav guard? -->
                    <a
                        :href="href"
                        @click="navigate"
                        class="f_w-full md:f_inline-block f_p-2 f_block hover:!f_bg-sevenia-200"
                        :class="getClasses('link', { isActive, isExactActive })"
                    >
                        {{ link.label }}
                    </a>
                </router-link>
            </li>
        </ul>
    </nav>
</template>
<script setup>
import { defineProps, ref, inject, onMounted, onUnmounted } from 'vue'
import Router from '../plugins/Router'

const props = defineProps({ app: {} })
const event_hub = inject('event_hub')
const i18n = inject('i18n')

let isOpen = ref(false)
let links = ref([])

Router.menu.forEach((link) => {
    links.value.push({
        name: link.route + '_' + i18n.getLocale().code,
        label: i18n.translate('menu__' + link.label),
    })
})

const getClasses = (where, params = null) => {
    switch (where) {
        case 'nav':
            return {
                'f_h-auto f_min-h-screen f_bg-gray-800 f_bg-opacity-50':
                    isOpen.value,
            }

        case 'inner':
            return {
                '!f_transition-transform !f_translate-x-0': isOpen.value,
            }

        case 'link':
            return {
                'f_bg-sevenia-100': params.isActive || params.isExactActive,
            }
    }
}

onMounted(() => {
    event_hub.on('mobile-menu-toggle', (state) => {
        isOpen.value = state

        if (props.app) {
            if (state) {
                props.app.classList.add('mobile-menu-open')
            } else {
                props.app.classList.remove('mobile-menu-open')
            }
        }
    })

    Router.plugin.beforeEach((to, from) => {
        event_hub.emit('mobile-menu-toggle', false)
    })
})

onUnmounted(() => {
    event_hub.off('mobile-menu-toggle')
})
</script>
