import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './styles.css';
import { message } from 'antd';
import { Collapse } from 'antd';
import { CaretRightOutlined,DeleteOutlined } from '@ant-design/icons';
import { Form } from 'antd'
import FormBuilder from 'antd-form-builder'
import { getJob ,isAuthenticated, deleteJob } from '../auth';
const { Panel } = Collapse;
const text='Hi harsh this is collapse';
const personalInfo = {
    name: { first: 'Nate', last: 'Wang' },
    email: 'myemail@gmail.com',
    gender: 'Male',
    phone: '15988888888',
    city: 'Shanghai',
    address: 'No.1000 Some Road, Zhangjiang Park, Pudong New District',
  }
  const meta = {
    columns: 2,
    fields: [
      { key: 'org.orgname', label: 'Company',colSpan:2 },
      { key: 'title', label: 'Job Title' },
      { key: 'location', label: 'Location' },
      { key: 'applicants.length', label: 'Applicants'},
      { key: 'openings', label: 'Openings' },
      { key: 'eligibility.edu', label: 'Qualification',},
      { key: 'eligibility.exp', label: 'Experience' },
      { key: 'description', label: 'Job Desc',colSpan:2 },
      { key: 'eligibility.description', label: 'Requirement',colSpan:2 },

    ],
  }
class ManageOpening extends Component {
    constructor()
    {
        super();
        this.state={
            job: [],
            error: "",
            collapsed:false
        }
        
    }
    
    getJobDetails=async (id)=>{
        console.log('Fuction Called');
        const data=await getJob(id);
        console.log(data);
        if(data.error){
            console.log(data.error);
        }
        else{
            this.setState({
                job: data,
                error: ""
            },console.log(this.state));
        }
    }
    componentDidMount() {
       
        const id=isAuthenticated().emp._id;
        this.getJobDetails(id);
    }

    handleDelete=(jid)=>{
        const id=isAuthenticated().emp._id;
        
        const delJob=async (j)=>{
            console.log('delete called');
            const data=await deleteJob(j);
            console.log(data);
            if(data.error){
                console.log(data.error);
            }
            else{
                message.success(data.msg);
                console.log("done");
                this.getJobDetails(id);
            }
        }
        
        delJob(jid);
       
    }
    
    render() {
        return (
            
            
            <div>
                <Collapse
                bordered={false}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                className="site-collapse-custom-collapse"
            >
                {this.state.job.map((j,k)=>(
                    <Panel header={j.title} key={k} className="site-collapse-custom-panel" extra={<DeleteOutlined onClick={()=>this.handleDelete(j._id)}/>}>
                    <FormBuilder meta={meta} initialValues={j} viewMode />
                    </Panel>
                ))}
               
                
            </Collapse>
            </div>
            
        );
    }
}

export default ManageOpening;