import React, { Component } from 'react';

let UE = window.UE;

class Ueditor extends Component {
    static defaultProps = {
        config: {
            autoHeightEnabled: true,
            autoFloatEnabled: true,
            initialFrameHeight: 200,
            editorContent: ''
        }
      }
    
      constructor(props){
        super(props);
        this.state = {
        };
      }
    
      componentDidMount(){
        this.initEditor()
      }
    
      componentWillUnmount() {
        // 组件卸载后，清除放入库的id
        UE.delEditor(this.props.id);
      }
    
      initEditor() {
        const { id, config } = this.props;
        const ueEditor = UE.getEditor(this.props.id, config);
        const self = this;
        ueEditor.ready((ueditor) => {
          if (!ueditor) {
            UE.delEditor(id);
            self.initEditor();
          } else {
            if (self.props.editorContent) {
              self.setContent(self.props.editorContent, false);
            }
          }
        })
        
      }

      getContent() {
        return UE.getEditor(this.props.id).getContent()
      }

      setContent(content) {
        UE.getEditor(this.props.id).setContent(content);
      }
    
      render(){
        return (
          <div id={this.props.id} name="content" type="text/plain"></div>
        )
      }
}

export default Ueditor;