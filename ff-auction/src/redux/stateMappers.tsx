const mapUserToProps = (state: any) => {    
    return {
        currentUser: state.user
    }
}

const mapThemeToProps = (state: any) => {
    return {
        currentTheme: state.selectedTheme
    }
}

export {
    mapUserToProps,
    mapThemeToProps
}