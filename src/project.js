import React, {useRef} from "react";
import { useState } from "react";
import {Link} from "react-router-dom";
import currentProjectID from "./project_global";


function Project_Board(){

   const [project_id, setID] = useState(0); //initial project is ID 0
   const [project_name, setName] = useState("")
   const [project_description, setDescription] = useState("")
   const [HWSet1_cap, setCap1] = useState("")
   const [HWSet2_cap, setCap2] = useState("")
   const [serverResponse, setServerResponse] = useState("No response yet");
   //to get user input from uncontrolled input fields
   const name_field = useRef();
   const description_field = useRef();
   const id_field = useRef();
   const HWSet1Cap_field = useRef();
   const HWSet2Cap_field = useRef();

   /*
    * Function to update the current state of name, id and description
    * Was causing error if these statements were in one of the async functions
    */

   async function createProject(){
      console.log("in display_props")


      let createProjectName = name_field.current.value;
      let createProjectID = id_field.current.value;
      let createProjectDescription =description_field.current.value;
      let assignHWSet1Cap = HWSet1Cap_field.current.value;
      let assignHWSet2Cap = HWSet2Cap_field.current.value;




      console.log("name " + createProjectName);
      console.log("projectid: " + createProjectID);
      console.log("project description: "+createProjectDescription);
      //console.log("HWSET1 cap: " + assignHWSet1Cap);
      //console.log("HWSET2 cap: " + assignHWSet2Cap);

      let postDict = {
         method: "POST",
         body: JSON.stringify({
            name: createProjectName,
            projectid: createProjectID,
            description: createProjectDescription,
            hwSet1: assignHWSet1Cap,
            hwSet2: assignHWSet2Cap
         })
      };

      console.log("posted data")

      let response = await fetch("/createProject", postDict);
      let responseJson = await response.json();

      console.log("received server response")

      if (responseJson["errorcode"] ==0){
         setServerResponse("Successfully created new project");
      }
      else {
         setServerResponse("Error: new project not created");
      }

      console.log(serverResponse)
      console.log(responseJson)
      
   }
   

   return (
      <>
         <br></br>
         <br></br>

          <form>
            <label className="font-serif"> 
               Enter a project name: 
               <input className="font-serif" 
                  ref = {name_field}
                  type = "text" placeholder = "Enter a name" 
               />
            </label>
         <br></br>
            <label className="font-serif">
               Enter a project ID: 
               <input 
                  ref = {id_field}
                  type = "text" placeholder = "Enter a project ID" 
               />
            </label>
         <br></br>
            <label className="font-serif">
               Enter a project description:
               <input 
                  ref = {description_field}
                  type = "text" placeholder = "Enter a project desc."
               />
            </label>
            <br></br>
            <label className="font-serif">
               Enter Capacity for HWSet 1:
               <input
                  ref = {HWSet1Cap_field}
                  type = "text" placeholder = "Enter  Value"
               />
            </label><br></br>
            <label className="font-serif">
               Enter Capacity for HWSet 2:
               <input
                  ref = {HWSet2Cap_field}
                  type = "text" placeholder = "Enter Value"
               />
            </label>
         </form> 

         <button onClick = {() => createProject()} className="font-serif hover:text-blue-700"> Create new project </button>

         <p className = "warning font-serif"> Do not use "!" or a space character </p>
            
            <GetProject/>
         
         <p className="font-serif"> You Have Joined: {serverResponse} </p>



         <nav className="font-serif">
            <li>
               <Link to ="/"> Home </Link>
            </li>
            <li>
               <Link to = "/hardware"> Hardware</Link>
            </li>
         </nav>

      </>
   )

}

export default Project_Board;

function GetProject()
{
  const [serverResponse, setServerResponse] = useState("No Response Yet");
  const namefield = useRef();
  async function sendCredentials()
  {
    let id = namefield.current.value;
    console.log("The id of the project to get is : " + id);
    let dict = {
      method : "POST",
      body : JSON.stringify({
        id : id
      })
    };
    let res = await fetch("/getProject" , dict);
    let responseJson = await res.json();
    if(responseJson['errorcode'] != 0)
    {
      setServerResponse("Error: Unable to join project");
      return;
    }
    let name = responseJson['name'];
    let projectid = responseJson['projectid'];
    let des = responseJson['description'];
    setServerResponse("\nName: " + name + " \nProject id: " + projectid + " \nDescription: " + des);

     currentProjectID = projectid;
     console.log(currentProjectID)
  }
  return(
    <>
      <div>
         <br></br>
         <label className="font-serif">
          Enter Project ID to join:
          <input ref = {namefield} type = "text" placeholder = "Enter a project id" size = "21"></input>
         </label>
        </div>
        <div>
          <button onClick = {() => sendCredentials()} className="font-serif hover:text-blue-700">Join a project</button>
         <p className="font-serif">Server Response for joining a project is: {serverResponse}</p>
      </div>
    </>
  );
}
class Project extends React.Component{
   constructor(props){
      super (props);
      this.state = {
         availableHardwareSet1Units: props.availableHardwareSet1Units,
         availableHardwareSet2Units: props.availableHardwareSet2Units
      };
   }
//renders an instance of the Project class
//         <Project id = {project_id} name={project_name} description={project_description} />
   render(){

      const id = this.props.id;
      const name = this.props.name;
      const description = this.props.description;
      const availableHardwareSet1Units = this.state.availableHardwareUnits;
      const availableHardwareSet2Units = this.state.availableHardwareSet2Units;
      return (
         <div className="font-serif">
            <p> Project id: {id} </p>
            <p> Project name: {name} </p>
            <p> Project description: {description} </p>
            <p> Available hardware for HWSet1: {availableHardwareSet1Units} </p>
            <p> Available hardware for HWSet2: {availableHardwareSet2Units}</p>
         </div>
      );
   }
}
