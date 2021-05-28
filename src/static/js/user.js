import React from "react";
import "../css/menu_style.css"
import {ReactSession} from 'react-client-session';
import {useHistory} from "react-router-dom";
import axios from "axios";

function RenderUser(){
    if (ReactSession.get('id'))
    return(
        <div>
            <h1 className="logged_as">Logged as {[ReactSession.get('username')]}</h1>
            <div className="title">
                <h1>Your songs</h1>
                <input onClick={ShowUserSong} id="show_btn" type="submit" value="Show songs"/>
            </div>
            <table className="table">
                <tbody id="tableData">
                </tbody>
            </table>
            <div className="songs">

                <div className="UserInfo">
                    <RenderLogOut/>
                </div>
            </div>
        </div>
    )
    else
        return (
            <div>No logined user</div>
        )
}
function RenderLogOut()
{
    const history = useHistory();
    function LogOut(event)
    {
        event.preventDefault();
        ReactSession.set('id',null);
        history.push('/login');
    }
    return (
        <input id="logout" onClick={LogOut} type="submit" value="Log Out"/>
    );
}

function ShowUserSong()
{
    axios('http://localhost:5000/get_user_songs',{
            method:'POST',
            credentials: "include",
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                withCredentials: true,
                mode: 'no-cors',
            },
            data: {
                id:ReactSession.get('id')
            }
        }
    )
        .then(resp => {
            var tmp = document.getElementById('tableData');
            var temp="";
            if (!resp.data.message){
                try {
                    debugger;
                    var temp_array = resp.data.song_list;
                    for (let key in temp_array){
                        let arr=temp_array[key];
                        temp+="<tr><td id = "+arr['id']+">"+arr['title']+"</td>";
                        //temp+="<tr><td id = "+arr['id']+"><audio controls src={"+arr['title']+"}/></td>";
                    }
                    tmp.innerHTML=temp;
                    for (let key in temp_array){
                        var el =document.getElementById ((1+key)*100);
                    }
                }
                catch(error) {
                    temp+="<tr><td>You have no songsssss</td><td>at all</td></tr>";
                    tmp.innerHTML=temp;
                }
            }
            else{
                temp+="<tr><td>You have no songs</td><td>at all</td></tr>";
                tmp.innerHTML=temp;
            }
        });
}

export default RenderUser;