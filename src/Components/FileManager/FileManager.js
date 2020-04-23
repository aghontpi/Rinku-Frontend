import React from "react";
import FileBrowser from 'react-keyed-file-browser'
import './../../../node_modules/react-keyed-file-browser/dist/react-keyed-file-browser.css';

class FileManager extends React.Component{
    constructor(){
        super();
        this.state = {
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