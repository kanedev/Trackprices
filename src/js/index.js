import React from 'react'
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import Routes from './routes/routes'



const Index = () => {
  return (
    <div className="container" >
      <BrowserRouter>
      <Routes/>
      </BrowserRouter>  
    </div>
  )
}

ReactDOM.render(<Index />, document.getElementById('root'));

