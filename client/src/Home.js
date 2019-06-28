import React, { Component } from "react";
import { Layout, Button, Input } from "antd";
import axios from 'axios'

const { Header, Content, Footer } = Layout;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meetingTopic: ""
        };
    }
    componentDidMount() {
        document.getElementsByTagName("body")[0].classList.add("deIndexZoom");
    }
    handleOnCreateMeetingClick = () => {
        axios
            .post("https://irtcc.herokuapp.com/meeting/create", {
                meetingTopic: this.state.meetingTopic
            })
            .then(({ data }) => {
                this.props.history.push("/join-meeting", {
                    meeting: data.data.meeting
                });
            });
    };
    render() {
        return (
            <Layout>
                <Header
                    style={{
                        position: "fixed",
                        zIndex: 1,
                        width: "100%"
                    }}
                >
                    <div className="logo" />
                </Header>
                <Content style={{ padding: "0 50px", marginTop: 64 }}>
                    <div
                        style={{
                            background: "#fff",
                            padding: 24,
                            marginTop: 24,
                            minHeight: 640
                        }}
                    >
                        <Input
                            defaultValue="Important Meeting"
                            onChange={v => this.setState({ meetingTopic: v })}
                        />
                        <Button
                            type="primary"
                            icon="poweroff"
                            loading={false}
                            onClick={this.handleOnCreateMeetingClick}
                        >
                            Create new Meeting
                        </Button>
                    </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                    IRTCC ©2019 Created by Thor's Hammer
                </Footer>
            </Layout>
        );
    }
}

export default Home;
