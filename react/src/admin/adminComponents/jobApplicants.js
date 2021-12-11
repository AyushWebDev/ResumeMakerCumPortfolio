import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './styles.css';
import { Collapse } from 'antd';
import { CaretRightOutlined,DeleteOutlined,CheckCircleOutlined,CloseCircleOutlined } from '@ant-design/icons';
import { Form } from 'antd'
import FormBuilder from 'antd-form-builder'
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
    render() {
        return (
            <div>
                <Collapse
                bordered={false}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                className="site-collapse-custom-collapse"
            >
                <Panel header="This is panel header 1" key="1" className="site-collapse-custom-panel" extra={
                    <div>
                        <span style={{paddingRight:'10px'}}>
                        <CheckCircleOutlined /></span>
                        <CloseCircleOutlined />
                    </div>
                }>
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