import { green, indigo, yellow, brown, red, purple, blue, lightGreen, lightBlue } from "@material-ui/core/colors"

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
    "6": {
        Position: "DST",
        Color: brown['A100']
    }
}


const teamNames: any = {
    "1": "Atlanta Falcons",
    "2": "Buffalo Bills",
    "3": "Chicago Bears",
    "4": "Cincinatti Bengals",
    "5": "Cleveland Browns",
    "6": "Dallas Cowboys",
    "7": "Denver Broncos",
    "8": "Detroit Lions",
    "9": "Green Bay Packers",
    "10": "Tennessee Titans",
    "11": "Indianapolis Colts",
    "12": "Kansas City Chiefs",
    "13": "Oakland Raiders",
    "14": "Los Angeles Rams",
    "18": "New Orleans Saints",
    "16": "Minnesota Vikings",
    "19": "New York Giants",
    "20": "New York Jets",
    "21": "Philadelphia Eagles",
    "22": "Arizona Cardinals",
    "23": "Pittsburgh Stealers",
    "24": "Los Angeles Chargers",
    "25": "San Francisco 49ers",
    "26": "Seattle Seahawks",
    "27": "Tampa Bay Buccaneers",
    "28": "Washington Redskins",
    "29": "Carolina Panthers",
    "30": "Jacksonville Jaguars",
    "33": "Baltimore Ravens",
    "34": "Houston Texans"
}

const teamData: TeamData = {
    TeamNames: teamNames,
    PositionNames: positionNames
}

export default teamData

