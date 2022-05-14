import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from './store/store';
import App from './App';
import GlobalStyles from './global.styles'
import {ThemeProvider} from "styled-components";
import {theme} from "./theme.styles";

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <App/>
                <GlobalStyles/>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
)
