import React from "react";
import Sidebar from "./../Sidebar/Sidebar"
import PageHolder from "./../PageHolder/PageHolder";
class Home extends React.Component{
    constructor(){
        super();
        this.state = {

        };
    }

    render(){
        return (
            <div>
                <Sidebar/>
                <PageHolder/>
            </div>
        );
    }

}

export default Home;