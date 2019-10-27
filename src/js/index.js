import React, { Component } from 'react'
import ReactDOM from 'react-dom';
// import {BrowserRouter} from 'react-router-dom';
//mport Contact from './pages/contact'

import  Posts from "./components/posts";
import  Navbar from "./components/Navbar";





 





export default class Index extends Component {


state = {
  postsAPI : [
    {_id:1,"title":"title1","content":"content1"},
    {_id:2,"title":"title2","content":"content2"},
    {_id:3,"title":"title3","content":"content3"},
    {_id:4,"title":"title4","content":"content4"},
    {_id:5,"title":"title5","content":"content5"},
    {_id:6,"title":"title6","content":"content6"},
    ],
  postsFiltred:[]

}
 
 //  postsFiltred=postsAPI
   handleInputChange = (e) => {
    //e.preventDefault();
    let searchInput = e.target.value;
      let tmpPostsfiltred = this.state.postsAPI.filter(
      (item) =>  item.title.indexOf(searchInput) > -1 | item.content.indexOf(searchInput) > -1
    )

    this.setState({
      postsFiltred : tmpPostsfiltred
    })
  }

 



  render() {
    return (
      <div>Welcome to React with Express !
       <Navbar inputSearchChange={this.handleInputChange} />
       <Posts data={this.state.postsFiltred.length>0 ? this.state.postsFiltred :  this.state.postsAPI} />
      </div> )
  }
}
ReactDOM.render(<Index />, document.getElementById('root'));



