import React, { useState } from 'react';
import { Typography, Button, Dialog, FormGroup, TextField, DialogContent } from "@material-ui/core"
import * as OrderCloud from 'ordercloud-javascript-sdk';

const UserShell: OrderCloud.User = {
    Username: '',
    FirstName: '',
    LastName: '',
    Email: '',
    Active: true,
}

export type UserValues = "UserName" | "FirstName" | "LastName" | "Email";

const LoginForm: React.FunctionComponent = () => {
    const [open, setOpen] = useState<boolean>(false);
    return(
        <div>
            <Button
                onClick={() => setOpen(true)}>Log In / Register
            </Button>
            <Dialog open={open}>
                <DialogContent>
                    <NewUserForm></NewUserForm>
                </DialogContent>
            </Dialog>
        </div>
    )
}

const NewUserForm: React.FunctionComponent = () => {
    const [newUser, setNewUser] = useState<OrderCloud.User>(UserShell);
    const handleNewUserChange = (key: UserValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser({...newUser, [key]: event.target.value})
    }

    const SubmitNewUser = () => {
        
    }
    return(
        <div>
        <TextField
            id="UserName"
            label="User Name"
            variant="outlined"
            onChange={handleNewUserChange("UserName")}>{newUser.Username}
        </TextField>
        <TextField
            id="UserName"
            label="User Name"
            variant="outlined"
            onChange={handleNewUserChange("UserName")}>{newUser.Username}
        </TextField>
        <TextField
            id="UserName"
            label="User Name"
            variant="outlined"
            onChange={handleNewUserChange("UserName")}>{newUser.Username}
        </TextField>
        <TextField
            id="UserName"
            label="User Name"
            variant="outlined"
            onChange={handleNewUserChange("UserName")}>{newUser.Username}
        </TextField>
        <Button 
            type="submit" 
            variant="contained"
            onClick={SubmitNewUser}>Submit</Button>
    </div>
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
            debugger;
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