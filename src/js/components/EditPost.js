import React, { Component } from 'react'
import axios from 'axios'
import params from '../config/params';

export default class EditPost extends Component {

  constructor(props) {
    super(props);
    // N’appelez pas `this.setState()` ici !
    
   
  }


  state = {
    title :'title',
    content:'content'
      };

  UNSAFE_componentWillMount() {
     // Your code here
    axios.get(params.urlSite+'api/posts/'+this.props.match.params.id,{
      headers: {
          'Content-Type': 'application/json; charset=utf-8'
      }
    })
      .then((response) => {
        this.setState({
           title :response.data.title,
           content:response.data.content
          })
      }).catch(error => {
        console.log("there is an error : "+error);
      }); 
  }



  handleTitleChange = (e) => {
    this.setState({
      title : e.target.value
    })
  }
  handleContentChange = (e) => {
    this.setState({
      content : e.target.value
    })
  }


 
  
   
//  UNSAFE_componentWillMount() {
 
//   // axios.get(params.urlSite+'api/posts',{
//   //   headers: {
//   //       'Content-Type': 'application/json; charset=utf-8'
//   //   }
//   // })
//   //   .then((response) => {
//   //     this.setState({ postsAPI: response.data })
//   //   }).catch(error => {
//   //     console.log("there is an error : "+error);
//   //   });
//    // .catch(console.log)
   
//   }  



    // Your code here
    // axios.get(params.urlSite+'api/posts/'+idItem,{
    //   headers: {
    //       'Content-Type': 'application/json; charset=utf-8'
    //   }
    // })
    //   .then((response) => {
    //     this.setState({ postsAPI: response.data })
    //   }).catch(error => {
    //     console.log("there is an error : "+error);
    //   }); 



  render() {
    return (
      <div>
      <h1>Update your URl : </h1>
  <form action={`/api/posts/${this.props.match.params.id}`}  method="PUT" className="form-inline">
  <div className="form-group">
          <label htmlFor="" className=" col-form-label">Site: </label>
          <input type="text" className="form-control" name="title" id="title" aria-describedby="helpId" placeholder="" value={this.state.title} onChange={ this.handleTitleChange}/>
  </div>

  <div className="form-group p-3">
  <label htmlFor="">URL : </label>
  <input className="form-control" name="content" id="content" value={this.state.content}onChange={ this.handleContentChange} />
  </div>
  <div className="form-group">
  <button type="submit" className="btn btn-success">Update</button>
  </div>




  </form>
    </div>
    )
  }
}

