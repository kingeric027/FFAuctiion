import { createMuiTheme } from "@material-ui/core";
import { red } from "@material-ui/core/colors";


export default createMuiTheme({
    palette: {
      primary: {
        main: "#00bcd4"
      },
      secondary: {
        main: "#ffc107",
        light: 'lightgrey'
      },
      error: red
    }
  });