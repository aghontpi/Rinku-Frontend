import React from "react";
import FileBrowser from 'react-keyed-file-browser'
import './../../../node_modules/react-keyed-file-browser/dist/react-keyed-file-browser.css';

class FileManager extends React.Component{
    constructor(){
        super();
        this.state = {

        }
    }

    componentDidMount(){
        /**@todo make api call to list files to display */
    }

    render(){
        return (
            <div>
                <FileBrowser files={[]}/>
            </div>
        );
    }
}

export default FileManager;