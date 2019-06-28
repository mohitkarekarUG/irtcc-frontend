import React, { Component } from "react";
import PropTypes from "prop-types";
import CodeEditor from "../CodeEditor";
import { Modal } from "antd";
import styles from "./CreateInteractionModal.module.css";

class CreateInteractionModal extends Component {
    static propTypes = {
        visible: PropTypes.bool,
        onClose: PropTypes.func,
        onCreation: PropTypes.func
    };
    constructor(props) {
        super(props);
        this.state = {
            inputValue: `var a = 3;\nvar x = (100 + 50) * a;\ndocument.getElementById("demo").innerHTML = x;`
        };
    }

    onChange = ({ newValue }) => {
        this.setState({
            inputValue: newValue
        });
    };

    showModal = () => {
        this.props.onClose();
    };

    hideModal = () => {
        this.props.onClose();
    };

    hasValidateInputs = () => {
        return this.state.inputValue.length > 1;
    }

    handleSubmitClick = () => {
        this.props.onCreation({
            questionType: "coding",
            data: this.state.inputValue
        });
        this.props.onClose();
    }

    render() {
        const { visible } = this.props;
        const { inputValue } = this.state;
        return (
            <Modal
                style={{ top: 20 }}
                title="Coding"
                width="660px"
                visible={visible}
                onOk={this.handleSubmitClick}
                okText="Create Interaction"
                cancelText="cancel"
                okButtonProps={{
                    disabled: !this.hasValidateInputs()
                }}
            >
                <CodeEditor
                    className={styles.editor}
                    value={inputValue}
                    onCodeChange={this.onChange}
                />
            </Modal>
        );
    }
}

export default CreateInteractionModal;
