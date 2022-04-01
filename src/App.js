import React, {Component} from 'react';
import MonacoEditor from 'react-monaco-editor';
import './App.css';

const defaultCode = `export default {
  name: 'name',
  code: 'code'
}`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: defaultCode
    }
    this.onChangeHandle = this
      .onChangeHandle
      .bind(this);
  }
  onChangeHandle(value, e) {
    this.setState({code: value});
  }
  editorDidMountHandle(editor, monaco) {
    console.log('editorDidMount', editor);
    editor.focus();
  }
  render() {
    const code = this.state.code;
    const options = {
      selectOnLineNumbers: true,
      renderSideBySide: false
    };
    return (
      <div >
        <div className="wrapper">
          <div className="editor-container">
            <MonacoEditor
              theme="vs-dark"
              language="javascript"
              value={code}
              options={options}
              onChange={this.onChangeHandle}
              editorDidMount={this.editorDidMountHandle}/>
          </div>
          <div className="view" contenteeitable={'true'}>
            {this.state.code}
          </div>
        </div>
      </div>
    );
  }
}

export default App;