import React from 'react';
import {isAuthenticated,getSkill,delSkill} from '../user/auth';
import { Collapse } from 'antd';
import { CaretRightOutlined ,DeleteOutlined,BookOutlined,CalendarOutlined,BuildOutlined} from '@ant-design/icons';
const { Panel } = Collapse;
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
                            <Collapse
                                bordered={false}
                                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                                className="site-collapse-custom-collapse"
                                destroyInactivePanel={true}
                                key={key}
                                bordered={false}
                            >
                                <Panel header={s.title} key={key} className="site-collapse-custom-panel" extra={<DeleteOutlined onClick={()=>this.handleDelete(s._id)}/>}>
                                <div className="progress">
                                     <div className="progress-bar" style={{width:`${s.rate/10*100}%`}}></div>
                                 </div>
                                </Panel>
                            </Collapse>
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
