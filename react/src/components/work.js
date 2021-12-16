import React from 'react';
import {isAuthenticated,getWork,delWork,addWork} from '../user/auth';
import { Collapse ,Modal,message,Popover} from 'antd';
import { CaretRightOutlined ,DeleteOutlined,BookOutlined,CalendarOutlined,BuildOutlined,PlusCircleOutlined} from '@ant-design/icons';
const { Panel } = Collapse;
class Work extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id: this.props.match.params.id,
            work: [],
            title: "",
            start: "",
            end: "",
            descripton: "",
            redirectToReferer: false,
            error: "",
            isModalVisible:false
        }
    }
    openModal(){this.setState({isModalVisible:true});}
    handleCancel(){this.setState({isModalVisible:false})}
    handleOk(){this.setState({isModalVisible:false},()=>{this.handleSubmit()})}
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
    handleChange=name=>event=>{
        this.setState({
            [name]: event.target.value,
            error: "" 
        }); 
    };

    handleSubmit=()=>{
        const {title,start,end,description}=this.state;

        const user={
            data:[
            
                {
                title: title,
                year: {
                    start: start,
                    end: end
                },
                description: description
                }]
            
            
            }
        
        

        const edit=async (id)=>{
            const data=await addWork(id,user);
            console.log(data);
            if(data.error){
                this.setState({error: data.error});
            }
            else{
                this.setState({
                    title: "",
                    start: "",
                    end: "",
                    descripton: "",
                    error:"",
                    redirectToReferer: true
                });
           }
        }
        
        edit(isAuthenticated().user._id);
        window.location.reload();
    }
    componentDidMount(){
        this.getWorkDetails(this.state.id);
    }
    handleDelete=(eid)=>{
        if(isAuthenticated().user)
        {
        this.deleteWork(eid);
        message.warning('Field Deleted from your profile');
        }
    }
    render(){
        return(
            <div> 
                 <p><BookOutlined /> Works</p>
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
                 <Modal title="Add Work" visible={this.state.isModalVisible} onOk={()=>this.handleOk()} onCancel={()=>this.handleCancel()} okText='Add'>
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
                                        <label><i className="fa fa-key" aria-hidden="true"></i><b>Start</b></label>
                                        <input type="number" className="form-control" onChange={this.handleChange("start")} value={this.state.start}></input>
                                    </div>
                                    <div className="form-group">
                                        <label><i className="fa fa-key" aria-hidden="true"></i><b>End</b></label>
                                        <input type="number" className="form-control" onChange={this.handleChange("end")} value={this.state.end}></input>
                                    </div>
                                    <div className="form-group">
                                        <label><i className="fa fa-key" aria-hidden="true"></i><b>Description</b></label>
                                        <input type="text" className="form-control" onChange={this.handleChange("description")} value={this.state.description}></input>
                                    </div>
                                    </div>
                               </div>
                               </div>
                            </Modal>
                 {isAuthenticated().user &&
                <div className="" style={{marginTop: "20px",textAlign: "center"}}>
                    <Popover placement="topLeft" content="Add Work">
                        <PlusCircleOutlined onClick={()=>{this.openModal()}}/>
                    </Popover>
                </div>
                }
                
            </div>
        )
    }
}


export default Work;