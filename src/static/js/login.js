import React from "react";
import axios from "axios";
import "../css/login_style.css"
import {ReactSession} from 'react-client-session';
import {useHistory} from "react-router-dom";

ReactSession.setStoreType("localStorage");

async function Work()
{
    return  axios.post('/login',{}).
    then(resp => {
        if(resp.data.username==="1" && resp.data.password==='1')
            return "Success";
        return "Error"
    });
}
function RenderLogin(){
    const history = useHistory();
    function Work(event) {
        event.preventDefault();
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        axios.post('http://localhost:5000/login',
            {
                username: username,
                password: password
            })
            .then(resp => {
                if (resp.data.message === 'Success') {
                    ReactSession.set('id',resp.data.id);
                    ReactSession.set('username',resp.data.username);
                    history.push('/menu') ;
                }
                else
                {
                    document.getElementById("login").innerHTML =
                        '<h1 style="color:crimson;">'+resp.data.message+'</h1>';
                }
            });

    }
return(
    <div>
        <div className="center">
            <h1>Login</h1>
            <form onSubmit={Work}>
                <div className="txt_field">
                    <input type="text" id="username" placeholder=" "/>
                    <span/>
                    <label>Username</label>
                </div>
                <div className="txt_field">
                    <input type="password" id="password" placeholder=" "/>
                    <span/>
                    <label>Password</label>
                </div>
                <input type="submit" value="Login"/>
                <div className="signup">
                    Not a member?
                </div>
            </form>
        </div>
    </div>
)
}
export{
    Work
}
export default RenderLogin;