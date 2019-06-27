import React, { Component } from "react";
import styles from "./CallingActions.module.css";
import { MdCallEnd, MdVideocamOff, MdMicOff } from "react-icons/md";

class CallingActions extends Component {
    // static propTypes = {
    // };

    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div className={styles.footerBar}>
                <div className={styles.callingBtn}>
                    <MdMicOff />
                </div>
                <div className={styles.callingBtn}>
                    <MdCallEnd />
                </div>
                <div className={styles.callingBtn}>
                    <MdVideocamOff />
                </div>
            </div>
        );
    }
}

export default CallingActions;
