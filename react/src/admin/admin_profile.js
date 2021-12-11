import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { getBasics,signout,isAuthenticated} from '../admin/auth';
import {BrowserRouter,Switch,Route,Link} from 'react-router-dom';
import { Layout, Menu, Breadcrumb,Row,Col } from 'antd';
import {
  UsergroupAddOutlined,
  PieChartOutlined,
  ProfileOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import Text from 'antd/lib/typography/Text';
import ManageOpenening from './adminComponents/manageopening';
import CreateJob from './adminComponents/createjob';
import JobApplicants from './adminComponents/jobApplicants'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
class AdminProfile extends Component {
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

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
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
                    org_email: data.email,
                    address: data.address,
                    org_name:data.orgname,
                    error: ""
                },console.log(this.state));
            }
        }
        const id=this.props.match.params.empid;
        getBasicsDetails(id);
    }
    render() {
        return (
        <div>
        <Layout style={{fontSize:'20px'}}>
        <Sider defaultSelectedKeys={['Profile']}
         style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
         }}>
          <div className="logo" />
          <Menu theme="dark"  mode="inline" style={{fontSize:'17px',marginTop:'30%'}}>
            <Menu.Item key="profile" icon={<PieChartOutlined />}>
            <Link to={`/admin-profile/${isAuthenticated().emp._id}/manage/${isAuthenticated().emp._id}`} as="/manageJobs">Manage Openings</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<UsergroupAddOutlined />}>
            <Link to={`/admin-profile/${isAuthenticated().emp._id}/create-job/${isAuthenticated().emp._id}`}>Create Job </Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<ProfileOutlined />}>
            <Link to={`/admin-profile/${isAuthenticated().emp._id}/job-applicants/${isAuthenticated().emp._id}`}>Job Applications</Link> 
            </Menu.Item>
            <Menu.Item key="4" icon={<LogoutOutlined />}>
                 <a onClick={()=>signout(()=>{this.props.history.push('/')})}>Sign-out</a> 
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <Header className="site-layout-background" style={{ padding: 0,color:'white' }} >
                <p>Resume Maker Cum PortFolio </p>
          </Header>
          <Content      
            style={{margin: '24px', overflow: 'initial' ,minHeight:'78vh'}}
          >
            <Breadcrumb style={{ margin: '8px 0px',fontSize:'15px'}}>
              <Breadcrumb.Item><Text style={{
                color:'black',
                fontSize:'25px'
              }}>{this.state.firstname} / Profile</Text></Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ paddingLeft:"200px"}}>
              <Col span={18}
              style={{
                overflowY:'scroll' 
              }}>
              <Switch>
               <Route exact path ='/admin-profile/:empid/manage/:empid' component={ManageOpenening}></Route>
               <Route exact path ='/admin-profile/:empid/create-job/:empid' component={CreateJob}></Route>
               <Route exact path ='/admin-profile/:empid/job-applicants/:empid' component={JobApplicants}></Route>
            </Switch>
            </Col>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Made with ❤️ by Ayush, Harsh and Shubham ©2021 </Footer>
        </Layout>
      </Layout>
            </div>
        );
    }
}

export default AdminProfile;