import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import Main from './App';

const root = ReactDOMClient.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        <Main />
    </BrowserRouter>
);

