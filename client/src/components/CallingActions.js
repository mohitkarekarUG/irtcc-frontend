import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./CallingActions.module.css";
import { Button } from "antd";
import { MdCallEnd, MdVideocamOff, MdMicOff } from "react-icons/md";

class CallingActions extends Component {
    static propTypes = {
        onMicBtnClick: PropTypes.func,
        onCallEndClick: PropTypes.func,
        onVideoBtnClick: PropTypes.func,
        onAddInteractionBtnClick: PropTypes.func,
        onShowParticipantsBtnClick: PropTypes.func
    };

    render() {
        return (
            <div className={styles.footerBar}>
                <div className={styles.addInteractionBtn}>
                    <Button
                        type="dashed"
                        block
                        onClick={this.props.onAddInteractionBtnClick}
                    >
                        + Add Interactions
                    </Button>
                </div>
                <div className={styles.coreActions}>
                    <div
                        className={styles.callingBtn}
                        onClick={this.props.onMicBtnClick}
                    >
                        <MdMicOff />
                    </div>
                    <div
                        className={styles.callingBtn + " " + styles.callEndBtn}
                        onClick={this.props.onCallEndClick}
                    >
                        <MdCallEnd />
                    </div>
                    <div
                        className={styles.callingBtn}
                        onClick={this.props.onVideoBtnClick}
                    >
                        <MdVideocamOff />
                    </div>
                </div>
                <div className={styles.showParticipantsBtn}>
                    <Button
                        type="dashed"
                        block
                        onClick={this.props.onShowParticipantsBtnClick}
                    >
                        Show Participants
                    </Button>
                </div>
            </div>
        );
    }
}

export default CallingActions;
