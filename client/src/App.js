import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import socketIOClient from "socket.io-client";
import InteractionsCoding from "./components/interactions/Coding.js";
import CreateInteractionModal from "./components/interactions/CreateInteractionModal.js";
import CallingActions from "./components/CallingActions.js";
import { Spin } from "antd";
import "antd/dist/antd.css";
import styles from "./App.module.css";
import StudentList from "./components/StudentList";
import { List, Checkbox } from "antd";

const serverEndpoint = "https://irtcc.herokuapp.com/";
const socketServerEndpoint = "https://irtcc.herokuapp.com/";

class App extends Component {
    static propTypes = {
        location: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            jsExample1: `var a = 3;\nvar x = (100 + 50) * a;\ndocument.getElementById("demo").innerHTML = x;`,
            socketServerEndpoint,
            // Layout/Feature States
            admin: true,
            isEditorActive: false,
            isCreateInteractionModalActive: false,
            // Zoom Related states
            meetingId: this.getUrlVars()["m"],
            memberId: "1231",
            userWithControl: null,
            members: []
        };

        // Inits
        this.initSocketConnection(socketServerEndpoint);
        this.listenToNewInteraction();
        this.listenToNewMemberAdded();
        this.listenToDataUpdated();
        this.listenToToggleControl();
    }

    componentDidMount() {
        if (window.location.pathname.includes("/join-meeting/")) {
            const { meetingId } = this.state;
            axios
                .get(serverEndpoint + `/meeting/${meetingId}`)
                .then(meeting => {
                    //need to be corrected to right values
                    this.setState({ meetingId, joinUrl: meeting.join_url });
                });
            this.emitAddMember();
        }
    }

    getUrlVars = () => {
        const vars = {};
        const parts = window.location.href.replace(
            /[?&]+([^=&]+)=([^&]*)/gi,
            function(m, key, value) {
                vars[key] = value;
            }
        );
        return vars;
    };

    // Socket Functions
    initSocketConnection = endpoint => {
        this.socket = socketIOClient(endpoint);
    };

    emitAddMember = () => {
        this.socket.emit(
            "addMember",
            {
                meetingId: this.state.meetingId,
                memberId: this.state.memberId,
                isAdmin: true
            },
            function(response) {
                console.log(response);
            }
        );
    };

    emitCreateInteraction = ({ questionType, data }) => {
        this.socket.emit(
            "createInteraction",
            {
                meetingId: this.state.meetingId,
                type: questionType,
                data: data
            },
            response => {
                console.log(response);
            }
        );
    };

    emitUpdateData = () => {
        this.socket.emit(
            "updateData",
            {
                meetingId: this.state.meetingId,
                type: "coding",
                data: this.state.jsExample1
            },
            response => {
                console.log(response);
            }
        );
    };

    emitToggleControl = () => {
        this.socket.emit(
            "toggleControl",
            {
                meetingId: this.state.meetingId,
                memberId: this.state.memberId,
                socketId: this.socket.id
            },
            response => {
                console.log(response);
            }
        );
    };

    listenToNewInteraction = () => {
        this.socket.on("newInteraction", data => {
            this.setState({ isEditorActive: true });
        });
    };

    listenToNewMemberAdded = () => {
        this.socket.on("newMemberAdded", data => {
            this.setState({ members: data.members });
            console.log(data.members);
        });
    };

    listenToDataUpdated = () => {
        this.socket.on("dataUpdated", ({ data }) => {
            this.setState({ jsExample1: data });
            console.log(data);
        });
    };

    listenToToggleControl = () => {
        this.socket.on("controlChanged", ({ memberId }) => {
            this.setState({ userWithControl: memberId });
        });
    };

    handleControlToggle = memberId => {
        this.setState({ userWithControl: memberId }, this.emitToggleControl);
    };

    // Misc Functions
    handleCodeChange = ({ newValue }) => {
        this.state.memberId === this.state.userWithControl &&
            this.setState(
                { jsExample1: newValue.newValue },
                this.emitUpdateData
            );
        // console.log("Code was changed", newValue.newValue);
    };

    handleAddInteractionBtnClick = () => {
        this.setState({
            isCreateInteractionModalActive: !this.state
                .isCreateInteractionModalActive
        });
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
    handleShowParticipantsBtnClick = () => {
        this.setState({ isEditorActive: !this.state.isEditorActive });
    };

    render() {
        const { isEditorActive, isCreateInteractionModalActive } = this.state;
        return (
            <div className={styles.root}>
                <InteractionsCoding
                    className={styles.codeEditor}
                    value={this.state.jsExample1}
                    isEditorActive={isEditorActive}
                    onChange={this.handleCodeChange}
                />
                <div className={styles.content} id='init-zoom-here'>
                    <Spin className={styles.spinner} />
                </div>
                <CallingActions
                    onAddInteractionBtnClick={this.handleAddInteractionBtnClick}
                    onMicBtnClick={this.handleMicBtnClick}
                    onCallEndClick={this.handleCallEndClick}
                    onVideoBtnClick={this.handleVideoBtnClick}
                    onShowParticipantsBtnClick={
                        this.handleShowParticipantsBtnClick
                    }
                />

                <div className={styles.modals}>
                    <CreateInteractionModal
                        visible={isCreateInteractionModalActive}
                        onClose={this.handleAddInteractionBtnClick}
                        onCreation={this.emitCreateInteraction}
                    />
                </div>
                {this.state.admin ? (
                    <div>
                        <List
                            dataSource={this.state.members}
                            renderItem={member => (
                                <List.Item key={member.memberId}>
                                    <Checkbox
                                        checked={
                                            member.memberId ===
                                            this.state.userWithControl
                                        }
                                        onChange={e =>
                                            this.handleControlToggle(
                                                member.memberId
                                            )
                                        }
                                    />
                                    {" " + member.memberId}
                                </List.Item>
                            )}
                        />
                    </div>
                ) : null}
            </div>
        );
    }
}

export default App;
