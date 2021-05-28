import React, {createElement} from 'react';
import ReactDOM from "react-dom";
import RenderLogin, {Work} from './static/js/login';
import App from './static/js/App';
import axios from "axios";
import {WorkSignUp} from './static/js/signUp'
import RenderSignUp from "./static/js/signUp";
import Menu from "./static/js/menu";

jest.mock('axios');

describe('App', () => {
  it('alive',()=>{
    const div = document.createElement("div");
    ReactDOM.render(<App/>,div)
  })
});

class Checklogin {
    static work() {
        return Work();
    }
}

describe('Login',()=>{
    it('success axios',()=>{
        axios.post.mockResolvedValueOnce({data:{username:'steve',password:'1234'}});
        Checklogin.work().then(data => expect(data).toEqual("Success"));
    })
    it('error axios',()=>{
        axios.post.mockResolvedValueOnce({data:{username:'mark',password:'1234'}});
        Checklogin.work().then(data => expect(data).toEqual("Error"));
    })
    it('renders',()=>{
        const div = document.createElement("div");
        ReactDOM.render(<RenderLogin/>,div)

    })
});

class Checksignup {
    static work() {
        return WorkSignUp();
    }
}

describe('SignUp',()=>{
    it('renders',()=>{
        const div = document.createElement("div");
        ReactDOM.render(<RenderSignUp/>,div)
    })
    it('success axios',()=>{
        axios.post.mockResolvedValueOnce({data:{n:'3',s:'3',u:'steve',p1:'1234',e:'2',p2:'1234'}});
        Checksignup.work().then(data => expect(data).toEqual("Success"));
    })
    it('error axios',()=>{
        axios.post.mockResolvedValueOnce({data:{n:'3',s:'3',u:'',p1:'',e:'2',p2:'1234'}});
        Checksignup.work().then(data => expect(data).toEqual("Success"));
    })
})
describe('Menu', function () {
    it('renders',()=>{
        const div = document.createElement("div");
        ReactDOM.render(<Menu>{true}</Menu>,div)
    })
    it('gets events',()=>{
        const div = document.createElement("div");
        ReactDOM.render(<Menu>{true}</Menu>,div);
        var t =document.getElementById('test_id');
        if (t)
            t.dispatchEvent('onClick');
    })
});


