import React, { Component } from 'react'
import axios from 'axios'
import params from '../config/params';
import {Redirect} from 'react-router'

import Alert from './Alert';
export default class EditPost extends Component {

  constructor(props) {
    super(props);
    //this.formHandler = this.formHandler.bind(this)
     this.state = {
           formFields: {   
               title :'',
              content:''},
            updateMessage:'' ,       
            updated : false
 
     }
   }

 

  UNSAFE_componentWillMount() {
     // Your code here
    axios.get(params.urlSite+'api/posts/'+this.props.match.params.id,{
      headers: {
          'Content-Type': 'application/json; charset=utf-8'
      }
    })
      .then((response) => {

        let formFields = {...response.data};
       
        this.setState({
          formFields : formFields 
          })

       //   console.log(this.state.formFields);
      }).catch(error => {
        console.log("there is an error : "+error);
      }); 
  }


  inputChangeHandler = (e)=>{
    let formFields = {...this.state.formFields};
    formFields[e.target.name] = e.target.value;
    this.setState({
     formFields
    });
   }
 
   formHandler = (e) => {
    e.preventDefault();
   // console.log('ici, formhandler ');
      axios.put(params.urlSite+'api/posts/'+this.props.match.params.id,this.state.formFields)
        .then((response) => {
          console.log(response.data.message);
          this.setState({
            updateMessage : response.data.message,
            updated: true
           });

        }).catch(error => {
          console.log(" error in formhander : "+error);
        }); 
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

      {/* action={`/api/posts/${this.props.match.params.id}`}  */}

{ this.state.updated ?
   <Alert dataClass="alert alert-success" 
message={this.state.updateMessage}  /> :
 <div> Please edit your configuration ... </div>}



  <form   onSubmit={(e) => this.formHandler(e)} className="form-inline">
  <div className="form-group">
          <label htmlFor="" className=" col-form-label">Site: </label>
          <input type="text" className="form-control" name="title" id="title" aria-describedby="helpId" placeholder="" value={this.state.formFields.title}  
          onChange={(e) => this.inputChangeHandler.call(this, e)}/>
  {/* <select class="form-control" name="site" id="site">
    <option value='aliexpress'>Aliexpress</option>
    <option value='ebay'>Ebay</option>
    <option value='amazon'>Amazon</option>
  </select> */}

  </div>

  <div className="form-group p-3">
  <label htmlFor="">URL : </label>
  <input className="form-control" name="content" id="content" value={this.state.formFields.content} onChange={(e) => this.inputChangeHandler.call(this, e)} />
  </div>
  <div className="form-group">
  
  { this.state.updated ?
    <button type="" className="btn btn-success"> Updated  </button>
     :
<button type="submit" className="btn btn-primary"> Send  </button>
 }

    
    
 
  </div>




  </form>
    </div>
    )
  }
}

