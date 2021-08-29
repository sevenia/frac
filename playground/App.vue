<style lang="scss">
.mobile-menu-open {
    main {
        @apply f_fixed f_top-0 f_transform f_translate-x-6/7 f_-z-1 md:f_static md:f_transform-none;
    }
}
</style>
<template>
    <div class="md:f_flex" ref="app_element">
        <header
            class="f_h-10 f_z-50 f_fixed f_top-0 f_left-0 f_w-screen f_flex f_justify-between f_p-2 f_border-b f_bg-white f_items-center"
        >
            <img
                src="./assets/imgs/sevenia-logo-solo-box-blu.svg"
                alt="logo"
                class="f_block f_flex-shrink f_w-5 f_h-5"
            />
            <frac-menu-toggle></frac-menu-toggle>
        </header>
        <frac-menu :app="app_element"></frac-menu>
        <main
            class="f_min-h-screen f_block f_container f_p-2 f_pt-10 f_mx-auto f_z-10 f_transition-transform f_translate-x-0 md:f_flex-grow"
        >
            <router-view></router-view>
            <footer class="app__footer"></footer>
        </main>
    </div>
</template>
<script>
import { ref } from 'vue'
import Menu from '../package/src/components/Menu.vue'
import MenuToggle from '../package/src/components/MenuToggle.vue'

export default {
    components: {
        'frac-menu': Menu,
        'frac-menu-toggle': MenuToggle,
    },
    setup() {
        const app_element = ref(null)

        return {
            app_element,
        }
    },
}
</script>
