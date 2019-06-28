import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./InjectZoom.module.css";
import { Spin } from "antd";
// import "../initZoom.js";
// import $ from 'jquery';

let ZoomMtg = window.ZoomMtg;

class InjectZoom extends Component {
    static propTypes = {
        onMicBtnClick: PropTypes.func
    };
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        console.log('mount')
        this.some = setTimeout(() => {
            console.log("init");
            this.initZoom();
        }, 5000);
    }

    initZoom = () => {
        if (!ZoomMtg) return false;


        console.log("checkSystemRequirements");
        console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));

        // it's option if you want to chenge the jssdk dependency link resources.
        // ZoomMtg.setZoomJSLib('https://dmogdx0jrul3u.cloudfront.net/1.4.2/lib', '/av'); // CDN version default
        // ZoomMtg.setZoomJSLib('http://localhost:9999/node_modules/zoomus-jssdk/dist/lib', '/av'); // Local version default

        ZoomMtg.preLoadWasm();

        ZoomMtg.prepareJssdk();

        // var API_KEY = "BNXad-PpS1KgXfQ_2AoUWw";
        // var API_SECRET = "BByoa44DHTtJreFXbmMXlo7IJcP2twKJq5an";

        /**
         * NEVER PUT YOUR ACTUAL API SECRET IN CLIENT SIDE CODE, THIS IS JUST FOR QUICK PROTOTYPING
         * The below generateSignature should be done server side as not to expose your api secret in public
         * You can find an eaxmple in here: https://marketplace.zoom.us/docs/sdk/native-sdks/Web-Client-SDK/tutorial/generate-signature
         */

        var API_KEY = "BNXad-PpS1KgXfQ_2AoUWw";
        var API_SECRET = "BByoa44DHTtJreFXbmMXlo7IJcP2twKJq5an";

        // document
        //     .getElementById("create_meeting")
        //     .addEventListener("click", function(e) {
        //         e.preventDefault();

        //         console.log("create meeting");
        //         const createAppUrl =
        //             "https://api.zoom.us/v2/users/BDHj4uY9TkGUiMA_tXbPLA/meetings";
        //         fetch(createAppUrl, {
        //             method: "POST", // or 'PUT'
        //             headers: {
        //                 authorization:
        //                     "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IkJOWGFkLVBwUzFLZ1hmUV8yQW9VV3ciLCJleHAiOjE1NjE2NjQ0NzAsImlhdCI6MTU2MTY1OTA3MX0.n3SJ4OYPNnd49n3Q3mVU9XlWo7G1gV3TofgTssTnx_c",
        //                 "content-type": "application/json",
        //                 "Access-Control-Allow-Origin": "*"
        //             }
        //         })
        //             .then(res => res.json())
        //             .then(response =>
        //                 console.log("Success:", JSON.stringify(response))
        //             )
        //             .catch(error => console.error("Error:", error));
        //     });

        // document
        //     .getElementById("join_meeting")
        //     .addEventListener("click", function(e) {
        //         e.preventDefault();

        //         if (!this.form.checkValidity()) {
        //             alert("Enter Name and Meeting Number");
        //             return false;
        //         }

        var meetConfig = {
            apiKey: API_KEY,
            apiSecret: API_SECRET,
            meetingNumber: parseInt(230475315),
            userName: "Rohan's Name",
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
                        // $("#nav-tool").hide();
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
        // });
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
