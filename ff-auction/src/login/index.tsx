import React, { useState } from 'react';
import { Typography, Button, Dialog, DialogContent, DialogActions, Tabs, Tab, makeStyles } from "@material-ui/core";
import UserForms from "./LiginForm";
import * as OrderCloud from 'ordercloud-javascript-sdk';

const UserShell: OrderCloud.User = {
    Username: '',
    FirstName: '',
    LastName: '',
    Email: '',
    Active: true,
}

const useStyles = makeStyles({
    root: {
      width: 400
    },
  });

export type UserValues = "UserName" | "FirstName" | "LastName" | "Email";

const LoginForm: React.FunctionComponent = () => {
    const classes = useStyles();
    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState<number>(0);

    const handleButtonClick = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false);
      };

    const handleChange = (event:  any, newValue: any) => { 
        setValue(newValue);
    };

    return(
        <div>
            <Button
                onClick={handleButtonClick}>Log In / Register
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <Tabs value={value} onChange={handleChange} style={{width: '100%'}}>
                    <Tab style={{width: '50%'}} label="Log In"></Tab>
                    <Tab style={{width: '50%'}} label="Register"></Tab>
                </Tabs>
                {value === 0 ? 
                <UserForms.LoginUser
                    onClose={handleClose}></UserForms.LoginUser> :
                <UserForms.NewUserForm
                    onClose={handleClose}></UserForms.NewUserForm>}
            </Dialog>
        </div>
    )
}

export default LoginForm;