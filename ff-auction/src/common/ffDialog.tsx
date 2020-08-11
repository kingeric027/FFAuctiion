import React from 'react'
import { Dialog, DialogTitle } from '@material-ui/core';

interface FFDialogProps {
    title: string
    open: boolean
    dialogContent: React.FunctionComponent
}

const FFDialog: React.FunctionComponent<FFDialogProps> = (props) => {
    const {title, open, dialogContent} = props;
    return (
        <Dialog open={open}>
            <DialogTitle>{title}</DialogTitle>
            {dialogContent}
        </Dialog>
    )
}