import React, {useState, useEffect, useRef} from "react";
import {Link} from "react-router-dom";
import Navbar from "./components/Navbar";
import "./hardware_formatting.css"
import currentProjectID from "./project_global"

function Hardware(){
	const [Hardware1, SetHardware1] = useState(-1);
	const [Hardware2, SetHardware2] = useState(-1);
	const [Capacity1, SetCapacity1] = useState(-1);
	const [Capacity2, SetCapacity2] = useState(-1);
	const [projectHardware, SetProjectHardware] = useState (-1);

	async function getHardwareUpdate(){

      let name1 = "HWSet";
      let name2 = "HWSet2";
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

      if(responseJson1['capacity'] != -1 && responseJson2['capacity'] != -1 && responseJson3['capactiy'] != -1)
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
      <br></br>
         <h3 className="font-serif text-2xl"> Joined Project Hardware </h3>
         <p className="font-serif"> Currently joined to project with ID: {currentProjectID} </p>
         <p className="font-serif"> Hardware allocated to current project: {projectHardware}</p>
         <AddHW/>
         <button className="font-serif bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded" onClick = { () => getHardwareUpdate()}>Refresh values</button>
         
         <br></br>
         <br></br>
         <h3 className="font-serif text-2xl"> HWSet1 </h3>
         <p className="font-serif"> Availability: {Hardware1}</p>
         <p className="font-serif"> Capacity: {Capacity1} </p>
         <GetHardwareButton1/>
         <ReturnHardwareButton1/>
         
         <br></br>
         <h3 className="font-serif text-2xl"> HWSet2 </h3>
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
         <input className="font-serif" ref = {requestfield1} type="number" placeholder={" Enter request"}></input>
         <div> 
            <button className="font-serif bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded" onClick = { () => getHardwareFrom1()}>
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
         <input className="font-serif" ref = {requestfield2} type="number" placeholder={" Enter request"}></input>
         <div> 
            <button className="font-serif bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded" onClick = { () => getHardwareFrom2()}>
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
         <button className="font-serif bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded" onClick = { () => returnHardwareTo1() }> Return hardware </button>
         <p className="font-serif"> Server Response: {returnStatus1} </p>
      </>
   )	
}

function AddHW()
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
      <h2 className="font-serif">Add a hardware set</h2>
      <div>
          <h3 className="font-serif">Enter a name and quantity</h3>
          <input className="font-serif" ref = {namefield} type = "text" placeholder = "Enter a set name" size = "21"></input>
        </div>
        <div>
          <input className="font-serif" ref = {qfield} type = "text" placeholder = "Enter an amount" size = "21"></input>
        </div>
        <div>
          <button className="font-serif bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded" onClick = {() => sendCredentials()}>Enter</button>
          <br></br>
         <label>{serverResponse}</label>
      </div>

    </>
  );
}

function GetHW()
{
  const [serverResponse, setServerResponse] = useState("No Response Yet");
  const nameField = useRef();

  async function requestMetaData()
  {
    let name = nameField.current.value;
    console.log("The hwset name requested was: " + name);
    /* Create the HTTP request dict*/
    let dict = {
      method : "POST",
      body : JSON.stringify({
        name : name
      })
    };
    let res = await fetch("/getHardwareSet" , dict);
    let responseJson = await res.json();

    /* If the errorcode signal failure, print nothing*/
    if(responseJson['errorcode'] != 0)
    {
      setServerResponse("Retrieval Failure");
      return;
    }
    console.log(responseJson);
    let response = "Name: " + responseJson['name'] + " Capacity: " + responseJson['capacity'] + " Avail: " + responseJson["availability"];
    setServerResponse(response);
  }
  return(
    <>
      <h2 className="font-serif"> Get hardware set data</h2>
      <div className="font-serif">
          <h3 className="font-serif">Enter the name of the hardware set you want data from</h3>
          <input className="font-serif" ref = {nameField} type = "text" placeholder = "Name of the hwset" size = "26"></input>
        </div>
        <div>
          <button className="font-serif bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded" onClick = {() => requestMetaData()}>Enter</button>
      </div>
      <label>{serverResponse}</label>

    </>
  );
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
         <button className="font-serif bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded" onClick = { () => returnHardwareTo2() }> Return hardware </button>
         <p className="font-serif"> Server Response: {returnStatus2} </p>
         
      </>
   )	
}
