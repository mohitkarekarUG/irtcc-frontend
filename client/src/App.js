import React, { Component } from "react";
import socketIOClient from 'socket.io-client';
import CodeEditor from "./components/CodeEditor.js";
import CallingActions from "./components/CallingActions.js";
import { Spin } from "antd";
import "antd/dist/antd.css";
import "./App.css";

const socketServerEndpoint = "http://172.25.6.70:8080";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jsExample1: `var a = 3;
var x = (100 + 50) * a;
document.getElementById("demo").innerHTML = x;`,
            admin: true,
            socketServerEndpoint
        };
        this.initSocketConnection(socketServerEndpoint);
    }

    initSocketConnection = endpoint => {
        this.socket = socketIOClient(endpoint);
        this.socket.emit("test", () => {});
    };

    handleCodeChange = ({ newValue }) => {
        console.log("Code was changed", newValue);
    };

    render() {
        return (
            <div className="App">
                <div className="sidebar">
                    <CodeEditor
                        value={this.state.jsExample1}
                        onCodeChange={this.handleCodeChange}
                    />
                </div>
                <div className="mainContent" id="init-zoom-here">
                    <Spin />
                </div>
                <CallingActions />
            </div>
        );
    }
}

export default App;
