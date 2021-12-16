import React ,{Component} from 'react';
import './Prototype2.css';
import Testdata from '../TestData';
import {signout,isAuthenticated,getUser} from '../user/auth';
import {Link} from 'react-router-dom';

class Prototype2 extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            id: this.props.match.params.userid,
            user: Testdata
        };
    }
    getUserDetails=async (id)=>{
        const data=await getUser(id);
        console.log(data);
        if(data.error){
            console.log(data.error);
        }
        else{
            this.setState({
                user: data
            }) 
        }
    }
    componentDidMount(){
        this.getUserDetails(this.state.id);
    }
    render()
    {
        return(
            <div>
            <nav class="navbar  navbar-expand-lg navbar-dark" data-aos="zoom-in" data-aos-duration="1000">
            <p className="navbar-brand " style={{paddingTop:'10px'}}><i className="fas fa-toolbox " style={{fontSize:'24 px'}}></i>Resume Maker Cum Portfolio </p>
            <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navb">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse flex flex-row-reverse " id="navb">
                <ul class="navbar-nav  ">
                    {this.props.match.url!=='/' &&
                    <li class="nav-item"> 
                        <Link class="nav-link" to="/"><button className="btn" style={{backgroundColor: "black",color: "white",padding: "2px"}}><span><i class="far fa-file"></i></span>Homepage</button></Link>
                    </li>
                    }
                    {isAuthenticated().user &&
                    <li class="nav-item"> 
                        <Link to={`/profile/${isAuthenticated().user._id}/profilecard/${isAuthenticated().user._id}`} class="nav-link"><button className="btn" style={{backgroundColor: "black",color: "white",padding: "2px"}}><span><i class="fas fa-file-signature"></i></span>My Portfolio</button></Link> 
                    </li>
                    }
                    {isAuthenticated().user && this.props.match.url!==`/resume/2/${isAuthenticated().user._id}` &&
                    <li class="nav-item"> 
                        <Link to={`/resume/2`} class="nav-link"><button className="btn" style={{backgroundColor: "black",color: "white",padding: "2px"}}><span><i class="fas fa-file-signature"></i></span>My Resume</button></Link> 
                    </li>
                    }
                    {!isAuthenticated() &&
                    <li class="nav-item"> 
                            <Link to="/signin" class="nav-link"><button className="btn" style={{backgroundColor: "black",color: "white",padding: "2px"}}><span><i class="fas fa-sign-in-alt"></i></span>Sign-in</button></Link> 
                    </li>
                    }
                    {isAuthenticated() &&
                    <li class="nav-item"> 
                            
                             <a className="nav-link" onClick={()=>signout(()=>{this.props.history.push('/')})}><button className="btn" style={{backgroundColor: "black",color: "white",padding: "2px"}}><span><i class="fas fa-sign-in-alt"></i></span>Sign-out</button></a> 
                    </li>
                    }
                    {!isAuthenticated() &&
                    <li class="nav-item"> 
                        <Link to="/signup" class="nav-link"><button className="btn" style={{backgroundColor: "black",color: "white",padding: "2px"}}><span><i class="fas fa-user-plus"></i></span>Register</button></Link>
                    </li>
                    }
                </ul>
               
            </div>
        </nav>
            <div className="container" style={{marginTop: "40px"}}>
                <div className="row">
                    <div className="col-sm-12 box2-1">
                        <h1 className="titleCol1" style={{textAlign: "left"}}>{this.state.user.firstname} {this.state.user.lastname}</h1>
                        
                    </div> 
                </div>
                <div className="row row2">
                    <div className="col-sm-5 box2-1 col">
                        <h3 className="titleCol1">Contact Me</h3>
                        <div style={{paddingBottom: "25px"}}>
                            <table>
                                <tr classname="row2">
                                    <td classname="col"><i className="fas fa-phone"></i></td>
                                    <td classname="col" style={{textAlign: "right"}}>{this.state.user.contacts.phone}</td>
                                </tr>
                                <br/>
                                <tr classname="row2">
                                    <td classname="col"><i className="fas fa-map-marker-alt"></i></td>
                                    <td classname="col" style={{textAlign: "right"}}>{this.state.user.contacts.address}</td>    
                                </tr>
                                <br/>
                                <tr classname="row2">
                                    <td classname="col"><i className="far fa-envelope"></i></td>
                                    <td classname="col" style={{textAlign: "right"}}>{this.state.user.email}</td>
                                </tr>
                                <br/>
                                <tr classname="row2">
                                    <td classname="col"><i className="fab fa-linkedin-in"></i></td>
                                    <td classname="col" style={{textAlign: "right"}}>{this.state.user.contacts.linkedin}</td>
                                </tr>
                            </table>
                            </div>
                            <h3 className="titleCol1">SKILLS</h3>
                            <div style={{paddingBottom: "25px"}}>
                            {this.state.user.skills.map((value)=>{
                                return(
                                <div className="row" style={{paddingBottom: "20px"}}>
                                    <div className="col-sm-8">{value.title}</div>
                                    <div className="col-sm-4">
                                    <div className="progress">
                                    <div className="progress-bar bg-info"  style={{width:`${value.rate/10*100}%`}}></div>
                                    </div>
                                    </div>
                                </div> 
                                );
                            })}
                            </div>
                           
                    </div>
                    <div className="col-sm-7 box2-2 col" style={{paddingBottom: "px"}}>
                        <h3>WORK EXPERIENCE</h3>
                            {this.state.user.work.map((value)=>{
                                return(<div className="row" style={{marginTop: "20px",marginBottom: "20px",padding: "20px 20px"}}>
                                    <div className="col-sm-4">
                                        {value.year.start}-{value.year.end? value.year.end:'Present'}
                                    </div>
                                    <div className="col-sm-8">
                                        <h5>{value.title}</h5>
                                        <small>{value.description}</small>
                                    </div>
                                </div>)
                            })}
                        <h3>EDUCATION</h3> 
                            {this.state.user.education.map((value)=>{
                                return(
                                    <div className="row" style={{marginTop: "20px",marginBottom: "20px",padding: "20px 20px"}}>
                                        <div className="col-sm-4">
                                        {value.year.start}-{value.year.end? value.year.end:'Present'}
                                    </div>
                                    <div className="col-sm-8">
                                        <h5>{value.title}</h5>
                                        <small>{value.institute}</small>
                                    </div>
                                </div>
                                );
                             })}
                         <h3>ACHIEVMENTS</h3>
                            <div style={{paddingBottom: "25px"}}>
                            {this.state.user.achievements.map((value)=>{
                                return(
                                    <div className="row" style={{marginTop: "20px",marginBottom: "20px",padding: "20px 20px"}}>
                                        <div className="col-sm-4">
                                        {value.title}
                                        </div>
                                        <div className="col-sm-8">
                                            <small>{value.description}</small>
                                        </div>
                                    </div>
                                );
                            })}
                            </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}
export default Prototype2;