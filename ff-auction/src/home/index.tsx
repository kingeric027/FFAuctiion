import React from 'react';
import { Typography, Button } from "@material-ui/core"
import Login from '../login';

// export interface HomeProps {
//     currentUser?: any
// }

const Home: React.FunctionComponent = () => {

    return(
        <div>
            <Typography variant="h1">FFAuction</Typography>
            <Login></Login>
        </div>
    )
}

export default Home;