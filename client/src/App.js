import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Meeting from "./Meeting";
import "antd/dist/antd.css";

class App extends Component {
    render() {
        return (
            <Router>
                <Route exact path="/" component={Home} />
                <Route path="/join-meeting" component={Meeting} />
            </Router>
        );
    }
}

export default App;
