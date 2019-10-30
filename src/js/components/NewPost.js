import React from 'react'

const NewPost = () => {
  return (
    <div>
      <h1>New post : </h1>
  <form action="/api/posts/"  method="POST">

<div class="row">
  <div class="col-sm-4">
      <div class="form-group">
          <label for=""class=" col-form-label">Title : </label>
          <input type="text" class="form-control" name="title" id="title" aria-describedby="helpId" placeholder=""/>
        </div>

<div class="form-group">
  <label for="">Content : </label>
  <textarea class="form-control" name="content" id="content" rows="3"></textarea>
</div>

  </div>

 
</div>
    <div class="form-group row">
      <div class="offset-sm-2 col-sm-10">
        <button type="submit" class="btn btn-primary">Send</button>
      </div>
    </div>
  </form>
    </div>
  )
}

export default NewPost
