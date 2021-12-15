import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './styles.css';
import { message } from 'antd';
import { Collapse } from 'antd';
import { CaretRightOutlined,DeleteOutlined } from '@ant-design/icons';
import { Form } from 'antd'
import FormBuilder from 'antd-form-builder'
import { getJobApplications ,isAuthenticated } from '../auth';
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
      { key: 'firstname', label: 'Firstname' },
      { key: 'lastname', label: 'Lastname' },
      { key: 'contacts.phone', label: 'Phone'},
      { key: 'contacts.linkedin', label: 'LinkedIn'},
      { key: 'email', label: 'Email'},

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
        const data=await getJobApplications(id);
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

    
    
    render() {
        return (
            
            
            <div>
                <Collapse
                bordered={false}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                className="site-collapse-custom-collapse"
            >
                {this.state.job.map((j,k)=>(
                    j.applicants.map((a,i)=>(
                        <Panel header={j.title} key={i} className="site-collapse-custom-panel" extra={<DeleteOutlined onClick={()=>{}}/>}>
                        <FormBuilder meta={meta} initialValues={a} viewMode />
                        </Panel>
                    ))
                   
                ))}
               
                
            </Collapse>
            </div>
            
        );
    }
}

export default ManageOpening;