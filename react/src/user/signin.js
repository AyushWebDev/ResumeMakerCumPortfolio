import React from 'react';
import './signup.css';
import {isAuthenticated, signin} from "./auth";
import {Link,Redirect} from 'react-router-dom';
import Footer from 'rc-footer';
import { message } from 'antd';
import Login from '../image/Register.jpg'
const errorStyle={
    textAlign: "center"
}
class Signin extends React.Component{
    constructor(){
        super();
        this.state={
            password: "",
            email: "",
            error: "",
            redirectToReferer: false
        }
    }
    handleChange=name=>event=>{
        this.setState({
            [name]: event.target.value,
            error: "" 
        }); 
    };

    isValid=()=>{
        const {email,password}=this.state;

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

        if(password.length>=0 && password.length<=5)
        {
            this.setState({
                error: "Password should contain atleast six characters"
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

        const login=async (user)=>{
            const data=await signin(user);
            console.log(data);
            if(data.error){
                this.setState({error: data.error});
            }
            else{
                if(typeof window !== "undefined"){
                    localStorage.setItem("jwt",JSON.stringify(data));//storing token(userinfo) in local storage
                    this.setState({
                        redirectToReferer: true
                    });
                }
            }
        }
        login(user);
    }
    }

    render(){
        if(this.state.redirectToReferer)
        {
            return <Redirect to={`/profile/${isAuthenticated().user._id}/profilecard/${isAuthenticated().user._id}`}/>
        }
        return(
            <div className="sign">
                <div className="container cont">
                    <div className="row">
                        {/* <div className="col-md-4"  style={{padding:'0px'}}>
                            <img src={Login} style={{width:'100%',height:'100%'}}/>
                        </div> */}
                        <div className="col-md-12">
                            <div className="navigate">
                                <ul className="pagination">
                                    <li className="page-item"><Link to='/signup' className='page-link'><h5>Register</h5></Link></li>
                                    <li className="page-item active"><Link to='#' className='page-link'><h5>Login</h5></Link></li>
                                </ul>   
                            </div>
                             <form className='form-style-10' onSubmit={this.handleSubmit}>
                                {this.state.error && 
                                        message.error(this.state.error.toLocaleUpperCase())
                                }
                                <h1>Sign In Now!<span>Sign in and build your profile more interactive!</span></h1>
                                <div className="section"><span>1</span>E-mail</div>
                                <div className="inner-wrap">
                                    <label>Your Email <input type="email" name="field1" onChange={this.handleChange("email")} value={this.state.email} /></label>
                                </div>
                                <div className="section"><span>2</span>Password</div>
                                <div className="inner-wrap">
                                    <label>Password <input type="password" name="field5" onChange={this.handleChange("password")} value={this.state.password} /></label>
                                </div>
                                <div className="button-section">
                                    <input type="submit" name="Sign Up" />
                                    <span className="privacy-policy">
                                    <p style={{fontSize: "14px",textAlign: "center"}}>Don't have an Account? <Link to="/signup">Create Account</Link></p> 
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

export default Signin;