import React from 'react';
import { BrowserRouter, NavLink, Route } from 'react-router-dom';
// import Home from './Home';
// import About from './About';
// import Contact from './Contact';
// import New from './New';
// import Pool from './Pool';
// import upload from './upload';
// import MyCustomForm from './MyCustomForm';
// import dynamicDivs from './dynamicDivs';
import './design/nav.css';
import './Rigister.jsx';
{/* <link rel="stylesheet" href="nav.css"></link> */}
function Navbar() {
  return (  
    <header>
          
          <div class="real">
           
              <div class="logo">
                <li>
                  <a>Share Your Ride</a>

                </li>
                </div>
                <ul class="menu">
                    <li className='items'>
                      <NavLink className='linkitems' to="/">Home</NavLink>
                    </li>
                    <li className='items'>
                      <NavLink className='linkitems' to="/Login">Login</NavLink>
                    </li>
                    <li className='items'>
                      <NavLink className='linkitems' to="/about">About</NavLink>
                    </li>
                    {/* <li className='items'>
                      <NavLink className='linkitems' to="/Tasveer">Tasveer</NavLink>
                    </li> */}
                    <li className='items'>
                      <NavLink className='linkitems'to="/contact">Contact</NavLink>
                    </li>
                    {/* <li className='items'>
                      <NavLink className='linkitems'to="/New">New</NavLink>
                    </li> */}
                    <li className='items'>
                      <NavLink className='linkitems'to="/MyCustomForm">Rigister</NavLink>
                    </li>
                    {/* <li className='items'>
                      <NavLink className='linkitems'to="/Rigister">Rigister</NavLink>
                    </li> */}
                    <li className='items'>
                      <NavLink className='linkitems'to="/Pool">view profile</NavLink>
                    </li>
                  </ul>
              </div>
          {/* <div class="real">
            <div class="logo">
                <li>ZM Rent A Car</li>
            </div>

            <ul>
                <li><a href="nav.html">Home</a></li>
                <li><a href="">ervices</a></li>
                <li><a href="">About</a></li>
                <li><a href="">Contact</a></li>
            </ul>

         </div> */}

       
</header>

             
      
  // <BrowserRouter>
  //     <div className="navbar">
  //       <NavLink to="/">Home</NavLink>
  //       <NavLink to="/about">About</NavLink>
  //       <NavLink to="/contact">Contact</NavLink>
  //       <h1>gamer</h1>;
  //     </div>
  //     <div className="content">
  //       <Route exact path="/" component={Home} />
  //       <Route path="/about" component={About} />
  //       <Route path="/contact" component={Contact} />
  //     </div>
  //   </BrowserRouter>
  );
}

export default Navbar;
