import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from 'axios';
import socketIOClient from "socket.io-client";
import cx from "classnames";
import InteractionsCoding from "./components/interactions/Coding.js";
import CallingActions from "./components/CallingActions.js";
import { Spin } from "antd";
import "antd/dist/antd.css";
import styles from "./App.module.css";

const serverEndpoint = 'http://172.25.6.70:8080'
const socketServerEndpoint = "http://172.25.6.70:8080";

class App extends Component {
    static propTypes = {
        location: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            jsExample1: `var a = 3;\nvar x = (100 + 50) * a;\ndocument.getElementById("demo").innerHTML = x;`,
            admin: true,
            socketServerEndpoint,
            isEditorActive: false
        };
        this.initSocketConnection(socketServerEndpoint);
    }

    componentDidMount() {
        if(window.location.pathname.includes('/join-meeting/')) {
            let meetingId = window.location.pathname.split('/join-meeting/')
            axios.get(serverEndpoint + `/meeting/${meetingId}`).then(meeting => {
                //need to be corrected to right values
                this.setState({ meetingId, joinUrl: meeting.join_url })
            })
        }
    }

    initSocketConnection = endpoint => {
        this.socket = socketIOClient(endpoint);
        this.socket.emit("test", () => {});
    };

    handleCodeChange = ({ newValue }) => {
        console.log("Code was changed", newValue);
    };
    handleAddInteractionBtnClick = () => {
        this.setState({ isEditorActive: !this.state.isEditorActive });
    };
    handleMicBtnClick = ({ newValue }) => {
        console.log("Code was changed", newValue);
    };
    handleCallEndClick = ({ newValue }) => {
        console.log("Code was changed", newValue);
    };
    handleVideoBtnClick = ({ newValue }) => {
        console.log("Code was changed", newValue);
    };

    render() {
        const { isEditorActive } = this.state;
        return (
            <div className={styles.root}>
                <InteractionsCoding
                    className={styles.codeEditor}
                    value={this.state.jsExample1}
                    isEditorActive={isEditorActive}
                    onChange={this.handleCodeChange}
                />
                <div className={styles.content} id="init-zoom-here">
                    <Spin className={styles.spinner} />
                </div>
                <CallingActions
                    onAddInteractionBtnClick={
                        this.handleAddInteractionBtnClick
                    }
                    onMicBtnClick={this.handleMicBtnClick}
                    onCallEndClick={this.handleCallEndClick}
                    onVideoBtnClick={this.handleVideoBtnClick}
                />
            </div>
        );
    }
}

export default App;
