import React from 'react'
import { CircularProgress, Button, makeStyles } from '@material-ui/core'

export interface LoadingButtonProps {
    loading: boolean
    text: string
    disabled?: boolean
    onClick: () => Promise<any>
}

const useStyles = makeStyles(() => ({
    wrapper: {
        position: "relative"
    },
    progress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12
    }
}))

const LoadingButton: React.FunctionComponent<LoadingButtonProps> = (props) => {
    const {loading, text, onClick, disabled} = props;
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <Button disabled={disabled} onClick={onClick}>{text}</Button>
            {loading && <CircularProgress size={24} className={classes.progress} />}
        </div>
    )
}

export default LoadingButton;