import React from 'react'

const Search = ({inputChange}) => {


  return (
     


<div class="row">   
      <div class="col">
          <div class="float-right">
          <form className="form-inline my-2 my-lg-0">
    <div class="p-1 bg-light rounded rounded-pill shadow-sm mb-4 float-right">
            <div class="input-group">

            <input type="search" placeholder="What're you searching for?" aria-describedby="button-addon1" class="form-control border-0 bg-light"  placeholder="Search" onChange={inputChange}/>    
              <div class="input-group-append">
                <button id="button-addon1" type="submit" class="btn btn-link text-primary"><i class="fa fa-search"></i></button>
              </div>
            </div>
          </div>
  </form>

          </div>
      </div>
</div>






   
 
  )
}

export default Search
