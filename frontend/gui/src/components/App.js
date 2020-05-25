import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import BaseRouter from "../routes";
import Layout from "./Layout";

const App = () => {
    return (
        <div className="App">
            <Router>
                <Layout>
                    <BaseRouter />
                </Layout>
            </Router>
        </div>
    );
};

export default App;
