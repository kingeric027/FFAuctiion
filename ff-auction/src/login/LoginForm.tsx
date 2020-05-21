import React, { useState } from 'react';
import { Button, TextField, DialogContent, DialogActions, DialogTitle, Grid } from "@material-ui/core"
import * as OrderCloud from 'ordercloud-javascript-sdk';
import { connect, ConnectedProps } from 'react-redux';
import { setUser } from '../redux/actions';

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
    const handleNewUserChange = (key: UserValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser({...newUser, [key]: event.target.value})
    }

    // const SubmitNewUser = () => {
    //     var token = OrderCloud.Tokens.GetAccessToken();
    //     return OrderCloud.Me.Register(newUser, {
    //         anonUserToken: token
    //     }).then((res) => {
    //         console.log(res);
    //     })
    // }

    const SubmitNewUser = () => {
        OrderCloud.AdminUsers.Create(newUser).then((createdUser) => {
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
                            variant="outlined"
                            margin="dense"
                            style={{display: 'flex'}}
                            onChange={handleNewUserChange("Password")}>{newUser.Password}
                        </TextField>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button type="submit" onClick={SubmitNewUser}>Submit</Button>
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
    
    const handleAuthChange  = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setCreds({
            ...creds,
            [field]: event.target.value
        })
    }

    const handleSubmit = () => {
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
    }

    const handleCancel = () => {
        setCreds({
            userName: '',
            passWord: ''
        })
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
                    margin="dense"
                    value={creds.passWord}
                    onChange={handleAuthChange("passWord")}
                    style={{display: 'flex'}}
                ></TextField>
            </DialogContent>
            <DialogActions>
                <Button type="submit" onClick={handleSubmit}>Submit</Button>
                <Button type="reset" onClick={props.onClose}>Cancel</Button>
            </DialogActions>
        </React.Fragment>
    )
}


export default {
    NewUserForm: connector(NewUserForm),
    LoginUser: connector(LoginUser)
}