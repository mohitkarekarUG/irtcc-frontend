import React, { Component } from "react";
import { Layout, Button } from "antd";

const { Header, Content, Footer } = Layout;

class Home extends Component {
    componentDidMount() {
        document
            .getElementsByTagName("body")[0]
            .classList.add("deIndexZoom");
    }
    handleOnCreateMeetingClick = () => {

    }
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
