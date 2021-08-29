module.exports = {
    mode: 'jit',
    purge: [
        'package/src/**/*.{html,vue,js,ts,jsx,tsx}',
        'playground/**/*.{html,vue,js,ts,jsx,tsx}',
    ],
    prefix: 'f_',
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                'sevenia-50': '#EEF7FC',
                'sevenia-100': '#CAE8F6',
                'sevenia-200': '#95D2EE',
                'sevenia-300': '#60BCE6',
                'sevenia-400': '#36A9E0',
                'sevenia-500': '#164C7C',
                'sevenia-600': '#124068',
                'sevenia-700': '#0C2B45',
                'sevenia-800': '#061623',
                'sevenia-900': '#030B11',
            },
            zIndex: {
                '-1': '-1',
            },
            translate: {
                '6/7': '85.7142857%',
            },
            width: {
                '6/7': '85.7142857%',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
