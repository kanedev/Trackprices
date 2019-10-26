import React, { Component } from 'react'
import ReactDOM from 'react-dom';
// import {BrowserRouter} from 'react-router-dom';
//mport Contact from './pages/contact'
import  News from "./components/news";
import  Posts from "./components/posts";

let postsAPI= [
{_id:1,"title":"title 1","content":"content 1"},
{_id:2,"title":"title 2","content":"content 2"},
{_id:3,"title":"title 3","content":"content 3"},
{_id:4,"title":"title 4","content":"content 4"},
{_id:5,"title":"title 5","content":"content 5"},
{_id:6,"title":"title 6","content":"content 6"},
]

const Index = () => {
  return (
  <div>Welcome to React with Express !

 <Posts data={postsAPI} />
  </div> )
};

ReactDOM.render(<Index />, document.getElementById('root'));

