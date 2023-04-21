import React, {useState, useEffect, useRef} from "react";
import {Link} from "react-router-dom";
import "./hardware_formatting.css"
import currentProjectID from "./project_global"
import Navbar from './components/Navbar';

function Hardware(){
	const [Hardware1, SetHardware1] = useState("");
	const [Hardware2, SetHardware2] = useState("");
	const [Capacity1, SetCapacity1] = useState("");
	const [Capacity2, SetCapacity2] = useState("");
	
	const [projectHardware, SetProjectHardware] = useState ("");
	async function AddHW()
{
  const [serverResponse, setServerResponse] = useState("No Response yet");
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
        setServerResponse("Hardware set added!");
      }
      else{
        setServerResponse("Set not added!");
      }
  }

  return(
    <>
    <div className="font-serif text-3xl">Hardware Management</div>
      <br></br>
      <br></br>
      <h2 className="font-serif">Add a hardware set</h2>
      <div className="font-serif">
          <h3>Enter a name and quantity</h3>
          <input ref = {namefield} type = "text" placeholder = "Enter a set name" size = "21"></input>
        </div>
        <div>
          <input ref = {qfield} type = "text" placeholder = "Enter an amount" size = "21"></input>
        </div>
        <div>
          <button onClick = {() => sendCredentials()} className="font-serif hover:text-blue-700">Enter</button>
         <label>{serverResponse}</label>
      </div>

    </>
  );
}
	async function getHardwareUpdate(){
		
      let name1 = "hwSet1";
      let name2 = "hwSet2";
      let myproj = currentProjectID;
         
      let dict1 = {
            method : "POST",
            body : JSON.stringify({
               name: name1
         })
       };
      let dict2 = {
            method : "POST",
            body : JSON.stringify({
               name: name2
         })
       };
      //this requires that the getproject method returns its quantity appropriately.
      let dict3 = {method : "POST",
            body : JSON.stringify({
               id: currentProjectID 
         })
       };
      
      let res1 = await fetch("/getHardwareSet" , dict1);
      let responseJson1 = await res1.json();
      console.log(responseJson1)
      
      let res2 = await fetch("/getHardwareSet" , dict2);
      let responseJson2 = await res2.json();
      console.log(responseJson2)
      
      let res3 = await fetch("/getProject", dict3);
      let responseJson3 = await res3.json();
      console.log(responseJson3)
      
      if(responseJson1['capacity'] != -1 && responseJson2['capactiy'] != -1 && responseJson3['capactiy'] != -1)
       {
         SetHardware1(responseJson1["availability"]);
         SetHardware2(responseJson2["availability"]);
         
         SetCapacity1(responseJson1["capacity"]);
         SetCapacity2(responseJson2["capacity"]);
         
         SetProjectHardware(responseJson3["hardware"]);
      }
   }  


	return (
      <>
      <Navbar/>
      <br></br>
      
      <div className="font-serif text-3xl">Hardware Management</div>
         <h3 className="font-serif"> Joined Project Hardware </h3>
         <p className="font-serif"> Currently joined to project with ID: {currentProjectID} </p>
         <p className="font-serif"> Hardware allocated to current project: {projectHardware}</p>
         
         <button className="font-serif hover:bg-blue-700 bg-blue-500 text-white py-2 px-4 rounded" onClick = { () => getHardwareUpdate()}>Refresh values</button>

         <br></br>
         <br></br>
         
         <h3 className="font-serif"> HWSet1 </h3>
         <p className="font-serif"> Availability: {Hardware1}</p>
         <p className="font-serif"> Capacity: {Capacity1} </p>
         <GetHardwareButton1/>
         <ReturnHardwareButton1/>

         <br></br>
         <br></br>
         
         <h3 className="font-serif"> HWSet2 </h3>
         <p className="font-serif"> Availability: {Hardware2}</p>
         <p className="font-serif"> Capacity: {Capacity2} </p>
         <GetHardwareButton2/>
         <ReturnHardwareButton2/>
         
         <br></br>
      
      </>
   )
}


//should cause hardware page to be refreshed every 100 something 
//setInterval(getHardwareUpdate(), 100);
export default Hardware;



function GetHardwareButton1(){	
   const requestfield1 = useRef();
   const [getStatus1, setGetStatus1] = useState(2);

	async function getHardwareFrom1(){
		let toget1 = requestfield1.current.value;
		
		let dict = {
		method : "POST",
         body : JSON.stringify({
         hardwareName: "hwset1",
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
         <input ref = {requestfield1} type="number" placeholder={"Enter request"}></input>
         <div> 
            <button onClick = { () => getHardwareFrom1()} className="font-serif hover:bg-blue-700 bg-blue-500 text-white py-2 px-4 rounded">
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
         hardwareName: "hwset2",
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
         <input ref = {requestfield2} type="number" placeholder={"Enter request"}></input>
         <div className="font-serif"> 
            <button onClick = { () => getHardwareFrom2()} className="font-serif hover:bg-blue-700 bg-blue-500 text-white py-2 px-4 rounded">
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
            hardwareName: "hwset1",
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
         <input ref = {returnfield1} type="number" placeholder="Enter an amount"></input>
         <br></br>
         <button onClick = { () => returnHardwareTo1() } className="font-serif hover:bg-blue-700 bg-blue-500 text-white py-2 px-4 rounded"> Return hardware </button>
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
            hardwareName: "hwset2",
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
         <input ref = {returnfield2} type="number" placeholder="Enter an amount"></input>
         <br></br>
         <button onClick = { () => returnHardwareTo2() } className="font-serif hover:bg-blue-700 bg-blue-500 text-white py-2 px-4 rounded"> Return hardware </button>
         <p className="font-serif"> Server Response: {returnStatus2} </p>
         
      </>
   )	
}
