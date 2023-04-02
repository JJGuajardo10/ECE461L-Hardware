import { useState } from 'react';
import { signupFields } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";
import { SnackbarContent, SnackbarProvider, useSnackbar } from 'notistack';

const fields = signupFields;
let fieldsState = {};

fields.forEach(field => fieldsState[field.id]='');

export default function Signup() {
  const [signupState,setSignupState] = useState(fieldsState);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitFail, setSubmitFail] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => setSignupState({...signupState, [e.target.id]:e.target.value});

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(signupState)
    createAccount()
  }

  //handle Signup API Integration here
  const createAccount = async () => {
    try {
      const response = await fetch('http://localhost:5000/signUp/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupState),
        mode: 'cors'
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      } else {
        setSubmitSuccess(true);
        setSubmitFail(false);
        enqueueSnackbar('Signup successful for user', { variant: 'success' });
      }
      console.log('This is the frontend :D')
    } catch (error) {
      console.error(error);
      setSubmitSuccess(false);
      setSubmitFail(true);
      enqueueSnackbar('Signup failed', { variant: 'error' });
    }
  }

  return(
    <SnackbarProvider maxSnack={1} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}} autoHideDuration={2000} preventDuplicate variant='success'>
    <div>
      <form className="mt-8 space-y-6 font-mono" onSubmit={handleSubmit}>
        <div className="">
          {fields.map(field =>
            <Input
              key={field.id}
              handleChange={handleChange}
              value={signupState[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
            />
          )}
          <FormAction handleSubmit={handleSubmit} text="Signup" />
        </div>
      </form>
    </div>
    </SnackbarProvider>
  )
}