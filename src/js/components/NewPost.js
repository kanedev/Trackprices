import React from 'react'

const NewPost = () => {
  return (
    <div>
      <h1>New URl : </h1>
  <form action="/api/posts/"  method="POST" className="form-inline">
  <div class="form-group">
          <label for=""class=" col-form-label">Site: </label>
          <input type="text" class="form-control" name="title" id="title" aria-describedby="helpId" placeholder=""/>
  </div>

  <div class="form-group p-3">
  <label for="">URL : </label>
  <input class="form-control" name="content" id="content"/>
  </div>
  <div class="form-group">
  <button type="submit" class="btn btn-primary">Track</button>
  </div>




  </form>
    </div>
  )
}

export default NewPost
