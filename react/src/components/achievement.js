import React from 'react';
import {isAuthenticated,getAch,delAch} from '../user/auth';

class Achievement extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id: this.props.match.params.id,
            achievement: []
        }
    }
    getAchDetails=async (id)=>{
        const data=await getAch(id);
        console.log(data);
        if(data.error){
            console.log(data.error);
        }
        else{
            this.setState({
                achievement: data.achievements
            })
        }
    }
    deleteAch=async (eid)=>{
        const data=await delAch(this.state.id,{id: eid});
        console.log(data);
        if(data.error){
            console.log(data.error);
        }
        else{
            this.getAchDetails(this.state.id); 
        }
    }
    componentDidMount(){
        this.getAchDetails(this.state.id);
    }
    handleDelete=(eid)=>{
        this.deleteAch(eid);
    }
    render(){
        return(
            <div> 
                {
                    this.state.achievement.map((ach,key)=>(
                        <div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item title"><h4><i class="fas fa-briefcase"></i><b>{ach.title}</b></h4></li>
                            <li className="list-group-item detail">{ach.description}</li>
                        </ul>
                         <div>
                         <button onClick={()=>this.handleDelete(ach._id)} className="btn btn-danger" style={{backgroundColor: "#ed5249"}}>Delete</button>
                         </div>
                         </div>
                    ))
                }
                 {isAuthenticated().user &&
                <div className="" style={{marginTop: "20px",textAlign: "center"}}>
                <button onClick={()=>this.props.history.push(`/editAch/${this.state.id}`)} className="btn btn-warning" style={{backgroundColor: "#ffcc00"}}><i className="fa fa-plus" aria-hidden="true"></i> Add</button>
                </div>
                }
            </div>
        )
    }
}

export default Achievement;
