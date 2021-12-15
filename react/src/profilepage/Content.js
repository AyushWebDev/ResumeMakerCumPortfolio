import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './Content.css';
import { getBasics,isAuthenticated,delEdu} from '../user/auth';
import {BrowserRouter,Switch,Route,Link} from 'react-router-dom';
import { Layout, Menu, Breadcrumb,Row,Col } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
  HomeOutlined
} from '@ant-design/icons';
import Achievement  from '../components/achievement';
import Skill from '../components/skill';
import Work from '../components/work';
import Edu from '../components/edu';
import Profile from '../user/profile';
import Text from 'antd/lib/typography/Text';
import { signout } from '../user/auth';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class SiderDemo extends React.Component {
    constructor()
    {
        super();
        this.state={
            id: "",
            firstname: "",
            lastname: "",
            email: "",
            address: "",
            phone: "",
            linkedin: "",
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
  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{fontSize:'20px'}}>
        <Sider defaultSelectedKeys={['Profile']}
         style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
         }}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" style={{fontSize:'17px',marginTop:'30%'}}>
            <Menu.Item key="profile" icon={<PieChartOutlined />}>
            <Link to={`/profile/${this.props.match.params.userid}/profilecard/${this.props.match.params.userid}`}>Your Profile</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Your Information
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User Info" >
              <Menu.Item key="3" style={{fontSize:'15px' }}>
                <Link to={`/profile/${this.props.match.params.userid}/edu/${this.props.match.params.userid}`}>Education </Link>
              </Menu.Item>
              <Menu.Item key="4" style={{fontSize:'15px' }}>
                <Link to={`/profile/${this.props.match.params.userid}/work/${this.props.match.params.userid}`}>Works</Link>
              </Menu.Item>
              <Menu.Item key="5" style={{fontSize:'15px' }}>
                <Link to={`/profile/${this.props.match.params.userid}/achievement/${this.props.match.params.userid}`}>Achievements</Link>
              </Menu.Item>
              <Menu.Item key="6" style={{fontSize:'15px' }}>
                <Link to={`/profile/${this.props.match.params.userid}/skill/${this.props.match.params.userid}`}>Skills</Link>
             </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Job Info">
              <Menu.Item key="7" style={{fontSize:'15px' }}>Jobs Applications</Menu.Item>
              <Menu.Item key="8" style={{fontSize:'15px' }}>Jobs Opening</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />}>
            <Link to={`/resume/2`}> Your Resume </Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<HomeOutlined />}>
              <Link to="/">Homepage</Link>
            </Menu.Item>
            <Menu.Item key="10" icon={<LogoutOutlined />}>
                 <a onClick={()=>signout(()=>{this.props.history.push('/')})}>Sign-out</a> 
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <Header className="site-layout-background" style={{ padding: 0,color:'white' }} >
                <p>Resume Maker Cum PortFolio </p>
          </Header>
          <Content      
            style={{margin: '24px 16px 0', overflow: 'initial' ,minHeight:'78vh'}}
          >
            <Breadcrumb style={{ margin: '16px 0',fontSize:'15px'}}>
              <Breadcrumb.Item><Text style={{
                color:'black',
                fontSize:'25px'
              }}>{this.state.firstname} / Profile</Text></Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ paddingTop: 36, paddingLeft:"200px"}}>
              {/* {this.state.firstname+' '+this.state.lastname} */}
              <Col span={18}
              style={{
                overflowY:'scroll' 
              }}>
              <Switch>
               <Route exact path ='/profile/:userid/profilecard/:id' component={Profile}></Route>
               <Route exact path='/profile/:userid/edu/:id' component={Edu}></Route>
               <Route exact path='/profile/:userid/work/:id' component={Work}></Route>
               <Route exact path='/profile/:userid/skill/:id' component={Skill}></Route>
               <Route exact path='/profile/:userid/achievement/:id' component={Achievement}></Route>                         
            </Switch>
            </Col>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Made with ❤️ by Ayush, Harsh and Shubham ©2021 </Footer>
        </Layout>
      </Layout>
    );
  }
}
export default SiderDemo;