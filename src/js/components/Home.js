import React, { Component } from 'react'
//import ReactDOM from 'react-dom';
import axios from 'axios'

// import {BrowserRouter} from 'react-router-dom';
//mport Contact from './pages/contact'

import  Posts from "./posts";
import  Navbar from "./Navbar";



export default class Home extends Component {
state = {
  // postsAPI : [
  //   {_id:1,"title":"title1","content":"content1"},
  //   {_id:2,"title":"title2","content":"content2"},
  //   {_id:3,"title":"title3","content":"content3"},
  //   {_id:4,"title":"title4","content":"content4"},
  //   {_id:5,"title":"title5","content":"content5"},
  //   {_id:6,"title":"title6","content":"content6"},
  //   ],
  postsAPI : [],
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


 
handleRemoveClick  = (idItem) => {
  console.log('item clicked : '+idItem);
  let tmpPosts = [...this.state.postsAPI]
  //console.log('index'+tmpPosts.indexOf(idItem));
  tmpPosts.splice(idItem,1)
  this.setState({
    postsAPI : tmpPosts
  })
}

// It works
UNSAFE_componentWillMount() {
 
axios.get('http://localhost:5000/api/posts',{
  headers: {
      'Content-Type': 'application/json; charset=utf-8'
  }
})
  .then((response) => {
    this.setState({ postsAPI: response.data })
  }).catch(error => {
    console.log("there is an error : "+error);
  });
 // .catch(console.log)
 
}



  render() {
    return (
      <div>
       <Navbar inputSearchChange={this.handleInputChange} />
       <Posts removeItemClick={this.handleRemoveClick} data={this.state.postsFiltred.length>0 ? this.state.postsFiltred :  this.state.postsAPI} />
      </div> )
  }
}




