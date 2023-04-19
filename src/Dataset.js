import { SettingsInputHdmiTwoTone } from '@mui/icons-material';
import React, { useState, useRef } from 'react';
import {Link} from "react-router-dom";

function Dataset()
{
  const [serverResponse, setServerResponse] = useState("No Response Yet");
  const [databaseName, setDatabaseName] = useState("");
  const [description, setDescription] = useState("");
  const [entries, setEntries] = useState("");
  const [unit, setUnit] = useState("");
  const [link, setLink] = useState("");

  const datasetNumField = useRef();

  async function requestMetaData()
  {
    let datasetNum = datasetNumField.current.value;
    console.log("The dataset number requested was: " + datasetNum);
    /* Create the HTTP request dict*/
    let dict = {
      method : "POST",
      body : JSON.stringify({
        datasetNum : datasetNum
      })
    };
    let res = await fetch("/metadataRequest" , dict);
    let responseJson = await res.json();

    /* If the errorcode signal failure, print nothing*/
    if(responseJson['errorcode'] != 0)
    {
      setServerResponse("Meta data failed to load; try different input");
      return;
    }
    console.log(responseJson);
    let newDisplay = "";
    newDisplay = "Database: " + responseJson['Database'] + " Description: " + responseJson['Description'] + " Entries: " + responseJson["Entries"] + " Unit: " + responseJson["Unit"] + " Link: " + responseJson["Link"];
    //setServerResponse(newDisplay);
    setDatabaseName(responseJson['Database']);
    setEntries(responseJson['Entries']);
    setDescription(responseJson['Description']);
    setUnit(responseJson['Unit']);
    setLink(responseJson['Link']);

  }
  return(
    <>
      <h2 className="font-serif text-3xl"> Display a Dataset Metadata</h2>
      <div>
          <h3 className="font-serif">Enter a number 1-5 to get different datasets</h3>
          <input ref = {datasetNumField} type = "text" placeholder = "Enter the number(1-5) of the dataset" size = "26"></input>
        </div>
        <div>
          <button onClick = {() => requestMetaData()} className="font-serif hover:text-blue-700">Enter to return the amount</button>
      </div>
      <div>
        <label className="font-serif"> The Database: {databaseName}</label>
        <br/>
        <br/>
        <label className="font-serif"> The Description: {description}</label>
        <br/>
        <br/>
        <label className="font-serif"> The Entries: {entries}</label>
        <br/>
        <br/>
        <label className="font-serif"> The Unit: {unit}</label>
        <br/>
        <br/>
        <label className="font-serif"> The Link: </label>
        <p><a href={link}>{link}</a></p>
      </div>

        <br></br>
         <br></br>

      <Link to = "/" className="font-serif hover:text-blue-700"> Home </Link>
      
    </>
  );
}

export default Dataset

