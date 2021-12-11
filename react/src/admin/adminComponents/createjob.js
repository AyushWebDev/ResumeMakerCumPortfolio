import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import {addJob,isAuthenticated} from '../auth'
class CreateJob extends Component {
    constructor(){
        super();
        this.state={
            title:'',
            description:'',
            location:'',
            openings:0,
            experience:0, 
            education:'',
            desc:'',
            error: "",
            org: isAuthenticated().emp._id,
            redirectToReferer: false,
            isModalVisible:false
        }
    }
    handleChange=name=>event=>{
        this.setState({
            [name]: event.target.value,
            error: "" 
        });  
    };
    handleSubmit=event=>{
        event.preventDefault();
        // if(this.isValid()){
        const {title,description,org,location,openings,experience,education,desc}=this.state;
        console.log("check");
        const job={
            title,
            description,
            org,
            location,
            openings,
            eligibility:{
            exp: experience,
            edu: education,
            description: desc
            }
        }
        console.log("check");
        const postJob=async (job)=>{
            const data=await addJob(job);
            console.log(data);
            if(data.error){
                this.setState({error: data.error});
            }
            else{
                this.setState({
                    title: "",
                    description: "",
                    location: "",
                    desc: "", 
                    openings: 0,
                    experience: 0,
                    education: "",
                    error: ""
                });
                message.success('Job posted successfully');
            }
        }
        postJob(job);
        console.log("check");
    
    }
    render() {
        return (
            <div style={{maxHeight:'400px'}}>
                <form className='form-style-10' onSubmit={this.handleSubmit} style={{overflowY:'auto'}}>
                    {this.state.error && 
                        message.error(this.state.error)
                    }                          
                    <h1>Create Job Now!<span>Hire the best talent by clearly specifying requirements!</span></h1>
                        <div className="section"><span>1</span>Job Description</div>
                            <div className="inner-wrap">
                                <label>Job Title <input type="text" name="field1" onChange={this.handleChange("title")} value={this.state.title} /></label>
                            </div>
                            <div className="inner-wrap">
                                <label>Job Location <input type="text" name="field2" onChange={this.handleChange("location")} value={this.state.location} /></label>
                            </div>
                            <div className="inner-wrap">
                                <label>No of Openings <input type="number" name="field3" onChange={this.handleChange("openings")} value={this.state.openings} /></label>
                            </div>
                            <div className="inner-wrap">
                                <label>Job Description <textarea name="field4" rows='5' onChange={this.handleChange("description")} value={this.state.description} /></label>
                            </div>
                            <div className="section"><span>2</span>Eligibility</div>
                                <div className="inner-wrap">
                                    <label>Experience<input type="number" name="field5" onChange={this.handleChange("experience")} value={this.state.experience} /></label>
                                </div>
                                <div className="inner-wrap">
                                    <label>Education<input type="text" name="field6" onChange={this.handleChange("education")} value={this.state.education} /></label>
                                </div>
                                <div className="inner-wrap">
                                    <label>Description<textarea rows='4'name="field7" onChange={this.handleChange("desc")} value={this.state.desc} /></label>
                                </div>
                            <div className="button-section">
                                <input type="submit" name="Create" />
                                <span className="privacy-policy">
                                {/* <p style={{fontSize: "14px",textAlign: "center"}}>Don't have an Account? <Link to="/admin-signup">Create Account</Link></p>  */}
                                </span>
                            </div>
                </form>
            </div>
        );
    }
}

export default CreateJob;