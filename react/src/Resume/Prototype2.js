import React ,{Component} from 'react';
import './Prototype2.css';
import Testdata from '../TestData';
import {getUser,isAuthenticated} from '../user/auth';

class Prototype2 extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            id: isAuthenticated().user._id,
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
            <div className="container" style={{marginTop: "40px"}}>
                <div className="row">
                    <div className="col-sm-12 box2-1">
                        <h1>{this.state.user.firstname} {this.state.user.lastname}</h1>
                        
                    </div> 
                </div>
                <div className="row">
                    <div className="col-sm-4 box2-1">
                        <h3>Contact Me</h3>
                        <div style={{paddingBottom: "25px"}}>
                            <table>
                                <tr>
                                    <td><i className="fas fa-phone"></i></td>
                                    <td>{this.state.user.contacts.phone}</td>
                                </tr>
                                <tr>
                                    <td><i className="fas fa-map-marker-alt"></i></td>
                                    <td>{this.state.user.contacts.address}</td>    
                                </tr>
                                <tr>
                                    <td><i className="far fa-envelope"></i></td>
                                    <td>{this.state.user.email}</td>
                                </tr>
                                <tr>
                                    <td><i className="fab fa-linkedin-in"></i> </td>
                                    <td>{this.state.user.contacts.linkedin}</td>
                                </tr>
                            </table>
                            </div>
                            <h3>SKILLS</h3>
                            <div style={{paddingBottom: "25px"}}>
                            {this.state.user.skills.map((value)=>{
                                return(
                                <div className="row" style={{paddingBottom: "20px"}}>
                                    <div className="col-sm-4">{value.title}</div>
                                    <div className="col-sm-6">
                                    <div className="progress">
                                    <div className="progress-bar bg-info"  style={{width:`${value.rate/10*100}%`}}></div>
                                    </div>
                                    </div>
                                </div> 
                                );
                            })}
                            </div>
                            <h3>ACHIEVMENTS</h3>
                            <div style={{paddingBottom: "25px"}}>
                            {this.state.user.achievements.map((value)=>{
                                return(
                                    <div className="row" style={{paddingBottom: "20px"}}>
                                        <div className="col-sm-5">
                                        {value.title}
                                        </div>
                                        <div className="col-sm-7">
                                            <small style={{fontSize: "15px"}}>{value.description}</small>
                                        </div>
                                    </div>
                                );
                            })}
                            </div>
                    </div>
                    <div className="col-sm-8 box2-2" style={{paddingBottom: "px"}}>
                        <h3>WORK EXPERIENCE</h3>
                            {this.state.user.work.map((value)=>{
                                return(<div className="row" style={{marginTop: "20px",marginBottom: "20px",padding: "20px 20px"}}>
                                    <div className="col-sm-4">
                                        {value.year.start}-{value.year.end}
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
                                        {value.year.start}-{value.year.end}
                                    </div>
                                    <div className="col-sm-8">
                                        <h5>{value.title}</h5>
                                        <small>{value.institute}</small>
                                    </div>
                                </div>
                                );
                             })}
                        
                    </div>
                </div>
            </div>
        );
    }
}
export default Prototype2;