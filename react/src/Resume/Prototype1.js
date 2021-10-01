import React, {Component} from 'react';
import './Prototype1.css';
import { ProSidebar, Menu, MenuItem, SubMenu ,SidebarHeader, SidebarFooter, SidebarContent} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {BsFillEyeFill, BsFillInfoCircleFill,BsFillPersonFill,BsFillPlusCircleFill, BsHeart} from 'react-icons/bs'
import {ImFolderDownload} from 'react-icons/im';
import Testdata from '../TestData';
import {getUser,isAuthenticated} from '../user/auth';
class Prototype1 extends Component
{
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
            <div className="row">
             <div className="col-sm-2"></div>   
            <div className="container col-sm-8 full">
                <div className="row box1">
                    <div className="col-sm-4 name">
                        <h1 style={{textAlign: "left"}}>{this.state.user.firstname} {this.state.user.firstname}</h1>
                        <p><small>About</small></p>
                    </div>
                    <div className="col-sm-8">
                        <div className="row box1-1">
                            <div className="col-sm-6">
                                <h3>Contact Me</h3>
                                <table>
                                    <tr>
                                        <td><i class="fas fa-phone"></i></td>
                                        <td>{this.state.user.contacts.phone}</td>
                                    </tr>
                                    <tr>
                                        <td><i class="fas fa-map-marker-alt"></i></td>
                                        <td>{this.state.user.contacts.address}</td>
                                    </tr>
                                    <tr>
                                        <td><i class="far fa-envelope"></i></td>
                                        <td>{this.state.user.email}</td>
                                    </tr>
                                    <tr>
                                        <td><i class="fab fa-linkedin-in"></i> </td>
                                        <td>{this.state.user.contacts.linkedin}</td>
                                    </tr>
                                </table>
                            </div>
                            <div className="col-sm-6">
                                <h3>About Me</h3>
                                <p><small>{this.state.user.about}</small></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row box1-2">
                    <div className="col-sm-6" style= {{padding: "20px 20px"}}>
                        <h3>WORK EXPERIENCE</h3>
                        {this.state.user.work.map((value)=>{
                            return(<div className="row" style={{margin: "20px 20px"}}>
                                <div className="col-sm-4">
                                   {value.year.start}-{value.year.end}
                                </div>
                                <div className="col-sm-8">
                                    <h5>{value.title}</h5>
                                    <small style={{fontSize: "15px"}}>{value.description}</small>
                                </div>
                            </div>)
                        })}
                    </div>
                    <div className="col-sm-6"  style= {{padding: "20px 20px"}}>
                        <h3>EDUCATION</h3> 
                        {this.state.user.education.map((value)=>{
                            return(
                                <div className="row" style={{margin: "20px 20px"}}>
                                    <div className="col-sm-4">
                                    {value.year.start}-{value.year.end}
                                    </div>
                                    <div className="col-sm-8">
                                        <h5>{value.title}</h5>
                                        <small style={{fontSize: "15px"}}>{value.institute}</small>
                                    </div>
                            </div>
                            );
                        })}
                    </div>
                </div>
                <div className="row box1-2">
                    <div className='col-sm-6' style= {{padding: "20px 20px"}}>
                        <h3>ACHIEVMENTS</h3>
                        {this.state.user.achievements.map((value)=>{
                            return(
                                <div className="row" style={{margin: "20px 20px"}}>
                                    <div className="col-sm-5">
                                     {value.title}
                                    </div>
                                    <div className="col-sm-7">
                                        <small>{value.description}</small>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className='col-sm-6' style= {{padding: "20px 20px"}}>
                        <h3>SKILLS</h3>
                        {this.state.user.skills.map((value)=>{
                            return(
                            <div className="row" style={{margin: "20px 20px"}}>
                                <div className="col-sm-4">{value.title}</div>
                                <div className="col-sm-6">
                                <div className="progress">
                                    <div className="progress-bar bg-info" style={{width: `${value.rate/10*100}%`}}></div>
                                </div>
                                </div>
                            </div> 
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
        );
    }
}
export default Prototype1;