import React, { useState } from 'react';
import { Button, TextField, DialogContent, DialogActions, DialogTitle, Grid, Typography } from "@material-ui/core"
import * as OrderCloud from 'ordercloud-javascript-sdk';
import { connect, ConnectedProps } from 'react-redux';
import { setUser } from '../redux/actions';
import LoadingButton from '../common/loadingButton';

const connector = connect();
type PropsFromRedux = ConnectedProps<typeof connector>
type LoginFormProps = PropsFromRedux & {
    onClose: () => void
}

const UserShell: OrderCloud.User = {
    Username: '',
    FirstName: '',
    LastName: '',
    Email: '',
    Password: '',
    Active: true,
}

export type UserValues = "Username" | "FirstName" | "LastName" | "Email" | "Password"; 

const NewUserForm: React.FunctionComponent<LoginFormProps> = (props) => {
    const [newUser, setNewUser] = useState<OrderCloud.User>(UserShell);
    const [loading, setLoading] = useState<boolean>(false)
    const [confirmPassword, setConfirmPassword] = useState<string>('')


    const handleNewUserChange = (key: UserValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser({...newUser, [key]: event.target.value})
    }

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value)
    }
    const SubmitNewUser = () => {
        setLoading(true)
        return OrderCloud.AdminUsers.Create(newUser).then((createdUser) => {
            OrderCloud.SecurityProfiles.SaveAssignment({
                SecurityProfileID: 'userGroupAdmin',
                UserID: createdUser.ID
            }).then(() => (
                OrderCloud.Auth.Login(newUser.Username, newUser.Password!, 
                    process.env.REACT_APP_ADMIN_CLIENT_ID!, ['AdminUserAdmin', 'AdminUserGroupAdmin'])
            .then((res) => {
                OrderCloud.Tokens.SetAccessToken(res.access_token)
                OrderCloud.Tokens.SetRefreshToken(res.refresh_token)
                props.dispatch(setUser(createdUser));
                handleCancel()
            })
            ))
        })
    }

    const handleCancel = () => {
        setLoading(false)
        setNewUser(UserShell)
        props.onClose();
    }

    return(
        <React.Fragment>
            <DialogTitle style={{textAlign: 'center'}}>
                Register
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <TextField
                            required
                            id="UserName"
                            label="User Name"
                            variant="outlined"
                            margin="dense"
                            style={{display: 'flex'}}
                            onChange={handleNewUserChange("Username")}>{newUser.Username}
                        </TextField>
                        <TextField
                            required
                            id="FirstName"
                            label="First Name"
                            variant="outlined"
                            margin="dense"
                            style={{display: 'flex'}}
                            onChange={handleNewUserChange("FirstName")}>{newUser.FirstName}
                        </TextField>
                        <TextField
                            required
                            id="LastName"
                            label="Last Name"
                            variant="outlined"
                            margin="dense"
                            style={{display: 'flex'}}
                            onChange={handleNewUserChange("LastName")}>{newUser.LastName}
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            id="Email"
                            label="Email"
                            variant="outlined"
                            margin="dense"
                            style={{display: 'flex'}}
                            onChange={handleNewUserChange("Email")}>{newUser.Email}                 
                        </TextField>
                        <TextField
                            required
                            id="Password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            margin="dense"
                            style={{display: 'flex'}}
                            onChange={handleNewUserChange("Password")}>{newUser.Password}
                        </TextField>
                        <TextField
                            required
                            disabled={newUser.Password === ''}
                            id="ConfirmPassword"
                            label="Confirm Password"
                            type="password"
                            variant="outlined"
                            margin="dense"
                            style={{display: 'flex'}}
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}>
                        </TextField>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <LoadingButton loading={loading} text="Submit" onClick={SubmitNewUser} disabled={newUser.Password !== confirmPassword}></LoadingButton>
                {/* <Button type="submit" onClick={SubmitNewUser}>Submit</Button> */}
                <Button type="reset" onClick={handleCancel}>Cancel</Button>
            </DialogActions>
        </React.Fragment>
    )
}

const LoginUser: React.FunctionComponent<LoginFormProps> = (props) => {
    const [creds, setCreds] = useState<any>({
        userName: '',
        passWord: ''
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    
    const handleAuthChange  = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setCreds({
            ...creds,
            [field]: event.target.value
        })
    }

    const handleSubmit = () => {
        setLoading(true)
        return OrderCloud.Auth.Login(creds.userName, creds.passWord, process.env.REACT_APP_ADMIN_CLIENT_ID!, 
            ['CatalogAdmin', 'CategoryAdmin', 'ProductAdmin', 'AdminUserAdmin'])  
        .then(response => {
            OrderCloud.Tokens.SetAccessToken(response.access_token);
            OrderCloud.Tokens.SetRefreshToken(response.refresh_token);
        })
        .then(() => {
            OrderCloud.Me.Get().then(res => {
                props.dispatch(setUser(res)) 
                handleCancel();
                })
        })
        .catch((err: any) => {
            setLoading(false)
            setError(err.response.data.error)
        })
    }

    const handleCancel = () => {
        setCreds({
            userName: '',
            passWord: ''
        })
        setLoading(false)
        props.onClose();
    }

    return (
        <React.Fragment>
            <DialogTitle style={{textAlign: 'center'}}>Sign In</DialogTitle>
                <DialogContent>
                    <TextField 
                    variant="outlined"
                    label="Username"
                    margin="dense"
                    value={creds.userName}
                    onChange={handleAuthChange("userName")}
                    style={{display: 'flex'}}
                ></TextField>
                <TextField 
                    variant="outlined"
                    label="Password"
                    type="password"
                    margin="dense"
                    value={creds.passWord}
                    onChange={handleAuthChange("passWord")}
                    style={{display: 'flex'}}
                ></TextField>
                {error && 
                <Typography variant="caption" color="error">{error === "invalid_grant" ? "Invalid Credentials" : "An Error Occured"}</Typography>}
            </DialogContent>
            <DialogActions>
            <LoadingButton loading={loading} text="Submit" onClick={handleSubmit}></LoadingButton>
                <Button type="reset" onClick={props.onClose}>Cancel</Button>
            </DialogActions>
        </React.Fragment>
    )
}


export default {
    NewUserForm: connector(NewUserForm),
    LoginUser: connector(LoginUser)
}