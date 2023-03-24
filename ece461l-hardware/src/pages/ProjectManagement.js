import Navbar from "../components/Navbar"
import Title from "../components/Title"
import Header from "../components/Header"
import Login from "../components/Login"
import ProjectDisplay from "../components/ProjectDisplay"

export default function ProjectPage(){
    return(
        <>
            <Navbar />
            <br></br>
            <div className="font-mono ">Project Management</div>
            <ProjectDisplay/>
            
        </>
    )
}