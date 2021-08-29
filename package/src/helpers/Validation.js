import * as yup from 'yup'

yup.setLocale({
    mixed: {
        default: () => ({ key: 'error__field_invalid' }),
        required: () => ({ key: 'error__field_required' }),
    },
    number: {
        min: ({ min }) => ({ key: 'error__number_too_small', values: { min } }),
        max: ({ max }) => ({ key: 'error__number_too_big', values: { max } }),
    },
    string: {
        min: ({ min }) => ({ key: 'error__string_too_short', values: { min } }),
        max: ({ max }) => ({ key: 'error__string_too_big', values: { max } }),
    },
})

export default yup
