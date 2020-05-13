import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./containers/Layout";
import BaseRouter from "./routes";

function App() {
    return (
        <div className="App">
            <Router>
                <Layout>
                    <BaseRouter />
                </Layout>
            </Router>
        </div>
    );
}

export default App;
