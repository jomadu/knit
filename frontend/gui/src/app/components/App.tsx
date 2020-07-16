import React from "react";
import { BrowserRouter } from "react-router-dom";
import RootRouter from "../RootRouter";
import Layout from "./Layout";

const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <RootRouter />
            </Layout>
        </BrowserRouter>
    );
};

export default App;
