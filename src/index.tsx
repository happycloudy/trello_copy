import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from './store/store';
import App from './App';
import GlobalStyles from './global.styles'
import {ThemeProvider} from "styled-components";
import {theme} from "./theme.styles";
import {BrowserRouter} from "react-router-dom";

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <App/>
                    <GlobalStyles/>
                </ThemeProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
)
