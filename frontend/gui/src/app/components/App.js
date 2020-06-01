import React from "react";
import { BrowserRouter } from "react-router-dom";
import RootRouter from "../RootRouter";
import Layout from "./Layout";

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Layout>
                    <RootRouter />
                </Layout>
            </BrowserRouter>
        </div>
    );
};

export default App;
