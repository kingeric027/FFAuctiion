import React, { useState } from 'react';
import { Typography, Button, Dialog, FormGroup, TextField, DialogContent, DialogActions } from "@material-ui/core"
import * as OrderCloud from 'ordercloud-javascript-sdk';

const UserShell: OrderCloud.MeUser = {
    Username: '',
    FirstName: '',
    LastName: '',
    Email: '',
    Password: '',
    Active: true,
}

export type UserValues = "Username" | "FirstName" | "LastName" | "Email" | "Password"; 

const NewUserForm: React.FunctionComponent = () => {
    const [newUser, setNewUser] = useState<OrderCloud.MeUser>(UserShell);
    const handleNewUserChange = (key: UserValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(key)
        setNewUser({...newUser, [key]: event.target.value})
    }

    const SubmitNewUser = () => {
        var token = OrderCloud.Tokens.GetAccessToken();
        return OrderCloud.Me.Register(newUser, {
            anonUserToken: token
        }).then((res) => {
            console.log(res);
        })
    }

    return(
        <React.Fragment>
            <DialogContent>
                <Typography variant="h3">Register</Typography>
                <TextField
                    id="UserName"
                    label="User Name"
                    variant="outlined"
                    margin="dense"
                    onChange={handleNewUserChange("Username")}>{newUser.Username}
                </TextField>
                <TextField
                    id="FirstName"
                    label="First Name"
                    variant="outlined"
                    margin="dense"
                    onChange={handleNewUserChange("FirstName")}>{newUser.FirstName}
                </TextField>
                <TextField
                    id="LastName"
                    label="Last Name"
                    variant="outlined"
                    margin="dense"
                    onChange={handleNewUserChange("LastName")}>{newUser.LastName}
                </TextField>
                <TextField
                    id="Email"
                    label="Email"
                    variant="outlined"
                    margin="dense"
                    onChange={handleNewUserChange("Email")}>{newUser.Email}
                </TextField>
                <TextField
                    id="Password"
                    label="Password"
                    variant="outlined"
                    margin="dense"
                    onChange={handleNewUserChange("Password")}>{newUser.Password}
                </TextField>
            </DialogContent>
            <DialogActions>
                <Button type="submit" onClick={SubmitNewUser}>Submit</Button>
                <Button type="reset">Cancel</Button>
            </DialogActions>
        </React.Fragment>
    )
}

const LoginUser: React.FunctionComponent = () => {
    const [creds, setCreds] = useState<any>({
        userName: '',
        passWord: ''
    });
    
    const handleAuthChange  = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setCreds({
            ...creds,
            [field]: event.target.value
        })
    }

    const handleSubmit = () => {
        return OrderCloud.Auth.Login(creds.UserName, creds.passWord, process.env.REACT_APP_CLIENT_ID!, [])
        .then(response => {
            console.log(response);
            OrderCloud.Tokens.SetAccessToken(response.access_token);
        })
    }

    return (
        <div>
            <TextField 
                variant="outlined"
                label="Username"
                value={creds.userName}
                onChange={handleAuthChange("userName")}
            ></TextField>
            <TextField 
                variant="outlined"
                label="Password"
                value={creds.password}
                onChange={handleAuthChange("password")}
            ></TextField>
        </div>
    )
}

export default {
    NewUserForm,
    LoginUser
}