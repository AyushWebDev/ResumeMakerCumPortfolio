import React from 'react';
import {isAuthenticated,getAch,delAch,addAch} from '../user/auth';
import { Collapse,Modal,Button, message,Popover} from 'antd';
import { CaretRightOutlined ,DeleteOutlined,BookOutlined,CalendarOutlined,BuildOutlined,PlusCircleOutlined} from '@ant-design/icons';
const { Panel } = Collapse;
class Achievement extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id: this.props.match.params.id,
            achievement: [],
            isModalVisible:false,
            title: "",
            description: "",
            redirectToReferer: false,
            error: ""
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
        message.warning('Field Deleted from your profile');
    }
    openModal(){
        this.setState({isModalVisible:true});
    }
    handleChange=name=>event=>{
        this.setState({
            [name]: event.target.value,
            error: "" 
        }); 
    };
    handleSubmit=()=>{
        // event.preventDefault();
        
        const {title,description}=this.state;

        const user={
            data:[
            
                {
                title: title,
                description: description
                }]
            
            
            }
        
        

        const edit=async (id)=>{
            const data=await addAch(id,user);
            console.log(data);
            if(data.error){
                this.setState({error: data.error});
            }
            else{
                this.setState({
                    title: "",
                    description: "",
                    error:"",
                    redirectToReferer: true
                });
           }
           window.location.reload();
        }
        
        edit(isAuthenticated().user._id);
    }
    handleCancel(){this.setState({isModalVisible:false})}
    handleOk(){this.setState({isModalVisible:false},()=>{this.handleSubmit()})}
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
                            <Modal title="Add Achievement" visible={this.state.isModalVisible} onOk={()=>this.handleOk()} onCancel={()=>this.handleCancel()} okText='Add'>
                                    {this.state.error && 
                                        message.error(this.state.error.toUpperCase())
                                    }
                                    <div className="container">
                                        <div className="row">
                                        <div className="col-md-4"></div>
                                        <div className="">
                                        
                                        <div className="form-group">
                                            <label><i className="fa fa-envelope" aria-hidden="true"></i> <b>Title</b></label>
                                            <input type="text" className="form-control" onChange={this.handleChange("title")} value={this.state.title}></input>
                                        </div>
                                        <div className="form-group">
                                            <label><i className="fa fa-key" aria-hidden="true"></i><b>Description</b></label>
                                            <input type="text" className="form-control" onChange={this.handleChange("description")} value={this.state.description}></input>
                                        </div>
                                        </div>
                                </div>
                                </div>
                            </Modal>
                        </div>
                    ))
                }
                 {isAuthenticated().user &&
                <div className="" style={{marginTop: "20px",textAlign: "center"}}>
                    <Popover placement="topLeft" content="Add Achievement">
                        <PlusCircleOutlined onClick={()=>{this.openModal()}}/>
                    </Popover>
                </div>
                }
            </div>
        )
    }
}

export default Achievement;
