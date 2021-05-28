import './App.css';
import RenderLogin from "./static/js/login";
import RenderSignup from "./static/js/signup";
import RenderMenu from "./static/js/menu";
import RenderUser from "./static/js/user";
import {Component} from "react";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";

class App extends Component{
  render(){
    return (
        <Router>
            <div className={"Login"}>
                <Switch>
                    <Route path='/login' exact component={RenderLogin}/>
                    <Route path='/signup'  component={RenderSignup}/>
                    <Route path='/menu'  component={RenderMenu}/>
                    <Route path='/user'  component={RenderUser}/>
                </Switch>
            </div>
        </Router>
    );
  }
}

export default App;
