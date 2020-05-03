import React from "react"
import { withRouter } from "react-router";
// anyone can access this component, even logged out users
// thus this component requires a seperate router instead of 
// nested router.
class DownloadPage extends React.Component{
    constructor(){
        super()
        this.state = {
            fileid:""
        }
    }

    componentDidMount(){
        const { fileid } = this.props.match.params;
        this.setState((prevState) => {
            return({
                    ...prevState,
                    fileid:fileid
                }
            )
            
        }, ()=>console.log(this.state));
        
    }

    render(){
        return(
            <div>
                <h4>Download page</h4>
            </div>
        );
    }

}

export default withRouter(DownloadPage);