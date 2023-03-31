import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useState } from 'react';
import * as React from 'react';

function Projects() {
    return (
      <div>
        <h1 id="ProjectsHeader">Projects</h1>
        <ProjectListing name="Project Name 1" users="list, of, authorized, users" />
        <ProjectListing name="Project Name 2" users="list, of, authorized, users" />
        <ProjectListing name="Project Name 3" users="list, of, authorized, users" />
      </div>
    );
}
function ProjectListing(props) {
    const [status, setStatus] = useState('Join');
    const [projID, setProjID] = useState('');
    const [message, setMessage] = useState('Joined');
    const [open1, setOpen1] = useState(false);

    async function swapState() {
        try {
            if (status === 'Join') {
                setStatus('Leave');
                const response = await fetch('http://localhost:5000/joinProj/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data);
                setProjID(data.projectID)
                setMessage('Left');
                handleClick1();
            } else {
                setStatus('Join');
                const response = await fetch('http://localhost:5000/leaveProj/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data);
                setProjID(data.projectID)
                setMessage('Joined');
                handleClick1();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    
    const handleClick1 = () => {
        setOpen1(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen1(false);
      };

    const name = props.name;
    const users = props.users;
  
    return (
      <div>
        <h3>{name}</h3>
        <p>{users}</p>
        <HardwareSetController name="HWSet1" totalCount="100" checkedIn="50" />
        <HardwareSetController name="HWSet2" totalCount="100" checkedIn="0" />
        <Button id="joinleaveButton" variant="contained" color="primary" onClick={swapState}>
          {status}
        </Button>
        <Snackbar open={open1} autoHideDuration={1000} onClose={handleClose}>
          <Alert severity="info">
            {message} {projID}
          </Alert>
        </Snackbar>
      </div>
    );
}
function HardwareSetController(props) {
    const [checkVal, setCheckVal] = useState('');
    const [projName, setName] = useState('')
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);

    const handleClick1 = () => {
      setOpen1(true);
    };
    const handleClick2 = () => {
        setOpen2(true);
      };

    const handleClose1 = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen1(false);
      };
      const handleClose2 = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen2(false);
      };

    function changeVal(value) {
      setCheckVal(value);
    }
  
    const name = props.name;
    const totalCount = props.totalCount;
    const checkedIn = props.checkedIn;
    async function checkIn_hardware(){
        try {
            const response = await fetch('http://localhost:5000/checkIn/');
            const data = await response.json();
            console.log(data);
            setCheckVal(data.qty);
            setName(data.projectID);
            handleClick1();
        } catch (error) {
            console.log(error);
        }
    }
    async function checkOut_hardware() {
        try {
            const response = await fetch('http://localhost:5000/checkOut/');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            setCheckVal(data.qty);
            setName(data.projectID);
            handleClick2();
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return (
      <div>
        <p>
          {name}: {checkedIn}/{totalCount}
        </p>
        <TextField
          id="hwsetinput"
          defaultValue={'0'}
          onChange={(e) => {
            changeVal(JSON.stringify(e.target.value));
          }}
        >
          Enter qty
        </TextField>
        <Button id="checkInButton" variant="contained" color="primary" onClick={checkIn_hardware}>
          Check In
        </Button>
        <Snackbar open={open1} autoHideDuration={1000} onClose={handleClose1}>
          <Alert severity="info">
            {checkVal} hardware checked in
          </Alert>
        </Snackbar>
        <Button id="checkOutButton" variant="contained" color="primary" onClick={checkOut_hardware}>
          Check Out
        </Button>
        <Snackbar open={open2} autoHideDuration={1000} onClose={handleClose2}>
          <Alert severity="info">
            {checkVal} hardware checked out
          </Alert>
        </Snackbar>
      </div>
    );
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export default Projects;