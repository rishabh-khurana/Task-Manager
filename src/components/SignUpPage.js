import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
//import AddNewUser from '../utils/api';

class SignUpPage extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            userName:'',
            password:'',
            firstName:'',
            lastName:''
        }
    }

    SignUpHandler = () => {
        // check if entry exists in database

        // if it does throw error

        // if it does not create entry in user table in the database
        // AddNewUser(this.state.firstName,this.state.lastName,this.state.userName,this.state.password)
        console.log("Sign up is done")
        // redirect to login page
    }

    setUserName(event){
        this.setState({userName:event.target.value}) 
    }

    setPassword(event){
        this.setState({password:event.target.value}) 
    }


    setFirstName(event){
        this.setState({firstName:event.target.value}) 
    }

    setLastName(event){
        this.setState({lastName:event.target.value}) 
    }

    render(){

        return(
            <div>
                <Dialog open={true}>
                    <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please enter your details down below.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="first-name"
                            label="First Name"
                            type="email"
                            fullWidth
                            onBlur={this.setFirstName}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="last-name"
                            label="Last Name"
                            type="email"
                            fullWidth
                            onBlur={this.setLastName}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="user-name"
                            label="User Name"
                            type="email"
                            fullWidth
                            onBlur={this.setUserName}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="pswd"
                            label="Password"
                            type="password"
                            fullWidth
                            onBlur={this.setPassword}   
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button>
                            Back
                        </Button>
                        <Button onClick={this.SignUpHandler}>
                            Done
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default SignUpPage;