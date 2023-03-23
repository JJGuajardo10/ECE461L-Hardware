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
            <h1 className="font-mono ">About us</h1>
            <h1 className="font-mono">whatever about us</h1>
            <p>To get your profile details: </p><button onClick={getData}>Click me</button>
        {profileData && <div>
              <p>Profile name: {profileData.profile_name}</p>
              <p>About me: {profileData.about_me}</p>
            </div>
        }
            
        </>
    )
}