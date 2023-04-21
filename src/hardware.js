import React, {useState, useEffect, useRef} from "react";
import {Link} from "react-router-dom";
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
         <h3> Joined Project Hardware </h3>
         <p> Currently joined to project with ID: {currentProjectID} </p>
         <p> Amount of Currently Checked Out Hardware: {projectHardware}</p>
         <AddHW/>
         <button onClick = { () => getHardwareUpdate()}>Refresh values</button>
         
         <h3> HWSet1 </h3>
         <p> Availability: {Hardware1}</p>
         <p> Capacity: {Capacity1} </p>
         <GetHardwareButton1/>
         <ReturnHardwareButton1/>
         
         <h3> HWSet2 </h3>
         <p> Availability: {Hardware2}</p>
         <p> Capacity: {Capacity2} </p>
         <GetHardwareButton2/>
         <ReturnHardwareButton2/>
         
         <br></br>
      
         <nav>
            <li>
               <Link to ="/"> Home </Link>
            </li>
            <li>
               <Link to = "/project"> Projects </Link>
            </li>
         </nav>
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
      else if (responseJson["errorcode"] == 1){
         setGetStatus1("Hardware Query overflowed current availability/capacity. Current maximum query value was instead applied for your query")
      }else{
         setGetStatus1("Error in trying to request hardware to hardware set 1.")
      }
      
		
	}
	
   return(   
      <>
         <label> Get Hardware from HWSet1 </label>
         <input ref = {requestfield1} type="number" placeholder={"Enter request"}></input>
         <div> 
            <button onClick = { () => getHardwareFrom1()}>
               Checkout hardware 
            </button>
            <p> Server Response: {getStatus1} </p>
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
      else if (responseJson["errorcode"] == 1){
         setGetStatus2("Hardware Query overflowed current availability/capacity. Current maximum query value was instead applied for your query")
      }else {
         setGetStatus2("Error in trying to return hardware to hardware set 2.")
      }
	}
	
   return (
      <>
         <label> Get Hardware from HWSet2 </label>
         <input ref = {requestfield2} type="number" placeholder={"Enter request"}></input>
         <div> 
            <button onClick = { () => getHardwareFrom2()}>
               Checkout hardware 
            </button>
            <p> Server response: {getStatus2} </p>
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
      } else if (responseJson["errorcode"] == 1){
         setReturnStatus1("Hardware Query overflowed current availability/capacity. Current maximum query value was instead applied for your query")
      }
      else {
         setReturnStatus1("Error in trying to return hardware to hardware set 1.")
      }
   }

   return (
      <>
         <label>  Enter amount of hardware to return: </label>
         <input ref = {returnfield1} type="number" placeholder="Enter an amount"></input>
         <br></br>
         <button onClick = { () => returnHardwareTo1() }> Return hardware </button>
         <p> Server Response: {returnStatus1} </p>
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
      <h2>Add a hardware set</h2>
      <div>
          <h3>Enter a name and quantity</h3>
          <input ref = {namefield} type = "text" placeholder = "Enter a set name" size = "21"></input>
        </div>
        <div>
          <input ref = {qfield} type = "text" placeholder = "Enter an amount" size = "21"></input>
        </div>
        <div>
          <button onClick = {() => sendCredentials()}>Enter</button>
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
      <h2> Get hardware set data</h2>
      <div>
          <h3>Enter the name of the hardware set you want data from</h3>
          <input ref = {nameField} type = "text" placeholder = "Name of the hwset" size = "26"></input>
        </div>
        <div>
          <button onClick = {() => requestMetaData()}>Enter</button>
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
      else if (responseJson["errorcode"] == 1){
         setReturnStatus2("Hardware Query overflowed current availability/capacity. Current maximum query value was instead applied for your query")
      }
      else {
         setReturnStatus2("Error in trying to return hardware to hardware set 2.")
      }
   }

   return (
      <>
         <label>  Enter amount of hardware to return: </label>
         <input ref = {returnfield2} type="number" placeholder="Enter an amount"></input>
         <br></br>
         <button onClick = { () => returnHardwareTo2() }> Return hardware </button>
         <p> Server Response: {returnStatus2} </p>
         
      </>
   )	
}
