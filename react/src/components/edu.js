import React from 'react';
import {isAuthenticated,getEdu,delEdu,addEdu} from '../user/auth';
import '../user/profile.css'
import 'antd/dist/antd.css';
// import './index.css';
import { Collapse ,Modal,message,Popover} from 'antd';
import { CaretRightOutlined ,DeleteOutlined,BookOutlined,CalendarOutlined,BuildOutlined,PlusCircleOutlined} from '@ant-design/icons';
const { Panel } = Collapse;
class Edu extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id: this.props.match.params.id,
            education: [],
            title: "",
            start: "",
            end: "",
            institute: "",
            redirectToReferer: false,
            error: "",
            isModalVisible:false
        }
    }
    openModal(){
        this.setState({isModalVisible:true},console.log('Modal opened',this.state.isModalVisible));
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
    handleChange=name=>event=>{
        this.setState({
            [name]: event.target.value,
            error: "" 
        }); 
    };

    isValid=()=>{
       
    }

    handleSubmit=()=>{        
        const {title,start,end,institute}=this.state;

        const user={
            data:[
            
                {
                title: title,
                year: {
                    start: start,
                    end: end
                },
                institute: institute
                }]
            
            
            }
        
        

        const edit=async (id)=>{
            const data=await addEdu(id,user);
            console.log(data);
            if(data.error){
                this.setState({error: data.error});
            }
            else{
                this.setState({
                    title: "",
                    start: "",
                    end: "",
                    institute: "",
                    error:"",
                    redirectToReferer: true
                });
           }
           window.location.reload();
        }
        
        edit(isAuthenticated().user._id);

    
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
        if(isAuthenticated().user)
        {
        this.deleteEdu(eid);
        message.warning('Field Deleted from your profile');
        }
    }
    handleCancel(){this.setState({isModalVisible:false})}
    handleOk(){this.setState({isModalVisible:false},()=>{this.handleSubmit()})}
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
                <Modal title="Add Education" visible={this.state.isModalVisible} onOk={()=>this.handleOk()} onCancel={()=>this.handleCancel()} okText='Add' className='modalStyle'>
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
                                        <label><i className="fa fa-key" aria-hidden="true"></i><b>Institute</b></label>
                                        <input type="text" className="form-control" onChange={this.handleChange("institute")} value={this.state.institute}></input>
                                    </div>
                                    </div>
                               </div>
                               </div>
                            </Modal>
            </div>
             {isAuthenticated().user &&
                <div className="" style={{marginTop: "20px",textAlign: "center"}}>
                    <Popover placement="topLeft" content="Add Education">
                        <PlusCircleOutlined onClick={()=>{this.openModal()}}/>
                    </Popover>
                </div>
                }
                </div>
        )
    }
}

export default Edu;