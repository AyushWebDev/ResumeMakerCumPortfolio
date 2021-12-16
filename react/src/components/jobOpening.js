import React, { Component } from 'react';
<<<<<<< HEAD
import {getAllJob} from '../user/auth';
import { Button, Collapse } from 'antd';
=======
import {getAllJob,isAuthenticated,applyJob} from '../user/auth';
import { Button, Collapse , message} from 'antd';
>>>>>>> ccb6564b55eb0ea2b52d69905dda56a5730c2f5e
import { CaretRightOutlined,DeleteOutlined } from '@ant-design/icons';
import FormBuilder from 'antd-form-builder'
const { Panel } = Collapse;
const meta = {
    columns: 2,
    fields: [
      { key: 'org.orgname', label: 'Company',colSpan:2},
      { key: 'title', label: 'Job Title' },
      { key: 'location', label: 'Location' },
      { key: 'openings', label: 'No. Openings'},
      { key: 'eligibility.exp', label: 'Experience req'},
      { key: 'eligibility.edu', label: 'Qualification'},
      {key:'description',label:'Job Description',colSpan:2}
    ],
  }
class JobOpening extends Component {
    constructor()
    {
        super();
        this.state={
            job: [],
            error: "",
            collapsed:false
        }
        
    }
    
    getAllJobs=async (id)=>{
        console.log('Fuction Called');
        const data=await getAllJob(id);
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
<<<<<<< HEAD
    componentDidMount() {
        console.clear();
        this.getAllJobs();
    }
=======

    apply=async (aid,oid)=>{
        const data=await applyJob(oid,aid);
        console.log(data);
        if(data.error){
            console.log(data.error);
        }
        else{
            message.success("Applied Successfully");
            this.getAllJobs();
        }
    }

    componentDidMount() {
        this.getAllJobs();
    }

   

>>>>>>> ccb6564b55eb0ea2b52d69905dda56a5730c2f5e
    render() {
        return (
            <div>
            <Collapse
            bordered={false}
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            className="site-collapse-custom-collapse"
        >
<<<<<<< HEAD
            {this.state.job.map((value,index)=>(
=======
            {this.state.job.map((value,index)=>{
                    
                    if(value.applicants.findIndex((a)=>{return a._id===isAuthenticated().user._id})===-1){
                        return(
>>>>>>> ccb6564b55eb0ea2b52d69905dda56a5730c2f5e
                    <Panel header={value.title} key={index} className="site-collapse-custom-panel" extra={
                        <div style={{display:'flex',height:'30%',overflowX:'hidden',textOverflow:'ellipsis'}}>
                            {value.org.orgname}
                        </div>
                    }>
                    <FormBuilder meta={meta} initialValues={value} viewMode />
<<<<<<< HEAD
                    <Button>
                        Apply Now
                    </Button>
                    </Panel>
                )
=======
                    <Button onClick={()=>this.apply(isAuthenticated().user._id,value._id)}>
                        Apply Now
                    </Button>
                    </Panel>
                     )}
            }
>>>>>>> ccb6564b55eb0ea2b52d69905dda56a5730c2f5e
            )}
           
            
        </Collapse>
        </div>
        );
    }
}

export default JobOpening;