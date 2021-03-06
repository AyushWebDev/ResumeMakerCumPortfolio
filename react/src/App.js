import React from 'react';
import {BrowserRouter,Switch,Route,withRouter} from 'react-router-dom';
import SignUp from "./user/signup";
import SignIn from "./user/signin";
import Profile from './user/profile';
import HomePage from './Homepage/HomePage';
import Prototype2 from './Resume/Prototype2';
import Prototype1 from './Resume/Prototype1';
import Content from './profilepage/Content';
import AdminSignIn from './admin/signin';
import AdminSignUp from './admin/signup';
import AdminProfile from './admin/admin_profile';
class App extends React.Component{
  

  render()
  {
    return(
        <BrowserRouter>
        
            
              <Switch>
                <Route exact path="/" component={HomePage}></Route>
                <Route exact path='/admin-signin' component={AdminSignIn}></Route>
                <Route exact path='/admin-signup' component={AdminSignUp}></Route>
                <Route path='/admin-profile/:empid' component={AdminProfile}></Route>
                <Route exact path="/signup" component={SignUp}></Route>
                <Route exact path="/signin" component={SignIn}></Route>
                <Route exact path="/resume/1" component={Prototype1}></Route>
                <Route exact path="/resume/2/:userid" component={Prototype2}></Route>
                <Route path="/profile/:userid" component={Content}></Route>
              </Switch>
          
        </BrowserRouter>
    )
  } 
}
export default App;