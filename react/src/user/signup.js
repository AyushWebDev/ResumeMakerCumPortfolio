import React from 'react';
import './signup.css';
import {signup} from "./auth";
import {Link} from 'react-router-dom';
import Footer from 'rc-footer';
import Register from '../image/Login.jpg';
const errorStyle={
    textAlign: "center"
}
class Signup extends React.Component{
    constructor(){
        super();
        this.state={
            firstname: "",
            lastname: "",
            password: "",
            email: "",
            address: "",
            phone: "",
            linkedin: "",
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
        const {firstname,lastname,email,password,phone,address,linkedin}=this.state;
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

        if(email.length===0){
            this.setState({
                error: "Email is required"
            })
            return false
        }

        if(!/.+\@.+\..+/.test(email))
        {
            this.setState({
                error: "Please Enter a valid email"
            })
            return false;
        }

        if(phone.length===0)
        {
            this.setState({
                error: "phone is required"
            })
            return false;
        }

        if(!/^[6-9]\d{9}$/.test(phone))
        {
            this.setState({
                error: "valid phone no. is is required"
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

        if(linkedin.length===0)
        {
            this.setState({
                error: "linkedIn link is required"
            })
            return false;
        }

        return true;
    }

    handleSubmit=event=>{
        event.preventDefault();
        if(this.isValid()){
        const {firstname,lastname,password,email,address,phone,linkedin}=this.state;

        const user={
            firstname,
            lastname,
            password,
            email,
            contacts:{address,
            phone,
            linkedin}
        }

        const register=async (user)=>{
            const data=await signup(user);
            console.log(data);
            if(data.error){
                this.setState({error: data.error});
            }
            else{
                this.setState({
                    firstname:"",
                    lastname:"",
                    password:"",
                    email:"",
                    address:"",
                    linkedin:"",
                    phone:"",
                    error:""
                });
            }
        }
        register(user);
    }
    }

    render(){
        return(
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
                                    <li className="page-item"><Link to='/signin' className='page-link'><h5>Login</h5></Link></li>
                                </ul>
                            </div>
                            <form className='form-style-10' onSubmit={this.handleSubmit}>
                                {this.state.error && 
                                    <div className="alert alert-danger" style={errorStyle}>
                                        <i className='fas fa-exclamation-circle' style={{color:"red"}}></i> {this.state.error.toUpperCase()}
                                    </div>
                                }
                                <h1>Sign Up Now!<span>Sign up and tell us what you think of the site!</span></h1>
                                <div class="section"><span>1</span>First Name & Last Name</div>
                                <div class="inner-wrap">
                                    <label>Your First Name <input type="text" name="field1" onChange={this.handleChange("firstname")} value={this.state.firstname}/></label>
                                    <label>Your Last Name <input type='text' name="field2"onChange={this.handleChange("lastname")} value={this.state.lastname}/></label>
                                </div>

                                <div class="section"><span>2</span>Email & Phone</div>
                                <div class="inner-wrap">
                                    <label>Email Address <input type="email" name="field3" onChange={this.handleChange("email")} value={this.state.email}/></label>
                                    <label>Phone Number <input type="text" name="field4" onChange={this.handleChange("phone")} value={this.state.phone}/></label>
                                </div>

                                <div class="section"><span>3</span>Password & Address</div>
                                    <div class="inner-wrap">
                                    <label>Password <input type="password" name="field5" onChange={this.handleChange("password")} value={this.state.password}/></label>
                                    <label>Address <textarea name="field6" onChange={this.handleChange("address")} value={this.state.address}/></label>
                                </div>
                                <div class="section"><span>4</span>LinkedIn</div>
                                    <div class="inner-wrap">
                                    <label>LinkedIn Address <input type="url" name="field5" onChange={this.handleChange("linkedin")} value={this.state.linkedin} /></label>
                                </div>
                                <div class="button-section">
                                <input type="submit" name="Sign Up" />
                                    <span class="privacy-policy">
                                    <p style={{fontSize: "14px",textAlign: "center"}}>Already have an account? <Link to="/signin">Log In</Link></p> 
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
        )
    }
}

export default Signup;