import React, { useState } from 'react';
import { Button, Dialog, Tabs, Tab } from "@material-ui/core";
import UserForms from "./LoginForm";

export type UserValues = "UserName" | "FirstName" | "LastName" | "Email";

const LoginForm: React.FunctionComponent = () => {
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
                variant="contained" color="secondary" onClick={handleButtonClick}>Log In / Register
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth={true}> 
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