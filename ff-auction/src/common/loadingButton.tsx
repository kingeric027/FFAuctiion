import React from 'react'
import { CircularProgress, Button } from '@material-ui/core'

export interface LoadingButtonProps {
    loading: boolean,
    text: string
    onClick: () => Promise<any>
}

// const useStyles = makeStyles(() => ({
//     wrapper: {
//         margin: 10
//     }
// }))

const LoadingButton: React.FunctionComponent<LoadingButtonProps> = (props) => {
    const {loading, text, onClick} = props;
    return (
        <div>
            <Button onClick={onClick}>{text}</Button>
            {loading && <CircularProgress size={24} />}
        </div>
    )
}

export default LoadingButton;