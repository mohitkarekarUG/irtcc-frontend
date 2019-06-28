import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import CodeEditor from "../CodeEditor";
import styles from "./Coding.module.css";

class Coding extends Component {
    static propTypes = {
        className: PropTypes.string,
        value: PropTypes.string,
        readOnly: PropTypes.bool,
        isEditorActive: PropTypes.bool,
        onChange: PropTypes.func.isRequired
    };

    onChange = newValue => {
        this.props.onChange({ newValue: newValue });
    };

    render() {
        const { value, isEditorActive = false } = this.props;
        return (
            <div
                className={cx(styles.container, {
                    [styles.active]: isEditorActive
                })}>
                <header className={styles.header}>Editor</header>
                <CodeEditor value={value} onCodeChange={this.onChange} />
            </div>
        );
    }
}

export default Coding;
