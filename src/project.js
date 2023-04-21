import React, {useRef} from "react";
import { useState } from "react";
import {Link} from "react-router-dom";
import Navbar from "./components/Navbar";
import currentProjectID from "./project_global";


function Project_Board(){

   const [project_id, setID] = useState(0); //initial project is ID 0
   const [project_name, setName] = useState("")
   const [project_description, setDescription] = useState("")
   const [HWSet1_cap, setCap1] = useState("")
   const [HWSet2_cap, setCap2] = useState("")
   const [serverResponse, setServerResponse] = useState("No response yet");
   	const [Hardware1, SetHardware1] = useState("");
	const [Hardware2, SetHardware2] = useState("");
	const [Capacity1, SetCapacity1] = useState("");
	const [Capacity2, SetCapacity2] = useState("");

	const [projectHardware, SetProjectHardware] = useState ("");
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




      console.log("name " + createProjectName);
      console.log("projectid: " + createProjectID);
      console.log("project description: "+createProjectDescription);
      console.log("project hardware allocation: " + assignHWSet1Cap);


      let postDict = {
         method: "POST",
         body: JSON.stringify({
            name: createProjectName,
            projectid: createProjectID,
            description: createProjectDescription,
            hardware: assignHWSet1Cap,

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

  const [serverResponse2, setServerResponse2] = useState("No Response yet");
  const namefield = useRef();
  const qfield = useRef();

  async function sendCredentials()
  {
    let name = namefield.current.value;
    let q = qfield.current.value;
    console.log("Entered name: " + name);
    console.log("Enter q: " + q);
       // Fetch protocol
       let dict = {
        method : "POST",
        body : JSON.stringify({
          name: name,
          capacity:  q
        })
      };
      let res = await fetch("/createHWSet" , dict);
      let responseJson = await res.json();
      if(responseJson['errorcode'] == 0)
      {
        setServerResponse2("Hardware set added!");
      }
      else{
        setServerResponse2("Set not added!");
      }
  }

   return (
      <>
      <Navbar/>
         <br></br>
         <div className="font-serif text-2xl">Project Management</div>
         <br></br>

          <form>
            <label className="font-serif"> 
               Enter a project name: 
               <input className="font-serif"
                  ref = {name_field}
                  type = "text" placeholder = " Enter a name" 
               />
            </label>
         <br></br>
            <label className="font-serif">
               Enter a project ID: 
               <input className="font-serif"
                  ref = {id_field}
                  type = "text" placeholder = " Enter a project ID" 
               />
            </label>
         <br></br>
            <label className="font-serif">
               Enter a project description:
               <input 
                  ref = {description_field}
                  type = "text" placeholder = " Enter a project desc."
               />
            </label>
            <br></br>
            <label className="font-serif">
               Enter Allocated Hardware Quantity for Project:
               <input
                  ref = {HWSet1Cap_field}
                  type = "text" placeholder = " Enter Value"
               />
            </label><br></br>

         </form> 

         <button className="font-serif bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded" onClick = {() => createProject()}> Create new project </button>

         <p className = "warning font-serif"> Do not use "!" or a space character </p>
            
            <GetProject/>
         
         <p className="font-serif"> You Have Joined: {serverResponse} </p>

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
    let hard = responseJson['hardware'];
    setServerResponse("\nName: " + name + " \nProject id: " + projectid + " \nDescription: " + des + "\nAllocated Hardware: " + hard);

     currentProjectID = projectid;
     console.log(currentProjectID)
  }
  return(
    <>
      <div>
         <br></br>
         <label className="font-serif">
          Enter Project ID to join:
          <input className="font-serif" ref = {namefield} type = "text" placeholder = " Enter a project id" size = "21"></input>
         </label>
        </div>
        <div>
          <button className="font-serif bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded" onClick = {() => sendCredentials()}>Join a project</button>
         <p className="font-serif">Server Response for joining a project is: {serverResponse}</p>
      </div>
    </>
  );
}
class Project extends React.Component{
   constructor(props){
      super (props);
      this.state = {
         availableHardwareUnits: 50
      };
   }
//renders an instance of the Project class
//         <Project id = {project_id} name={project_name} description={project_description} />
   render(){

      const id = this.props.id;
      const name = this.props.name;
      const description = this.props.description;
      const availableHardwareUnits = this.state.availableHardwareUnits;
      return (
         <div>
            <p className="font-srif"> Project id: {id} </p>
            <p className="font-serif"> Project name: {name} </p>
            <p className="font-serif"> Project description: {description} </p>
            <p className="font-serif"> Available hardware: {availableHardwareUnits} </p>
         </div>
      );
   }
}
function GetHardwareButton1(){
   const requestfield1 = useRef();
   const [getStatus1, setGetStatus1] = useState(2);

	async function getHardwareFrom1(){
		let toget1 = requestfield1.current.value;

		let dict = {
		method : "POST",
         body : JSON.stringify({
         hardwareName: "HWSet",
          projectid: currentProjectID,
          qty: toget1,
          inout: "checkout"
         })
		};

      console.log("about to request")
		let res = await fetch("/hardwareToProject" , dict);
      console.log("requested")
		let responseJson = await res.json();

      console.log(responseJson)

      if (responseJson["errorcode"] == 0){
         setGetStatus1("Successfully requested hardware from hardware set 1.")
      }
      else {
         setGetStatus1("Error in trying to return hardware to hardware set 1.")
      }


	}

   return(
      <>
         <label className="font-serif"> Get Hardware from HWSet1 </label>
         <input className="font-serif" ref = {requestfield1} type="number" placeholder={"Enter request"}></input>
         <div>
            <button className="font-serif bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded" onClick = { () => getHardwareFrom1()}>
               Checkout hardware
            </button>
            <p className="font-serif"> Server Response: {getStatus1} </p>
         </div>
      </>
   )

}
function GetHardwareButton2(){
   const requestfield2 = useRef();
   const [getStatus2, setGetStatus2] = useState(2);

	async function getHardwareFrom2(){
		let toget2 = requestfield2.current.value;

		let dict = {
         method : "POST",
         body : JSON.stringify({
         hardwareName: "HWSet2",
          projectid: currentProjectID,
          qty: toget2,
          inout: "checkout"
         })
		};

		let res = await fetch("/hardwareToProject" , dict);
		let responseJson = await res.json();

      if (responseJson ["errorcode"] == 0){
         setGetStatus2("Successfully requested hardware from hardware set 2.")
      }
      else {
         setGetStatus2("Error in trying to return hardware to hardware set 2.")
      }
	}

   return (
      <>
         <label className="font-serif"> Get Hardware from HWSet2 </label>
         <input className="font-seerif" ref = {requestfield2} type="number" placeholder={"Enter request"}></input>
         <div>
            <button className="font-serif bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded" onClick = { () => getHardwareFrom2()}>
               Checkout hardware
            </button>
            <p className="font-serif"> Server response: {getStatus2} </p>
         </div>
      </>
   )
}

function ReturnHardwareButton1(){
   const returnfield1 = useRef();
   const [returnStatus1, setReturnStatus1] = useState(2);

   async function returnHardwareTo1(){
      let return1 = returnfield1.current.value;

      let dict = {
         method: "POST",
         body: JSON.stringify({
            hardwareName: "HWSet",
            qty: return1,
            projectid: currentProjectID,
            inout: "checkin"
         })
      };

      let res = await fetch("/hardwareToProject", dict);
      let responseJson = await res.json();
      console.log(responseJson)
      if (responseJson["errorcode"] == 0){
         setReturnStatus1("Successfully returned hardware to hardware set 1.")
      }
      else {
         setReturnStatus1("Error in trying to return hardware to hardware set 1.")
      }
   }

   return (
      <>
         <label className="font-serif">  Enter amount of hardware to return: </label>
         <input className="font-serif" ref = {returnfield1} type="number" placeholder="Enter an amount"></input>
         <br></br>
         <button className="font-serif bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded" onClick = { () => returnHardwareTo1() }> Return hardware </button>
         <p className="font-serif"> Server Response: {returnStatus1} </p>
      </>
   )
}


function ReturnHardwareButton2(){
   const returnfield2 = useRef();
   const [returnStatus2, setReturnStatus2] = useState(2);

   async function returnHardwareTo2(){
      let return2 = returnfield2.current.value;

      let dict = {
         method: "POST",
         body: JSON.stringify({
            hardwareName: "HWSet2",
            qty: return2,
            projectid: currentProjectID,
            inout: "checkin"
         })
      };

      let res = await fetch("/hardwareToProject", dict);
      let responseJson = await res.json();
      if (responseJson["errorcode"] == 0){
         setReturnStatus2("Successfully returned hardware to hardware set 2.")
      }
      else {
         setReturnStatus2("Error in trying to return hardware to hardware set 2.")
      }
   }

   return (
      <>
         <label className="font-serif">  Enter amount of hardware to return: </label>
         <input className="font-serif" ref = {returnfield2} type="number" placeholder="Enter an amount"></input>
         <br></br>
         <button className="font-serif bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded" onClick = { () => returnHardwareTo2() }> Return hardware </button>
         <p className="font-serif"> Server Response: {returnStatus2} </p>

      </>
   )
}