import React from 'react'

const NewPost = () => {
  return (
    <div>
      <h1>New URl : </h1>
  <form action="/api/posts/"  method="POST" className="form-inline">
  <div className="form-group">
          <label htmlFor="" className=" col-form-label">Site: </label>
          <input type="text" className="form-control" name="title" id="title" aria-describedby="helpId" placeholder=""/>
  </div>

  <div className="form-group p-3">
  <label htmlFor="">URL : </label>
  <input className="form-control" name="content" id="content"/>
  </div>
  <div className="form-group">
  <button type="submit" className="btn btn-primary">Track</button>
  </div>




  </form>
    </div>
  )
}

export default NewPost
