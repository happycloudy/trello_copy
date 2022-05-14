import {ITheme} from "./interfaces/theme.interface";

export const theme: ITheme = {
    colors: {
        font: '#19191B',
        fontGrey: '#172b4d',
    },

    media: {
        extraLarge: '(max-width: 1440px)',
        large: '(max-width: 1024px)',
        medium: '(max-width: 768px)',
        small: '(max-width: 320px)',
    },

    // in px
    sizes: {
        header: { height: 56 },
        container: { width: 1200 },
        footer: { height: 128 },
        modal: { width: 540 },
    },


    // z-index
    order: {
        header: 50,
        modal: 100,
    },
}