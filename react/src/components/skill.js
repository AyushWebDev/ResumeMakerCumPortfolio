import React from 'react';
import {isAuthenticated,getSkill,delSkill,addSkill} from '../user/auth';
import { Collapse,message,Modal,Popover } from 'antd';
import { CaretRightOutlined ,DeleteOutlined,BookOutlined,CalendarOutlined,Outlined,PlusCircleOutlined} from '@ant-design/icons';
const { Panel } = Collapse;
class Skill extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id: this.props.match.params.id,
            skill: [],
            title: "",
            rate: "",
            redirectToReferer: false,
            error: "",
            isModalVisible:false
        }
    }
    openModal(){
        this.setState({isModalVisible:true});
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
    handleCancel(){this.setState({isModalVisible:false})}
    handleOk(){this.setState({isModalVisible:false},()=>{this.handleSubmit()})}
    componentDidMount(){
        this.getSkillDetails(this.state.id);
    }
    handleDelete=(eid)=>{
        this.deleteSkill(eid);
        message.warning('Field Deleted from your profile');
    }
    handleChange=name=>event=>{
        this.setState({
            [name]: event.target.value,
            error: "" 
        }); 
    };

    isValid=()=>{
       
    }

    handleSubmit=()=>{
        const {title,rate}=this.state;

        const user={
            data:[
            
                {
                title: title,
                rate: rate
                }]
            
            
            }
        
        

        const edit=async (id)=>{
            const data=await addSkill(id,user);
            console.log(data);
            if(data.error){
                this.setState({error: data.error});
            }
            else{
                this.setState({
                    title: "",
                    descripton: "",
                    error:"",
                    redirectToReferer: true
                });
           }
           window.location.reload();
        }
        
        edit(isAuthenticated().user._id);

    
    }
    render(){
        return(
            <div> 
                 <p><BookOutlined /> Skills</p>
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
                <Modal title="Add Skill" visible={this.state.isModalVisible} onOk={()=>this.handleOk()} onCancel={()=>this.handleCancel()} okText='Add'>
                            {this.state.error && 
                                 message.error(this.state.error.toUpperCase())
                            }
                                <div className="container">
                                    <div className="row">
                                    <div className="col-md-4"></div>
                                    <div className="">
                                    
                                    <div className="form-group">
                                        <label><i className="fa fa-envelope" aria-hidden="true"></i> <b>Skill</b></label>
                                        <input type="text" className="form-control" onChange={this.handleChange("title")} value={this.state.title}></input>
                                    </div>
                                    <div className="form-group">
                                        <label><i className="fa fa-key" aria-hidden="true"></i><b>Rate [out of 10]</b></label>
                                        <input type="number" className="form-control" onChange={this.handleChange("rate")} value={this.state.rate}></input>
                                    </div>
                                    </div>
                               </div>
                               </div>
                            </Modal>
                 {isAuthenticated().user &&
                <div className="" style={{marginTop: "20px",textAlign: "center"}}>
                    <Popover placement="topLeft" content="Add Skill">
                        <PlusCircleOutlined onClick={()=>{this.openModal()}}/>
                    </Popover>
                </div>
                }
            </div>
        )
    }
} 

export default Skill;
