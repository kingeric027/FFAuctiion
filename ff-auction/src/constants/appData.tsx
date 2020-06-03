import { yellow, brown, red, purple, lightGreen, lightBlue } from "@material-ui/core/colors"

export interface TeamData {
    TeamNames: any,
    PositionNames: any
}


const positionNames: any = {
    "1": {
        Position: "QB",
        Color: lightGreen['A700']
    },
    "2": {
        Position: "RB",
        Color: lightBlue[500]
    },
    "3": {
        Position: "WR",
        Color: yellow['A200']
    },
    "4": {
        Position: "TE",
        Color: red[500]
    }, 
    "5": {
        Position: "K",
        Color: purple['A100']
    },
    "16": {
        Position: "DST",
        Color: brown['A100']
    }
}


const teamNames: any = {
    "1": {
        Name: "Atlanta Falcons",
        Abv: "ATL",
        Colors: {
            primary: "#A71930",
            secondary: {
                main: "#000000"
            }
        }
    },
    "2": {
        Name: "Buffalo Bills",
        Abv: "BUF",
        Colors: {
            primary: "#00338D",
            secondary: {
                main: "#C60C30"
            }
        }
    },
    "3": {
        Name: "Chicago Bears",
        Abv: "CHI",
        Colors: {
            primary: "#0B162A",
            secondary: {
                main: "#C83803"
            }
        }
    },
    "4": {
        Name: "Cincinatti Bengals",
        Abv: "CIN",
        Colors: {
            primary: "#FB4F14",
            secondary: {
                main: "#000000"
            }
        }
    },
    "5": {
        Name: "Cleveland Browns",
        Abv: "CLE",
        Colors: {
            primary: "#311D00",
            secondary: {
                main: "#FF3C00"
            }
        }
    },
    "6": {
        Name: "Dallas Cowboys",
        Abv: "DAL",
        Colors: {
            primary: "#003594",
            secondary: {
                main: "#041E42"
            }
        }
    },
    "7": {
        Name: "Denver Broncos",
        Abv: "DEN",
        Colors: {
            primary: "#FB4F14",
            secondary: {
                main: "#002244"
            }
        }
    },
    "8": {
        Name: "Detroit Lions",
        Abv: "DET",
        Colors: {
            primary: "#0076B6",
            secondary: {
                main: "#B0B7BC"
            }
        }
    },
    "9": {
        Name: "Green Bay Packers",
        Abv: "GNB",
        Colors: {
            primary: "#203731",
            secondary: {
                main: "#FFB612"
            }
        }
    },
    "10": {
        Name: "Tennessee Titans",
        Abv: "TEN",
        Colors: {
            primary: "#0C2340",
            secondary: {
                main: "#4B92DB",
                dark: "#C8102E"
            }
        }
    },
    "11": {
        Name: "Indianapolis Colts",
        Abv: "IND",
        Colors: {
            primary: "#002C5F",
            secondary: {
                main: "#A2AAAD"
            }
        }
    },
    "12": {
        Name: "Kansas City Chiefs",
        Abv: "KC",
        Colors: {
            primary: "#E31837",
            secondary: {
                main: "#FFB81C"
            }
        }
    },
    "13": {
        Name: "Oakland Raiders",
        Abv: "OAK",
        Colors: {
            primary: "#000000",
            secondary: {
                main: "#A5ACAF"
            }
        }
    },
    "14": {
        Name: "Los Angeles Rams",
        Abv: "LAR",
        Colors: {
            primary: "#003594",
            secondary: {
                main: "#FFA300",
                dark: "#FF8200",
                light: "#FFD100"
            }
        }
    },
    "18": {
        Name: "New Orleans Saints",
        Abv: "NOR",
        Colors: {
            primary: "#D3BC8D",
            secondary: {
                main: "#101820"
            }
        }
    },
    "16": {
        Name: "Minnesota Vikings",
        Abv: "MIN",
        Colors: {
            primary: "#4F2683",
            secondary: {
                main: "#FFC62F"
            }
        }
    },
    "19": {
        Name: "New York Giants",
        Abv: "NYG",
        Colors: {
            primary: "#0B2265",
            secondary: {
                main: "#A71930",
                light: "#A5ACAF"
            }
        }
    },
    "20": {
        Name: "New York Jets",
        Abv: "NYJ",
        Colors: {
            primary: "#125740",
            secondary: {
                main: "#000000",
                light: "#FFF"
            }
        }
    },
    "21": {
        Name: "Philadelphia Eagles",
        Abv: "PHI",
        Colors: {
            primary: "#004C54",
            secondary: {
                main: "#A5ACAF",
                light: "#ACC0C6",
                dark: "#000000"
            }
        }
    },
    "22": {
        Name: "Arizona Cardinals",
        Abv: "ARI",
        Colors: {
            primary: "#97233F",
            secondary: {
                main: "#000000",
                light: "#FFB612"
            }
        }
    },
    "23": {
        Name: "Pittsburgh Stealers",
        Abv: "PIT",
        Colors: {
            primary: "#FFB612",
            secondary: {
                main: "#101820",
                dark: "#003087",
                light: "#A5ACAF"
            }
        }
    },
    "24": {
        Name: "Los Angeles Chargers",
        Abv: "LAC",
        Colors: {
            primary: "#002A5E",
            secondary: {
                main: "#FFC20E",
                dark: "#0080C6"
            }
        }
    },
    "25": {
        Name: "San Francisco 49ers",
        Abv: "SF",
        Colors: {
            primary: "#AA0000",
            secondary: {
                main: "#B3995D"
            }
        }
    },
    "26": {
        Name: "Seattle Seahawks",
        Abv: "SEA",
        Colors: {
            primary: "#002244",
            secondary: {
                main: "#69BE28",
                light: "#A5ACAF"
            }
        }
    },
    "27": {
        Name: "Tampa Bay Buccaneers",
        Abv: "TB",
        Colors: {
            primary: "#D50A0A",
            secondary: {
                main: "#0A0A08",
                light: "#B1BABF",
                dark: "#FF7900"
            }
        }
    },
    "28": {
        Name: "Washington Redskins",
        Abv: "WAS",
        Colors: {
            primary: "#773141",
            secondary: {
                main: "#FFB612"
            }
        }
    },
    "29": {
        Name: "Carolina Panthers",
        Abv: "CAR",
        Colors: {
            primary: "",
            secondary: {
                main: ""
            }
        }
    },
    "30": {
        Name: "Jacksonville Jaguars",
        Abv: "JAC",
        Colors: {
            primary: "#006778",
            secondary: {
                main: "#9F792C",
                light: "#D7A22A",
                dark: "#101820"
            }
        }
    },
    "33": {
        Name: "Baltimore Ravens",
        Abv: "BAL",
        Colors: {
            primary: "#241773",
            secondary: {
                main: "#000000",
                dark: "#9E7C0C"
            }
        }
    },
    "34": {
        Name: "Houston Texans",
        Abv: "HOU",
        Colors: {
            primary: "#03202F",
            secondary: {
                main: "#A71930"
            }
        }
    }
}

export const teamData: TeamData = {
    TeamNames: teamNames,
    PositionNames: positionNames
}

export interface AppData {
    anon_user_id: string
}

export const appData: AppData = { 
    anon_user_id: '299999'
}


