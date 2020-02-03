import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

class LoginPage extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            userName:'',
            password:''
        }
    }

    LoginHandler = () => {
        // check if user and password exists in database
        console.log("Login action fired");
        axios.post('http://localhost:4000/api/auth',this.state)
            .then(res=>{
                if(res.data.length){
                    // if it does -> redirect to HomePage
                }else{
                    // if it does not -> throw error
                    console.log("Username or password incorrect")
                }
            })
            .catch(error=>{
                console.log(error.response)
            })
    }

    HandleOnBlur(event){
        this.setState({[event.target.name]:event.target.value})
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
                            name='userName'
                            onBlur = {this.HandleOnBlur.bind(this)}
                        />
                        <TextField
                            margin="dense"
                            id="pswd"
                            label="Password"
                            type="password"
                            fullWidth
                            name='password'
                            onBlur = {this.HandleOnBlur.bind(this)}   
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