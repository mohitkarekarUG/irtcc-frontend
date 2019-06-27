import React, { Component } from "react";
import usersData from "../data/users.json";
import { List, Checkbox } from "antd";

export default class StudentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            members: [],
            control: null
        };
    }
    componentDidMount() {
        this.setState({
            members: usersData
        });
    }

    onChange = (e, memberId) => {
        this.setState({
            control: memberId
        });
    };

    render() {
        return (
            <List
                dataSource={this.state.members}
                renderItem={member => (
                    <List.Item key={member.memberId}>
                        <Checkbox
                            // value=
                            checked={this.state.control === member.memberId}
                            onChange={e => this.onChange(e, member.memberId)}
                        />
                        {" " + member.name}
                    </List.Item>
                )}
            />
        );
    }
}
