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
        },()=>window.$('.ui.modal').modal('show'));
    }

    render(){
        return (
            <div>
                <Loading show={this.state.loading}/>
                <FadeIn>
                    <FileBrowser files={this.state.files} onSelectFile={this.fileClickHandler} />
                    {this.state.popup ? <FileInfo property={ this.state.popup }/>
                    : ""}
                </FadeIn>
            </div>
        );
    }
}

export default FileManager;