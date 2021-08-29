<template>
    <div
        class="f_my-2 f_px-2 f_-mx-2 md:f_pb-0 md:f_flex md:f_overflow-hidden first:f_mt-0"
        :class="getClasses('row')"
    >
        <div
            class="f_py-2 md:f_flex-shrink-0 md:f_w-4/12 md:f_text-right md:f_py-4 md:f_px-3 lg:f_w-3/12"
        >
            <label
                :for="name"
                class="f_flex-grow f_font-bold f_block md:f_block md:f_truncate"
            >
                {{ texts.label }}
            </label>
            <p
                v-if="texts.infotext"
                class="f_text-gray-700 f_text-sm f_block f_pb-0"
            >
                {{ texts.infotext }}
            </p>
        </div>
        <template v-if="isEditing">
            <div class="f_flex-grow md:f_pt-2 md:f_pl-3">
                <div @keyup.esc="cancelEdit" @keydown.enter="confirmEdit">
                    <slot name="editor" :value="newValue" :setValue="setValue">
                        __MISSING_EDITOR__
                    </slot>
                </div>
                <div
                    class="f_text-center f_py-2 md:f_py-4 md:f_flex-shrink-0 md:f_text-right"
                >
                    <frac-button @click="cancelEdit" class="button--cancel">
                        <template #icon>
                            <frac-icon-cancel></frac-icon-cancel>
                        </template>
                        <template #text>{{
                            $i18n.translate('cancel')
                        }}</template>
                    </frac-button>
                    <frac-button
                        type="submit"
                        @click="confirmEdit"
                        class="f_bg-green-50 f_border-green-700 f_ml-2 f_text-green-700 hover:f_bg-green-100 focus:f_bg-green-100 active:f_bg-green-200"
                    >
                        <template #icon>
                            <frac-icon-ok></frac-icon-ok>
                        </template>
                        <template #text>
                            {{ $i18n.translate('confirm') }}
                        </template>
                    </frac-button>
                </div>
            </div>
        </template>
        <template v-else>
            <p
                class="f_flex-grow f_py-2 f_italic md:f_my-0 md:f_py-4 md:f_px-3"
            >
                <slot :value="modelValue">
                    {{ modelValue }}
                </slot>
            </p>
        </template>
        <template v-if="editable && !isEditing">
            <div
                class="f_text-center f_py-2 md:f_py-4 md:f_flex-shrink-0 md:f_text-right"
            >
                <a
                    href=""
                    class="f_font-bold f_flex-shrink-0 f_text-blue-600 f_block"
                    @click.prevent="startEdit"
                    v-if="editable && !isEditing"
                >
                    {{ $i18n.translate('edit') }}
                </a>
            </div>
        </template>
    </div>
</template>
<script setup>
import {
    defineProps,
    defineEmits,
    ref,
    onMounted,
    onUnmounted,
    provide,
    inject,
} from 'vue'
import FracIconOk from '../icons/Ok.vue'
import FracIconCancel from '../icons/Cancel.vue'
import FracButton from './Button.vue'
import { useField } from 'vee-validate'

const props = defineProps({
    name: { type: String },
    editable: { type: Boolean, default: true },
    texts: { type: Object, default: {} },
    modelValue: { type: String },
    validation: {},
})
const emit = defineEmits(['update:modelValue'])

const event_hub = inject('event_hub')

const field = useField(props.name, props.validation, {
    initialValue: props.modelValue,
})
provide('field', field)

const editable = ref(!!props.editable)
let isEditing = ref(false)
let newValue = ref(field.value)

const getClasses = (where, params = null) => {
    switch (where) {
        case 'row':
            return {
                'config-row--is-editing': isEditing.value,
            }
    }
}

const startEdit = () => {
    newValue.value = props.modelValue
    isEditing.value = true
    event_hub.emit('config-row-start-edit', props.name)
}
const confirmEdit = () => {
    if (field.meta.valid && field.meta.dirty) {
        emit('update:modelValue', newValue.value)
        isEditing.value = false
    }
}
const cancelEdit = () => {
    newValue.value = props.modelValue
    isEditing.value = false
}
const setValue = ($event) => {
    newValue.value = $event.target.value
}

onMounted(() => {
    event_hub.on('config-row-start-edit', (name) => {
        if (name !== props.name) {
            isEditing.value = false
        }
    })
})

onUnmounted(() => {
    event_hub.off('config-row-start-edit')
})
</script>
