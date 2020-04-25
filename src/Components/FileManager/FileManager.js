import React from "react";
import FileBrowser from 'react-keyed-file-browser'
import './../../../node_modules/react-keyed-file-browser/dist/react-keyed-file-browser.css';
import { FileList } from "./../../Api/FileExplorerOperations"

class FileManager extends React.Component{
    constructor(){
        super();
        this.state = {
            pwd:"*",
            files:[
                {
                    key:'idm.zip',
                    size: 1024,
                    modified: +"today"
                }   
            ]
        }
    }

    componentDidMount(){
        /**@todo make api call to list files to display */
        let resp = FileList(this.state.pwd);
    }

    render(){
        return (
            <div>
                <FileBrowser files={this.state.files}/>
            </div>
        );
    }
}

export default FileManager;