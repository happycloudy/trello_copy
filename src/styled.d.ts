import 'styled-components';
import {ITheme} from "./interfaces/theme.interface";


declare module 'styled-components' {
    export interface DefaultTheme extends ITheme {}
}