import React from "react";
import FileBrowser from 'react-keyed-file-browser'

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