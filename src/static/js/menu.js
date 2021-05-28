import React, { Component } from "react";
import axios from "axios";
import "../css/menu_style.css"
import "../songs/HippieSabotage-DevilEyes.mp3"
import {ReactSession} from 'react-client-session';
import {useHistory,Link} from "react-router-dom";
ReactSession.setStoreType("localStorage");


function RenderMenu(){
    if (ReactSession.get('id'))
    return(
        <div>
            <h1 className="logged_as">Logged as {[ReactSession.get('username')]}</h1>
            <div className="profile">
                <Link to='/user'> <input type="submit"  value="Your profile"/></Link>
            </div>
            <div className="title">
                <h1>All songs</h1>
                <input onClick={ShowSong} id="show_btn" type="submit" value="Show songs"/>
            </div>
            <div className="table">
                <table>
                    {/*<thead>*/}
                    {/*<tr>*/}
                    {/*    <th>Title</th>*/}
                    {/*</tr>*/}
                    {/*</thead>*/}
                    <tbody id="tableData">
                    </tbody>
                </table>
            </div>
            <div className="songs">
                {/*<div>*/}
                {/*    <audio controls src={a}/>*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    <audio controls src={b}/>*/}
                {/*</div>*/}
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
        //<h1 id="logout" onClick={LogOut}>Log Out</h1>
        <input id="logout" onClick={LogOut} type="submit" value="Log Out"/>
    );
}
function AddSongToProfile(song_id)
{
    axios('http://localhost:5000/add_song_to_profile',{
            method:'POST',
            credentials: "include",
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                withCredentials: true,
                mode: 'no-cors',
            },
            data: {
                song_id:parseInt(song_id)+1,
                id:ReactSession.get('id')
            }
        }
    )
        .then(resp => {
            if (resp.data.message==='Success'){
                document.getElementById((1+song_id)*100).style.display="none";
                ReactSession.set('username',resp.data.username);
            }
            else
                document.getElementById((1+song_id)*100).innerHTML = resp.data.message;
        });

}
function ShowSong()
{
    axios('http://localhost:5000/get_songs',{
            method:'POST',
            credentials: "include",
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                withCredentials: true,
                mode: 'no-cors',
            }
        }
    )
        .then(resp => {
            var tmp = document.getElementById('tableData');
            var temp="";
            if (!resp.data.message){
                try {
                    var temp_array = resp.data.song_list;
                    for (let key in temp_array){
                        let arr=temp_array[key];
                        temp+="<tr><td id = "+arr['id']+">"+arr['title']+"</td>"+
                        "<button id="+(1+key)*100+" >Add song</button></tr>";
                        //"<input id="+(1+key)*100+" type="submit" value="+Add_song+"/></tr>";
                    }
                    tmp.innerHTML=temp;
                    for (let key in temp_array){
                        var el =document.getElementById ((1+key)*100);
                        if(el)
                            el.addEventListener ("click", function (){AddSongToProfile(key);}, false);
                    }
                }
                catch(error) {
                    temp+="<tr><td>You have no songs</td><td>at all</td></tr>";
                    tmp.innerHTML=temp;
                }
            }
            else{
                temp+="<tr><td>You have no songs</td><td>at all</td></tr>";
                tmp.innerHTML=temp;
            }
        });
}
export default RenderMenu;