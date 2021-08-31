<template>
    <div>
        <label
            v-if="texts.label"
            :for="name"
            class="f_font-bold f_pl-1 f_mt-1 f_mb-1 f_block f_text-sm f_font-medium f_leading-5 f_text-gray-700"
            :class="getClasses('label')"
        >
            <slot name="label">
                {{ texts.label }}
            </slot>
        </label>
        <div
            class="f_rounded-sm f_shadow-sm f_flex f_shadow-sm focus-within:f_ring-2 focus-within:f_ring-gray-200 focus-within:f_ring-opacity-60"
            :class="getClasses('inner')"
        >
            <div class="f_relative f_flex f_flex-grow f_z-30">
                <input
                    ref="input"
                    type="type"
                    :id="name"
                    :name="name"
                    class="f_block f_w-full f_py-2 f_px-3 f_rounded-sm f_border f_border-gray-300 f_outline-none hover:f_border-gray-400 active:f_border-gray-400 focus:f_border-gray-400"
                    :class="getClasses('input')"
                    :placeholder="texts.placeholder"
                    aria-invalid="true"
                    :aria-describedby="name + 'Error'"
                    :value="value"
                    @input="onInput"
                />

                <div
                    v-if="errors.length > 0"
                    class="f_absolute f_inset-y-0 f_right-0 f_pr-3 f_flex f_items-center f_pointer-events-none f_text-red-500 f_h-full f_w-8"
                >
                    <slot name="error-icon">
                        <frac-icon-error></frac-icon-error>
                    </slot>
                </div>
            </div>
            <div class="f_relative f_flex-shrink-0 f_z-20">
                <slot name="append"></slot>
            </div>
        </div>
        <p
            class="f_pl-1 f_mt-2 f_text-sm f_text-red-600"
            v-if="errors.length > 0"
        >
            <slot name="error" v-for="error in errors" :error="error">
                <span class="block">
                    {{ $i18n.translate(error) }}
                </span>
            </slot>
        </p>
    </div>
</template>
<script setup>
import { ref, onMounted, inject, useSlots } from 'vue'
import { useField } from 'vee-validate'
import FracIconError from '../icons/Error.vue'

const props = defineProps({
    name: { type: String, required: true },
    type: { type: String, default: 'text' },
    modelValue: { type: String },
    texts: { type: Object, default: {} },
    validation: {},
    classFactory: { type: Function },
    focus: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue'])

const input = ref(null)
onMounted(() => {
    if (props.focus) {
        input.value.focus()
    }
})

let field = inject('field', null)
if (!field) {
    field = useField(props.name, props.validation, {
        initialValue: props.modelValue,
    })
}
const { errors, value } = field
const slots = useSlots()

let getClasses
if (props.classFactory) {
    getClasses = props.classFactory
} else {
    getClasses = (where, params = null) => {
        switch (where) {
            case 'label':
                return {
                    'f_text-red-700': errors.value.length > 0,
                }

            case 'inner':
                return {
                    'focus-within:f_ring-red-200': errors.value.length > 0,
                }

            case 'input':
                return {
                    'f_border-red-300 f_text-red-700 f_pr-10 f_placeholder-red-300 focus:f_border-red-400 focus:f_ring-red-300':
                        errors.value.length > 0,
                    'f_rounded-none f_rounded-l-sm': !!slots.append,
                }
        }
    }
}

/*
&__addon-button {
    @apply -ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-none text-gray-700 bg-gray-50;

    &:last-child {
        @apply rounded-r-md;
    }

    &:hover {
        @apply bg-gray-100;
    }

    &:focus {
        @apply bg-gray-100 outline-none;
    }

    &:active {
        @apply bg-gray-200 outline-none;
    }
}
*/

const onInput = ($event) => {
    value.value = $event.target.value
    emit('update:modelValue', $event.target.value)
}
</script>
