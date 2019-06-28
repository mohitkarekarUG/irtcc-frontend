import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import socketIOClient from "socket.io-client";
import InteractionsCoding from "./components/interactions/Coding.js";
import CreateInteractionModal from "./components/interactions/CreateInteractionModal.js";
import CallingActions from "./components/CallingActions.js";
import InjectZoom from "./components/InjectZoom.js";
import { Spin, Radio } from "antd";
import styles from "./App.module.css";

// const serverEndpoint = "http://localhost:8080";
// const socketServerEndpoint = "http://localhost:8080";

const serverEndpoint = "https://irtcc.herokuapp.com";
const socketServerEndpoint = "https://irtcc.herokuapp.com";

class Meeting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            interActionValue: `var a = 3;\nvar x = (100 + 50) * a;\ndocument.getElementById("demo").innerHTML = x;`,
            socketServerEndpoint,
            // Layout/Feature States
            admin: true,
            isEditorActive: false,
            isCreateInteractionModalActive: false,
            // Zoom Related states
            meetingId: this.getUrlVars()["m"],
            memberId: "123123141112",
            userWithControl: null,
            members: [],
            zoomId: "648551424"
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
                .get(serverEndpoint + `/meeting/${meetingId}/`)
                .then(meeting => {
                    this.setState({ zoomId: meeting.zoomId, joinUrl: meeting.zoomUrl });
                });
            this.emitAddMember();
        } else if(this.props.location.state) {
            console.log(this.props.location.state.meeting.zoomId)
            this.setState({ zoomId: this.props.location.state.meeting.zoomId })
        }
        document
            .getElementsByTagName("body")[0]
            .classList.remove("deIndexZoom");
    }

    fetchListOfAttendees = () => {
        axios
            .get(serverEndpoint + `/getMembers/`, { meetingId: this.state.meetingId})
            .then(response => {
                console.log("fetchListOfAttendees", response);

                // this.setState({ meetingId, joinUrl: meeting.join_url });
            });
    };

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
                data: this.state.interActionValue
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
            console.log("newInteraction");

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
            this.setState({ interActionValue: data });
            console.log(data);
        });
    };

    listenToToggleControl = () => {
        this.socket.on("controlChanged", ({ memberId }) => {
            console.log('controlChanged', memberId)
            this.setState({ userWithControl: memberId });
        });
    };

    handleControlToggle = memberId => {
        this.setState({ userWithControl: memberId });
    };

    // Misc Functions
    handleCodeChange = ({ newValue }) => {
        this.state.memberId === this.state.userWithControl &&
            this.setState(
                {
                    interActionValue: newValue.newValue
                },
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
    handleMicBtnClick = () => {
        window.ZoomMtg.mute({
            userId: this.state.selfUserId,
            mute: this.state.isSelfMute
        });
    };
    handleCallEndClick = () => {
        window.ZoomMtg.leaveMeeting({});
    };
    handleVideoBtnClick = ({ newValue }) => {
        console.log("Code was changed", newValue);
    };
    handleShowParticipantsBtnClick = () => {
        this.setState({ isEditorActive: !this.state.isEditorActive });
    };

    render() {
        const {
            isEditorActive,
            isCreateInteractionModalActive,
            zoomId,
        } = this.state;
        return (
            <div className={styles.root}>
                <InteractionsCoding
                    className={styles.codeEditor}
                    value={this.state.jsExample1}
                    isEditorActive={isEditorActive}
                    onChange={this.handleCodeChange}
                />
                <div className={styles.content}>
                    {this.state.zoomId ? (
                        <InjectZoom zoomId={this.state.zoomId} />
                    ) : null}
                </div>
                <CallingActions
                    onAddInteractionBtnClick={
                        this.handleAddInteractionBtnClick
                    }
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
                <div className={styles.radioGroup}>
                    <Radio.Group
                        onChange={this.handleControlToggle}
                        value={this.state.userWithControl}
                    >
                        {this.state.members.map(m => {
                            return (
                                <Radio
                                    className={styles.radio}
                                    value={m.memberId}
                                >
                                    {m.memberId}
                                </Radio>
                            );
                        })}
                    </Radio.Group>
                </div>
            </div>
        );
    }
}

export default Meeting;
