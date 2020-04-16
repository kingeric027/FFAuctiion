import React, { useState } from 'react';
import { Typography, Button, Dialog, DialogContent, DialogActions, Tabs, Tab } from "@material-ui/core";
import UserForms from "./LiginForm"


const LoginForm: React.FunctionComponent = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState<number>(0);

    const handleButtonClick = () => {
        debugger;
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false);
      };

    const handleChange = (event:  any, newValue: any) => {
        debugger; 
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
                <DialogContent>
                    {value === 0 ? 
                    <UserForms.LoginUser></UserForms.LoginUser> :
                    <UserForms.NewUserForm></UserForms.NewUserForm>}
                </DialogContent>
                <DialogActions>
                    <Button type="submit">Submit</Button>
                    <Button type="reset">Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default LoginForm;