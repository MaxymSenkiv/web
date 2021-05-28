import React from "react";
import axios from "axios";
import "../css/signup_style.css"
import {useHistory} from "react-router-dom";

function RenderSignup(){
    const history = useHistory();
    function Work(event) {
        event.preventDefault();
        var username = document.getElementById('username').value;
        var email = document.getElementById('email').value;
        var password1 = document.getElementById('password1').value;
        var password2 = document.getElementById('password2').value
        axios.post('http://localhost:5000/signup',
            {
                username:username,
                email:email,
                password1:password1,
                password2:password2
            })
            .then(resp => {
                if (resp.data.message === 'Success') {
                    history.push('/login') ;
                }
                else
                {
                    document.getElementById("message").innerHTML =
                        '<h1 style="color:crimson;">'+resp.data.message+'</h1>';
                }
            });
    }
return(
    <div>
        <div className="center">
        <h1>Signup</h1>
        <form>
            <div className="txt_field">
                <input type="text" id="username" required/>
                    <span/>
                    <label>Username</label>
            </div>
            <div className="txt_field">
                <input type="text" id="email" required/>
                    <span/>
                    <label>Email</label>
            </div>
            <div className="txt_field">
                <input type="password" id="password1" required/>
                    <span/>
                    <label>Password</label>
            </div>
            <div className="txt_field">
                <input type="password" id="password2" required/>
                    <span/>
                    <label>Repeat password</label>
            </div>
            <input onClick={Work} type="submit" value="Register"/>
        </form>
        </div>
    </div>
)
}
export default RenderSignup;