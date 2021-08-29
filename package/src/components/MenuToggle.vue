<template>
    <a href @click.prevent="toggle" class="md:f_hidden">
        <slot>
            {{ $i18n.translate('menu') }}
        </slot>
    </a>
</template>
<script setup>
import { inject } from 'vue'

const event_hub = inject('event_hub')

let state = false
const toggle = () => {
    state = !state
    event_hub.emit('mobile-menu-toggle', state)
}

event_hub.on('mobile-menu-toggle', (new_state) => (state = new_state))
</script>
