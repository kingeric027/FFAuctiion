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
        <DialogContent>
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
    </DialogContent>
    )
}