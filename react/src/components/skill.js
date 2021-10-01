import React from 'react';
import {isAuthenticated,getSkill,delSkill} from '../user/auth';

class Skill extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id: this.props.match.params.id,
            skill: []
        }
    }
    getSkillDetails=async (id)=>{
        const data=await getSkill(id);
        console.log(data);
        if(data.error){
            console.log(data.error);
        }
        else{
            this.setState({
                skill: data.skills
            })
        }
    }
    deleteSkill=async (eid)=>{
        const data=await delSkill(this.state.id,{id: eid});
        console.log(data);
        if(data.error){
            console.log(data.error);
        }
        else{
            this.getSkillDetails(this.state.id); 
        }
    }
    componentDidMount(){
        this.getSkillDetails(this.state.id);
    }
    handleDelete=(eid)=>{
        this.deleteSkill(eid);
    }
    render(){
        return(
            <div> 
                {
                    this.state.skill.map((s,key)=>(
                        <div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item title"><h4> <i class="fas fa-pen-nib"></i><b>{s.title}</b></h4></li>
                            <li className="list-group-item detail">
                                <div className="progress">
                                    <div className="progress-bar" style={{width:`${s.rate/10*100}%`}}></div>
                                </div>
                                {/* {s.rate} */}
                            </li>
                        </ul>
                        <div>
                        <button onClick={()=>this.handleDelete(s._id)} className="btn btn-danger" style={{backgroundColor: "#ed5249"}}>Delete</button>
                        </div>
                        </div>
                    ))
                }
                 {isAuthenticated().user &&
                <div className="" style={{marginTop: "20px",textAlign: "center"}}>
                <button onClick={()=>this.props.history.push(`/editSkill/${this.state.id}`)} className="btn btn-warning" style={{backgroundColor: "#ffcc00"}}><i className="fa fa-plus" aria-hidden="true"></i> Add</button>
                </div>
                }
            </div>
        )
    }
}

export default Skill;
