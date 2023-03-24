import React, {useState, useEffect} from "react"
import Navbar from "../components/Navbar"
import Title from "../components/Title"
import Header from "../components/Header"
import Login from "../components/Login"
import Dropdown from "../components/Dropdown"


function LoginPage(){
const [isOpen, setIsOpen] = useState(false)

const toggle = () => {
    setIsOpen(!isOpen)
};

useEffect(() => {
    const hideMenu = () => {
        if(window.innerWidth > 768 && isOpen) {
            setIsOpen(false)
            console.log('resized')
        }
    }


    window.addEventListener('resize', hideMenu)
    return () => {
        window.removeEventListener('resize', hideMenu);
    }
})

    return(
        <>
            <Navbar toggle={toggle}/>
            <Dropdown isOpen={isOpen} toggle={toggle}/>
            <br></br>
            <Header
                heading="Login to your account"
                paragraph="Don't have an account yet? "
                linkName="Signup"
                linkUrl="/signup"
                />
            <Login/> 
            
        </>
    )
}

export default LoginPage;