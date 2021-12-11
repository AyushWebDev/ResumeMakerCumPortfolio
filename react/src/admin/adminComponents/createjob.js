import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { message } from 'antd';
class CreateJob extends Component {
    constructor(){
        super();
        this.state={
            title:'',
            description:'',
            location:'',
            openings:0,
            eligibility:{
                experience:0,
                education:'',
                description:''
            },
            error: "",
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
                                <label>Job Description <textarea name="field4" rows='5' onChange={this.handleChange("description")} value={this.state.desc} /></label>
                            </div>
                            <div className="section"><span>2</span>Eligibility</div>
                                <div className="inner-wrap">
                                    <label>Experience<input type="number" name="field5" onChange={this.handleChange("password")} value={this.state.password} /></label>
                                </div>
                                <div className="inner-wrap">
                                    <label>Education<input type="text" name="field6" onChange={this.handleChange("password")} value={this.state.password} /></label>
                                </div>
                                <div className="inner-wrap">
                                    <label>Description<textarea rows='4'name="field7" onChange={this.handleChange("password")} value={this.state.password} /></label>
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