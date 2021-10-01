import React from 'react';
import '../user/signup.css';
import {isAuthenticated,addSkill} from "../user/auth";
import {Redirect} from 'react-router-dom';
const errorStyle={
    textAlign: "center"
}
class Achievement extends React.Component{
    constructor(props){
        super(props);
        this.state={
            title: "",
            rate: "",
            redirectToReferer: false,
            error: ""
        }
    }


    handleChange=name=>event=>{
        this.setState({
            [name]: event.target.value,
            error: "" 
        }); 
    };

    isValid=()=>{
       
    }

    handleSubmit=event=>{
        event.preventDefault();
        
        const {title,rate}=this.state;

        const user={
            data:[
            
                {
                title: title,
                rate: rate
                }]
            
            
            }
        
        

        const edit=async (id)=>{
            const data=await addSkill(id,user);
            console.log(data);
            if(data.error){
                this.setState({error: data.error});
            }
            else{
                this.setState({
                    title: "",
                    descripton: "",
                    error:"",
                    redirectToReferer: true
                });
           }
        }
        
        edit(isAuthenticated().user._id);

    
    }

    render(){
        if(this.state.redirectToReferer)
        {
            return <Redirect to={`/profile/${isAuthenticated().user._id}/skill`}/>
        }
        return(
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                            <h2>Add Skill</h2>
                            <form onSubmit={this.handleSubmit}> 
                                {this.state.error && 
                                <div className="alert alert-danger" style={errorStyle}>
                                    <i className='fas fa-exclamation-circle' style={{color:"red"}}></i> {this.state.error.toUpperCase()}
                                </div>
                                }
                                <div className="container">
                                    <div className="row">
                                    <div className="col-md-4"></div>
                                    <div className="">
                                    
                                    <div className="form-group">
                                        <label><i className="fa fa-envelope" aria-hidden="true"></i> <b>Skill</b></label>
                                        <input type="text" className="form-control" onChange={this.handleChange("title")} value={this.state.title}></input>
                                    </div>
                                    <div className="form-group">
                                        <label><i className="fa fa-key" aria-hidden="true"></i><b>Rate [out of 10]</b></label>
                                        <input type="number" className="form-control" onChange={this.handleChange("rate")} value={this.state.rate}></input>
                                    </div>
                                    <div className="">
                                            <button type="submit" className="btn btn-warning btn-block">Add</button>
                                            
                                        </div>
                                    </div>
                               </div>
                               </div>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Achievement;