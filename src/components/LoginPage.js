import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';

class LoginPage extends React.Component{

    constructor(){
        super()
    }

    LoginHandler = () => {
        // check if user and password exists in database
        console.log("Login action fired");
        // if it does -> redirect to HomePage

        // if it does not -> throw error
    }

    render(){
        return(
            <div>
                <Dialog open={true}>
                    <DialogTitle id="form-dialog-title">Login</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please enter your login details down below.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="user-name"
                            label="User Name"
                            type="email"
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="pswd"
                            label="Password"
                            type="password"
                            fullWidth   
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.LoginHandler}>
                            Login
                        </Button>
                        <Button href='/signup'>
                            Sign Up
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default LoginPage;