import React, { Component } from "react";
import PropTypes from "prop-types";
import AceEditor from "react-ace";

import "brace/mode/javascript";
import "brace/theme/monokai";

class CodeEditor extends Component {
    static propTypes = {
        className: PropTypes.string,
        value: PropTypes.string,
        readOnly: PropTypes.bool,
        onCodeChange: PropTypes.func.isRequired
    };

    onChange = newValue => {
        this.props.onCodeChange({ newValue: newValue });
    };

    render() {
        const { className, value } = this.props;
        return (
            <div style={{ height: "100%" }}>
                <AceEditor
                    className={className}
                    mode="javascript"
                    theme="monokai"
                    onChange={this.onChange}
                    name="codeEditor"
                    editorProps={{ $blockScrolling: true }}
                    fontSize={13}
                    value={value}
                />
            </div>
        );
    }
}

export default CodeEditor;
