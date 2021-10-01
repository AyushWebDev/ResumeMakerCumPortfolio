import React from 'react';
import {isAuthenticated,getEdu,delEdu} from '../user/auth';
import '../user/profile.css'

class Edu extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id: this.props.match.params.id,
            education: []
        }
    }
    getEduDetails=async (id)=>{
        const data=await getEdu(id);
        console.log(data);
        if(data.error){
            console.log(data.error);
        }
        else{
            this.setState({
                education: data.education
            })
        }
    }
    deleteEdu=async (eid)=>{
        const data=await delEdu(this.state.id,{id: eid});
        console.log(data);
        if(data.error){
            console.log(data.error);
        }
        else{
            this.getEduDetails(this.state.id); 
        }
    }
    componentDidMount(){
        this.getEduDetails(this.state.id);
    }
    handleDelete=(eid)=>{
        this.deleteEdu(eid);
    }
    render(){
        return(
            <div>
            <div className="list-group"> 
                {
                    this.state.education.map((edu,key)=>(
                        
                        <div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item title"><h4><i className="fas fa-university"></i><b>{edu.title}</b></h4></li>
                            <li className="list-group-item detail">{edu.year.start} - {edu.year.end}</li>
                            <li className="list-group-item detail">{edu.institute}</li>
                        </ul>
                        
                        <div className="col-md-6">
                            <button onClick={()=>this.handleDelete(edu._id)} className="btn btn-danger" style={{backgroundColor: "#ed5249"}}>Delete</button>
                        </div>
                        
                        </div>
                          
                    ))
                }
                 
               
            </div>
             {isAuthenticated().user &&
                <div className="" style={{marginTop: "20px",textAlign: "center"}}>
                <button onClick={()=>this.props.history.push(`/editEdu/${this.state.id}`)} className="btn btn-warning" style={{backgroundColor: "#ffcc00"}}><i className="fa fa-plus" aria-hidden="true"></i> Add</button>
                </div>
                }
                </div>
        )
    }
}

export default Edu;