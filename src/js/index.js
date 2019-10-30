import React from 'react'
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import Routes from './routes/routes'
import Navbar from './components/Navbar';


const Index = () => {
  return (
    <div>
    <BrowserRouter>
    <Navbar />
    <Routes/>
    </BrowserRouter>  
    </div>
  )
}

ReactDOM.render(<Index />, document.getElementById('root'));

