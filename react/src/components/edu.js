import React from 'react';
import {isAuthenticated,getEdu,delEdu} from '../user/auth';
import '../user/profile.css'
import 'antd/dist/antd.css';
// import './index.css';
import { Collapse } from 'antd';
import { CaretRightOutlined ,DeleteOutlined,BookOutlined,CalendarOutlined,BuildOutlined} from '@ant-design/icons';
const { Panel } = Collapse;
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
                <p><BookOutlined /> Education</p>
            <div className="list-group"> 
                {
                    this.state.education.map((edu,key)=>(
                        <div>
                            <Collapse
                                bordered={false}
                                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                                className="site-collapse-custom-collapse"
                                destroyInactivePanel={true}
                                key={key}
                                bordered={false}
                            >
                                <Panel header={edu.title} key={key} className="site-collapse-custom-panel" extra={<DeleteOutlined onClick={()=>this.handleDelete(edu._id)}/>}>
                                    <table>
                                        <tr>
                                            <td style={{width:'10%'}}><CalendarOutlined /></td>
                                            <td>{edu.year.start} - {edu.year.end}</td>
                                        </tr>
                                        <tr>
                                            <td style={{width:'10%'}}><BuildOutlined /></td>
                                            <td>{edu.institute}</td>
                                        </tr>
                                    </table>
                                </Panel>
                            </Collapse>
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