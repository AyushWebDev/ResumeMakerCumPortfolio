import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './styles.css';
import { Collapse } from 'antd';
import { CaretRightOutlined,DeleteOutlined } from '@ant-design/icons';
import { Form } from 'antd'
import FormBuilder from 'antd-form-builder'
import { getJob } from '../auth';
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
      { key: 'name.first', label: 'First Name' },
      { key: 'name.last', label: 'Last Name' },
      { key: 'gender', label: 'Gender' },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Phone' },
      { key: 'address', label: 'Address', colSpan: 2 },
      { key: 'city', label: 'City' },
      { key: 'zipCode', label: 'Zip Code' },
    ],
  }
class ManageOpening extends Component {
    constructor()
    {
        super();
        this.state={
            id: "",
            firstname: '',
            lastname: '',
            org_email: '',
            address: '',
            org_title:'',
            error: "",
            collapsed:false
        }
    }
    componentDidMount() {
        const getJobDetails=async (id)=>{
            console.log('Fuction Called')
            const data=await getJob(id);
            console.log(data);
            if(data.error){
                console.log(data.error);
            }
            // else{
            //     this.setState({
            //         firstname: data.firstname,
            //         lastname: data.lastname,
            //         org_email: data.email,
            //         address: data.address,
            //         org_name:data.orgname,
            //         error: ""
            //     },console.log(this.state));
            // }
        }
        const id=this.props.match.params.empid;
        getJobDetails(id);
    }
    
    render() {
        return (
            <div>
                <Collapse
                bordered={false}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                className="site-collapse-custom-collapse"
            >
                <Panel header="This is panel header 1" key="1" className="site-collapse-custom-panel" extra={<DeleteOutlined onClick={()=>{}}/>}>
                <FormBuilder meta={meta} initialValues={personalInfo} viewMode />
                </Panel>
                <Panel header="This is panel header 2" key="2" className="site-collapse-custom-panel">
                <p>{text}</p>
                </Panel>
                <Panel header="This is panel header 3" key="3" className="site-collapse-custom-panel">
                <p>{text}</p>
                </Panel>
            </Collapse>
            </div>
        );
    }
}

export default ManageOpening;