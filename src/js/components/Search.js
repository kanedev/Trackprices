import React from 'react'

const Search = ({inputChange}) => {


  return (
<div className="container-fluid">
<div className="row">   
      <div className="col">
          <div className="float-right">
          <form className="form-inline my-2 my-lg-0">
    <div className="p-1 bg-light rounded rounded-pill shadow-sm mb-4 float-right">
            <div className="input-group">

            <input type="search" placeholder="What're you searching for?" aria-describedby="button-addon1" className="form-control border-0 bg-light"  placeholder="Search" onChange={inputChange}/>    
              <div className="input-group-append">
                <button id="button-addon1" type="submit" className="btn btn-link text-primary"><i className="fa fa-search"></i></button>
              </div>
            </div>
          </div>
  </form>

          </div>
      </div>
</div>
</div>
)
}

export default Search
