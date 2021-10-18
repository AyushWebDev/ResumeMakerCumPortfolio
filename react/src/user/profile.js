import React from 'react';
import defaultImage from '../image/avatar.png';
import { getBasics,isAuthenticated,delEdu} from './auth';
import './profile.css'
import 'antd/dist/antd.css';
import { Card ,Grid} from 'antd';
import { EditOutlined,UserOutlined } from '@ant-design/icons';
const gridStyle = {
    width: '75%',
    textAlign: 'center',
    fontSize:'20px',
    border:'solid 3px white',
    background: '#e5eef1'
  };
const attributeStyle = {
    width:'25%',
    textAlign: 'center',
    fontSize:'20px',
    border:'solid 3px white',
   background: '#e5eef1'
  };
const cardstyle={
    width:'fit-content',
}
const {Meta}=Card
class Profile extends React.Component{
    constructor(){
        super();
        this.state={
            id: "",
            firstname: "",
            lastname: "",
            email: "",
            address: "",
            phone: "",
            linkedin: "",
            error: ""
        }
    }

    componentDidMount(){
        const getBasicsDetails=async (id)=>{
            const data=await getBasics(id);
            console.log(data);
            if(data.error){
                console.log(data.error);
            }
            else{
                this.setState({
                    firstname: data.firstname,
                    lastname: data.lastname,
                    email: data.email,
                    address: data.contacts.address,
                    phone: data.contacts.phone,
                    linkedin: data.contacts.linkedin,
                    error: ""
                })
            }
        }
        const id=this.props.match.params.userid;
        
        getBasicsDetails(id);
    }

    render(){
        return(
            <Card title='Profile Card'type='inner' bodyStyle={cardstyle} extra={<EditOutlined/>}>
                <Card.Grid style={attributeStyle} hoverable={false}>Name</Card.Grid>
                <Card.Grid style={gridStyle}>{this.state.firstname+' '+this.state.lastname}</Card.Grid>
                <Card.Grid style={attributeStyle} hoverable={false}>Email </Card.Grid>
                <Card.Grid style={gridStyle}>{this.state.email}</Card.Grid>
                <Card.Grid style={attributeStyle} hoverable={false}>Phone</Card.Grid>
                <Card.Grid style={gridStyle}>{this.state.phone}</Card.Grid>
                <Card.Grid style={attributeStyle} hoverable={false}>LinkedIn</Card.Grid>
                <Card.Grid style={gridStyle}>{this.state.linkedin}</Card.Grid>
                <Card.Grid style={attributeStyle} hoverable={false}>Address</Card.Grid>
                <Card.Grid style={gridStyle}>{this.state.address}</Card.Grid>
            </Card>
        )
    }
}

export default Profile;