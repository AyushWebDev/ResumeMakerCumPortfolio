import React, { Component } from 'react';
// import {signup} from "./auth";
import {Link} from 'react-router-dom';
import Footer from 'rc-footer';
import { message } from 'antd';
import Register from '../image/Login.jpg';
const errorStyle={
    textAlign: "center"
}
class AdminSignUp extends Component {
    constructor(){
        super();
        this.state={
            firstname: "",
            lastname: "",
            password: "",
            org_email: "",
            org_name:'',
            address: "",
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
        const {firstname,lastname,password,org_email,org_name,address}=this.state;
        if(firstname.length===0)
        {
            this.setState({
                error: "Firstname is required"
            })
            return false;
        }

        if(lastname.length===0)
        {
            this.setState({
                error: "Laststname is required"
            })
            return false;
        }

        if(password.length>=0 && password.length<=5)
        {
            this.setState({
                error: "Password should contain atleast six characters"
            })
            return false;
        }

        if(org_email.length===0){
            this.setState({
                error: "Email is required"
            })
            return false
        }

        if(!/.+\@.+\..+/.test(org_email))
        {
            this.setState({
                error: "Please Enter a valid email"
            })
            return false;
        }
        if(address.length===0)
        {
            this.setState({
                error: "address is required"
            })
            return false;
        }

        if(org_name.length===0)
        {
            this.setState({
                error: "linkedIn link is required"
            })
            return false;
        }

        return true;
    }
    // handleSubmit=event=>{
    //     To be completed by Ayush
    // }
    render() {
        return (
            <div className="sign">
            <div className="container cont">
                <div className="row">
                    {/* <div className="col-md-4" style={{padding:'0px'}}>
                        <img src={Register} style={{width:'100%',height:'100%'}}/>
                    </div> */}
                    <div className="col-md-12">
                        <div className='navigate'>
                            <ul className="pagination">
                                <li className="page-item active"><Link to='#' className='page-link'><h5>Register</h5></Link></li>
                                <li className="page-item"><Link to='/admin-signin' className='page-link'><h5>Login</h5></Link></li>
                            </ul>
                        </div>
                        <form className='form-style-10' onSubmit={this.handleSubmit}>
                            {this.state.error && 
                                    message.error(this.state.error.toLocaleUpperCase())
                            }
                            <h1>Sign Up Now!<span>By signing up, you agree to our master subscription agreement.</span></h1>
                            <div class="section"><span>1</span>First Name & Last Name</div>
                            <div class="inner-wrap">
                                <label>Your First Name <input type="text" name="field1" onChange={this.handleChange("firstname")} value={this.state.firstname}/></label>
                                <label>Your Last Name <input type='text' name="field2"onChange={this.handleChange("lastname")} value={this.state.lastname}/></label>
                            </div>

                            <div class="section"><span>2</span>Bussiness | Organisation | Institue Details</div>
                            <div class="inner-wrap">
                                <label>Organisation Name <input type="text" name="field3" onChange={this.handleChange("org_name")} value={this.state.org_name}/></label>
                                <label>Organisation Email <input type="email" name="field4" onChange={this.handleChange("org_email")} value={this.state.org_email}/></label>
                            </div>

                            <div class="section"><span>3</span>Password & Address</div>
                                <div class="inner-wrap">
                                <label>Password <input type="password" name="field5" onChange={this.handleChange("password")} value={this.state.password}/></label>
                                <label>Address <textarea name="field6" onChange={this.handleChange("address")} value={this.state.address}/></label>
                            </div>
                            <div class="button-section">
                            <input type="submit" name="Sign Up" />
                                <span class="privacy-policy">
                                <p style={{fontSize: "14px",textAlign: "center"}}>Already have an account? <Link to="/admin-signin">Log In</Link></p> 
                                </span>
                            </div>
                        </form> 
                    </div>
                </div>
            </div>
            <Footer
                columns={[
                {
                    icon: (
                    <img src="https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg" />
                    ),
                    title: 'Harsh Shukla',
                    url: 'https://yuque.com',
                    description: 'Harsh Shukla SDE Intern at Amazon',
                    openExternal: true,
                },
                {
                    icon: (
                    <img src="https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg" />
                    ),
                    title: 'Ayush Mishra',
                    url: 'https://yuque.com',
                    description: 'Harsh Shukla SDE Intern at Amazon',
                    openExternal: true,
                },
                {
                    icon: (
                    <img src="https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg" />
                    ),
                    title: 'Shubham Pathak',
                    url: 'https://yuque.com',
                    description: 'Harsh Shukla SDE Intern at Amazon',
                    openExternal: true,
                },
                ]}
                bottom="Made with ❤️ by Ayush, Harsh and Shubham"
            />
        </div>
        );
    }
}

export default AdminSignUp;