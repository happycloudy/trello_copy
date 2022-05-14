export interface ITheme {
    colors: {
        font: string,
        fontGrey: string,
    }

    media: {
        extraLarge: string
        large: string
        medium: string
        small: string
    }

    sizes: {
        header: { height: number }
        container: { width: number }
        footer: { height: number }
        modal: { width: number }
    }

    order: {
        header: number
        modal: number
    },
}