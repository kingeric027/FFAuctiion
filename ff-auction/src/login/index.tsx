import React, { useState } from 'react';
import { Typography, Button, Dialog, DialogContent, DialogActions, Tabs, Tab } from "@material-ui/core";
import UserForms from "./LiginForm";
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
    const [newUser, setNewUser] = useState<OrderCloud.User>(UserShell);
    const [value, setValue] = useState<number>(0);

    const handleNewUserChange = (key: UserValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser({...newUser, [key]: event.target.value})
    }

    const handleButtonClick = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false);
      };

    const handleChange = (event:  any, newValue: any) => { 
        setValue(newValue);
    };

//       <AppBar position="static">
//   <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
//     <Tab label="Item One" {...a11yProps(0)} />
//     <Tab label="Item Two" {...a11yProps(1)} />
//     <Tab label="Item Three" {...a11yProps(2)} />
//   </Tabs>
// </AppBar>
// <TabPanel value={value} index={0}>
//   Item One
// </TabPanel>
// <TabPanel value={value} index={1}>
//   Item Two
// </TabPanel>
// <TabPanel value={value} index={2}>
//   Item Three
// </TabPanel>

    return(
        <div>
            <Button
                onClick={handleButtonClick}>Log In / Register
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Log In"></Tab>
                    <Tab label="Register"></Tab>
                </Tabs>
                {value === 0 ? 
                <UserForms.LoginUser></UserForms.LoginUser> :
                <UserForms.NewUserForm></UserForms.NewUserForm>}
            </Dialog>
        </div>
    )
}

export default LoginForm;