const { fontFamily } = require('tailwindcss/defaultTheme')
module.exports = {
    mode: 'jit',
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                ...fontFamily,
                sans: [
                    'Source Sans Pro',
                    '-apple-system',
                    'Roboto',
                    'Helvetica Neue',
                    'sans-serif',
                ],
                serif: ['Noto Serif TC', '-apple-system', 'serif'],
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require('@tailwindcss/aspect-ratio')],
}
