import React from 'react';
import {isAuthenticated,getWork,delWork} from '../user/auth';
import { Collapse } from 'antd';
import { CaretRightOutlined ,DeleteOutlined,BookOutlined,CalendarOutlined,BuildOutlined} from '@ant-design/icons';
const { Panel } = Collapse;
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
                            <Collapse
                                bordered={false}
                                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                                className="site-collapse-custom-collapse"
                                destroyInactivePanel={true}
                                key={key}
                                bordered={false}
                            >
                                <Panel header={w.title} key={key} className="site-collapse-custom-panel" extra={<DeleteOutlined onClick={()=>this.handleDelete(w._id)}/>}>
                                    <table>
                                        <tr>
                                            <td style={{width:'10%'}}><CalendarOutlined /></td>
                                            <td>{w.year.start} - {w.year.end}</td>
                                        </tr>
                                        <tr>
                                            <td style={{width:'10%'}}><BuildOutlined /></td>
                                            <td>{w.description}</td>
                                        </tr>
                                    </table>
                                </Panel>
                            </Collapse>
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