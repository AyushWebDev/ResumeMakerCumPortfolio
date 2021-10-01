import React from 'react';
import {isAuthenticated,getWork,delWork} from '../user/auth';

class Work extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id: this.props.match.params.id,
            work: []
        }
    }
    getWorkDetails=async (id)=>{
        const data=await getWork(id);
        console.log(data);
        if(data.error){
            console.log(data.error);
        }
        else{
            this.setState({
                work: data.work
            })
        }
    }
    deleteWork=async (eid)=>{
        const data=await delWork(this.state.id,{id: eid});
        console.log(data);
        if(data.error){
            console.log(data.error);
        }
        else{
            this.getWorkDetails(this.state.id); 
        }
    }
    componentDidMount(){
        this.getWorkDetails(this.state.id);
    }
    handleDelete=(eid)=>{
        this.deleteWork(eid);
    }
    render(){
        return(
            <div> 
                
                {
                    this.state.work.map((w,key)=>(
                        <div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item title"><h4><i class="fas fa-briefcase"></i><b>{w.title}</b></h4></li>
                            <li className="list-group-item detail">{w.year.start} {w.year.end}</li>
                            <li className="list-group-item detail">{w.description}</li>
                        </ul>
                        <div className="col-md-6">
                        <button onClick={()=>this.handleDelete(w._id)} className="btn btn-danger" style={{backgroundColor: "#ed5249"}}>Delete</button>
                        </div>
                        </div>
                    ))
                }
                 {isAuthenticated().user &&
                <div className="" style={{marginTop: "20px",textAlign: "center"}}>
                <button onClick={()=>this.props.history.push(`/editWork/${this.state.id}`)} className="btn btn-warning" style={{backgroundColor: "#ffcc00"}}><i className="fa fa-plus" aria-hidden="true"></i> Add</button>
                </div>
                }
                
            </div>
        )
    }
}


export default Work;