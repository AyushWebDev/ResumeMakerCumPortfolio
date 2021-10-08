import React from 'react';
import {isAuthenticated,getAch,delAch} from '../user/auth';
import { Collapse } from 'antd';
import { CaretRightOutlined ,DeleteOutlined,BookOutlined,CalendarOutlined,BuildOutlined} from '@ant-design/icons';
const { Panel } = Collapse;
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
                            <Collapse
                                bordered={false}
                                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                                className="site-collapse-custom-collapse"
                                destroyInactivePanel={true}
                                key={key}
                                bordered={false}
                            >
                                <Panel header={ach.title} key={key} className="site-collapse-custom-panel" extra={<DeleteOutlined onClick={()=>this.handleDelete(ach._id)}/>}>
                                    <p>{ach.description}</p>
                                </Panel>
                            </Collapse>
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
