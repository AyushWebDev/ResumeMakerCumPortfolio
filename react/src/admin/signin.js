import React, { Component } from 'react';
import {Link,Redirect, Router} from 'react-router-dom';
import Footer from 'rc-footer';
import { message,Button } from 'antd';
import Modal from 'antd/lib/modal/Modal';

class AdminSignIn extends Component {
    constructor(){
        super();
        this.state={
            password: "",
            email: "",
            error: "",
            redirectToReferer: false,
            isModalVisible:false
        }
    }
    componentDidMount() {
        this.setState({isModalVisible:true});
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
    render() {
        // if(this.state.redirectToReferer)
        // {
        //     return <Redirect to={`/profile/${isAuthenticated().user._id}`}/>
        // }
        return (
            <div className="sign">
                <Modal title='' visible={this.state.isModalVisible} 
                onCancel={()=>{this.setState({isModalVisible:false})}}
                footer={[
                    <Link to='/'>
                    <Button key="back" style={{float:'left'}}>
                      Return to Homepage
                    </Button>
                    </Link>,
                    <Button key="submit" type="primary"  onClick={()=>{this.setState({isModalVisible:false})}}>
                      Continue
                    </Button>
                ]}
                >
                    <h3 style={{color:'red'}}>You are logging in as Employer</h3>
                    <h4 style={{color:'green'}}>Continue to hire best talent in simplest possible way!</h4>
                </Modal>
                <div className="container cont">
                    <div className="row">
                        {/* <div className="col-md-4"  style={{padding:'0px'}}>
                            <img src={Login} style={{width:'100%',height:'100%'}}/>
                        </div> */}
                        <div className="col-md-12">
                            <div className="navigate">
                                <ul className="pagination">
                                    <li className="page-item"><Link to='/admin-signup' className='page-link'><h5>Register</h5></Link></li>
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
                                    <label>Your Full Name <input type="email" name="field1" onChange={this.handleChange("email")} value={this.state.email} /></label>
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
        );
    }
}

export default AdminSignIn;