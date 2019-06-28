import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./InjectZoom.module.css";
import { Spin } from "antd";

let ZoomMtg = window.ZoomMtg;

class InjectZoom extends Component {
    static propTypes = {
        onMicBtnClick: PropTypes.func
    };
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.initZoom();
    }

    initZoom = () => {
        if (!ZoomMtg) return false;

        ZoomMtg.preLoadWasm();

        ZoomMtg.prepareJssdk();

        var API_KEY = "BNXad-PpS1KgXfQ_2AoUWw";
        var API_SECRET = "BByoa44DHTtJreFXbmMXlo7IJcP2twKJq5an";

        var meetConfig = {
            apiKey: API_KEY,
            apiSecret: API_SECRET,
            meetingNumber: parseInt(283831279), //HardCoded
            userName: "WebApp", //HardCoded
            passWord: "",
            leaveUrl: "https://zoom.us",
            role: 0
        };

        var signature = ZoomMtg.generateSignature({
            meetingNumber: meetConfig.meetingNumber,
            apiKey: meetConfig.apiKey,
            apiSecret: meetConfig.apiSecret,
            role: meetConfig.role,
            success: function(res) {
                console.log("signature", res.result);
            }
        });

        console.log("signature", signature);

        ZoomMtg.init({
            leaveUrl: "http://www.zoom.us",
            isSupportAV: true,
            success: function() {
                ZoomMtg.join({
                    meetingNumber: meetConfig.meetingNumber,
                    userName: meetConfig.userName,
                    signature: signature,
                    apiKey: meetConfig.apiKey,
                    userEmail: "email@gmail.com",
                    passWord: meetConfig.passWord,
                    success: function(res) {
                        console.log("zoom success msg", res);
                        ZoomMtg.showJoinAudioFunction({
                            show: false
                        });
                        ZoomMtg.showPureSharingContent({
                            show: false
                        });
                        console.log("join meeting success");
                    },
                    error: function(res) {
                        console.log(res);
                    }
                });
            },
            error: function(res) {
                console.log(res);
            }
        });
    };

    render() {
        return (
            <div id="init-zoom-here">
                <Spin className={styles.spinner} />
            </div>
        );
    }
}

export default InjectZoom;
