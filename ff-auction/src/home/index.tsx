import React from 'react';
import { Typography, Button } from "@material-ui/core"

// export interface HomeProps {
//     currentUser?: any
// }

const Home: React.FunctionComponent = () => {

    return(
        <div>
            <Typography variant="h1">Home</Typography>
            <Button>Register/Log in</Button>
        </div>
    )
}

export default Home;