import React from "react";
import FileBrowser from 'react-keyed-file-browser'
import './../../../node_modules/react-keyed-file-browser/dist/react-keyed-file-browser.css';
import { FileList } from "./../../Api/FileExplorerOperations"
import { FileInfo } from "./FileInfo";
import FadeIn from "react-fade-in";
import {Loading} from "../Loading/Loading";
class FileManager extends React.Component{
    constructor(){
        super();
        this.state = {
            fileManager:{
                dir:"*",
                operation:"list",
            },
            files:[
            ],
            popup:false,
            loading:true
        }
    }

    initalList = (files) => {
        this.setState((prevState)=>{
            return {
                fileManager:prevState.fileManager,
                files:files
            }
        });
        console.log(this.state);
    }

    componentDidMount(){
        let promise = FileList(this.state.fileManager);
        promise.then((response) => {
            // @todo: handle error responses
            return (response.status === 200) ? response.json() : {};
        }).then((json)=>{
            this.setState((prevState)=>{
                return({
                    ...prevState,
                    loading:false
                });
            })
            // @todo: implement negative response
            if(json.response === "success"){
                this.initalList(JSON.parse(json.content));
            }
        });
    }

    fileClickHandler = (props) => {
        this.setState((prevState)=>{
            return {
                ...prevState,
            popup: props
            }
        },()=>{
            if(window.$('.ui.modal').get(1)) window.$('.ui.modal').get(1).remove()
            window.$('.ui.modal').modal('show')
            });
    }

    render(){
        return (
            <React.Fragment>
                    <Loading show={this.state.loading}/>
                    <FadeIn>
                        {this.state.files && <FileBrowser files={this.state.files} onSelectFile={this.fileClickHandler} />}
                        { this.state.popup ? <FileInfo key={this.state.popup.key} property={ this.state.popup }/>
                        : ""}
                    </FadeIn>
            </React.Fragment>
        );
    }
}

export default FileManager;