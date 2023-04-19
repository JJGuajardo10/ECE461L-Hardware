import React from "react";
import {Routes, Route, Link} from "react-router-dom";
import './App.css'
import Hardware from "./hardware";
import Project_Board from "./project";
import LoginPortal from "./LoginPortal";
import CreateAccount from "./CreateAccount";
import Dataset from "./Dataset";
import Logged from "./Logged";




function HomeScreen() {
    return (
       <>
       {(Logged.value != 1) ? (
       <nav>
          <main>   
          <h2 className="font-serif mb-6 flex-center text-6xl">Home</h2>
          <p1 className="font-serif flex-center text-2xl">Please Login Or Create and Account</p1>
         </main>
          <li className="font-serif ">
             <Link to ="/login" className="hover:text-blue-700"> Login Portal </Link>
          </li>
          <li className="font-serif">
             <Link to ="/createaccount" className="hover:text-blue-700"> Create Account </Link>
          </li>
       </nav>
       ) : (
          <nav>
             <main>   
          <h2>Home</h2>
          <p1>Welcome, {Logged.userName}!</p1>
         </main>
          <li>
             <Link to = "/hardware"> Hardware </Link>
          </li>
          <li>
             <Link to = "/project"> Projects </Link>
          </li>
          <li>
             <Link to ="/dataset"> Data Set </Link>
          </li>
          <li>
             <Link to ="/logout"> Logout </Link>
          </li>
          
       </nav>
       )}
       </>
    );
 }
 export default HomeScreen;