import Navbar from "../components/Navbar"
import Title from "../components/Title"
import Header from "../components/Header"
import Login from "../components/Login"
import Dropdown from "../components/Dropdown"
import { useState } from 'react'
import axios from "axios";

export default function AboutPage(){
    const [profileData, setProfileData] = useState(null)

    function getData() {
      axios({
        method: "GET",
        url:"/profile",
      })
      .then((response) => {
        const res =response.data
        setProfileData(({
          profile_name: res.name,
          about_me: res.about}))
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
      })}
    return(
        <>
            <Navbar />
            <br></br>
            <h1 className="font-mono ">About us</h1>
            <h1 className="font-mono">whatever about us</h1>
            <br></br>
            <p className="font-mono">To get your profile details: </p><br></br><button className="font-mono text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={getData}>Click me</button>
        {profileData && <div>
            <br></br>
              <p className="font-mono">Profile name: {profileData.profile_name}</p>
              <p className="font-mono">About me: {profileData.about_me}</p>
            </div>
        }
            
        </>
    )
}