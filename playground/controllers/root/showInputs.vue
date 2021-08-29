<template>
    <frac-input v-model="models.it01" v-bind="config.it01"> </frac-input>
    <frac-input v-model="models.it02" v-bind="config.it02">
        <template #label>
            <span class="f_flex">
                <span>
                    {{ config.it02.texts.label }}
                </span>
                <span class="f_flex-grow f_text-right">
                    Model value:&nbsp;{{
                        !!models.it02 ? models.it02 : 'NO VALUE'
                    }}
                </span>
            </span>
        </template>
    </frac-input>
    <frac-input v-model="models.it03" v-bind="config.it03"> </frac-input>
    <frac-input v-model="models.it04" v-bind="config.it04">
        <template #error="error">
            <h1 class="f_bg-red-100 f_text-lg f_p-2">
                The RAW error object is: {{ error }}
            </h1>
        </template>
    </frac-input>
</template>
<script setup>
import { reactive } from 'vue'
import yup from '@/helpers/Validation'

const models = reactive({
    it01: 'This is an example text',
    it02: 'Input with custom label',
    it03: 'Delete text to see error',
    it04: 'Input with custom error',
})

const config = {
    it01: {
        name: 'it01',
        texts: {
            label: 'Simple text input',
        },
    },
    it02: {
        name: 'it02',
        texts: {
            label: 'This label show the model value',
        },
    },
    it03: {
        name: 'it03',
        validation: yup.string().required(),
        texts: {
            label: 'Simple text input. Validation: "Required"',
        },
    },
    it04: {
        name: 'it04',
        validation: yup.string().required().min(3),
        texts: {
            label:
                'This input show errors differently. Validation: "Required" and "Min 3 chars"',
        },
    },
}
</script>
