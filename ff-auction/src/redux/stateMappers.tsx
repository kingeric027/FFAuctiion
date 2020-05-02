const mapUserToProps = (state: any) => {
    return {
        currentUser: state.user
    }
}

export {
    mapUserToProps
}