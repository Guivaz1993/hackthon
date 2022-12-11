/* eslint-disable react/jsx-indent */
import * as ReactDOMClient from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Main from "./App";
import "./index.css";

const root = ReactDOMClient.createRoot(document.getElementById("root"));

root.render(
    <BrowserRouter>
        <Main />
    </BrowserRouter>,
);
