// import React, { Component } from "react";
// import usersData from "../data/users.json";
// import { List, Checkbox } from "antd";

// export default class StudentList extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             control: null
//         };
//     }

//     onChange = (e, memberId) => {
//         this.setState({
//             control: memberId
//         });
//     };

//     render() {
//         return (
//             <List
//                 dataSource={this.props.members}
//                 renderItem={member => (
//                     <List.Item key={member.memberId}>
//                         <Checkbox
//                             checked={this.state.control === member.memberId}
//                             onChange={e => this.onChange(e, member.memberId)}
//                         />
//                         {" " + member.memberId}
//                     </List.Item>
//                 )}
//             />
//         );
//     }
// }
