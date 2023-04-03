import './LogInPage.css';
import React from 'react';
import { Container, CssBaseline, Divider, Grid, Paper, Typography } from '@mui/material';
//import { SignIn } from './SignIn';
//import { SignUp } from './SignUp';


export class LogInPage extends React.Component {
    render() {
        return(
            <Container component="main" className="loginpage">
                <CssBaseline />
                <Grid container direction="column" spacing={2}>
                    <Grid item container direction="column" justify="center" alignItems="stretch" className="banner">
                        <Typography variant="h2" gutterBottom align="center">
                            Welcome to our site!
                        </Typography>
                        <Typography variant="h5" gutterBottom align="center">
                            Please Sign In or Sign Up below
                        </Typography>
                    </Grid>
                    <Grid item container direction="row" justify="center" alignItems="center" spacing={0}>
                        //<SignIn signInUser={(user) => this.props.loginUser(user)}/>
                        <Divider orientation="vertical" flexItem />
                      //  <SignUp signUpUser={(user) => this.props.loginUser(user)}/>
                    </Grid>
                </Grid>

            </Container>
        );
    }
}