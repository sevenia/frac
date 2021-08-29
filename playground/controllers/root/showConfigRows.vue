<template>
    <frac-config-row name="cfgrow01" v-model="models.cr01" v-bind="config.cr01">
        <template #editor="{ setValue, value }">
            <frac-input
                name="cr01"
                focus
                @input="setValue"
                :modelValue="value"
            ></frac-input>
        </template>
    </frac-config-row>
    <hr />
    <frac-config-row
        name="cfgrow02"
        v-model="models.cr02"
        :texts="config.cr02.texts"
    >
        <template #default="{ value }"> OMG!! {{ value }} </template>
    </frac-config-row>
</template>
<script>
import { reactive } from 'vue'
import yup from '@/helpers/Validation'

export default {
    setup() {
        const models = reactive({
            cr01: 'this is an example value for config01',
            cr02: 'this is an example value for config02',
        })

        const config = {
            cr01: {
                texts: {
                    label: 'Config 01',
                    infotext:
                        'This is an infotext, explaining why this is important in more than one row',
                },
                validation: yup.string().required().min(3),
            },
            cr02: {
                texts: {
                    label: 'Config 02 (no infotext)',
                },
                validation: yup.string().required(),
            },
        }

        return {
            models,
            config,
        }
    },
}
</script>
