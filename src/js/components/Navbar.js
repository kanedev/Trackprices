import React from 'react'
import {Link} from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="nav-link">PricesTracker</Link>
        <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
            aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <Link to="/" className="nav-link">Home <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
            <Link to="/about" className="nav-link">About</Link>
            </li>
            <li className="nav-item">
            <Link to="/contact" className="nav-link">Contact</Link>
            </li>
            



            <li className="nav-item"><Link className="nav-link"  to="/member">Member</Link></li>
              {/* <%} else if (user.role === 'author') {%>   */}
              <li className="nav-item"><Link  className="nav-link" to="/author">Author</Link></li>
              {/* <%}%>   */}




          </ul>
          
        </div>
      
        <div>

        <ul className="list-inline">
         <li className="list-inline-item">  <Link  className="nav-link" to="/auth/logout">Logout</Link> </li>
         <li className="list-inline-item"><Link  className="nav-link" to="/auth/signup">Signup</Link> </li>
         <li className="list-inline-item"><Link  className="nav-link" to="/auth/login">Login</Link> </li>
    </ul>  

            
     
</div>
      
      
      </nav>
    </div>
  )
}

export default Navbar
