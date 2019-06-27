import React, { Component } from "react";
import PropTypes from "prop-types";
import AceEditor from "react-ace";

import "brace/mode/javascript";
import "brace/theme/monokai";

class CodeEditor extends Component {
    static propTypes = {
        value: PropTypes.string,
        readOnly: PropTypes.bool,
        onCodeChange: PropTypes.func.isRequired
    };

    onChange = newValue => {
        this.props.onCodeChange({ newValue: newValue });
    };

    render() {
        const { value } = this.props;
        return (
            <div style={{ height: "100%" }}>
                <header className="sidebarHeader">Editor</header>
                <AceEditor
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
