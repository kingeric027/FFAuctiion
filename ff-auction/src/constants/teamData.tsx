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
    "6": {
        Position: "DST",
        Color: brown['A100']
    }
}


const teamNames: any = {
    "1": {
        Name: "Atlanta Falcons",
        Abv: "ATL"
    },
    "2": {
        Name: "Buffalo Bills",
        Abv: "BUF"
    },
    "3": {
        Name: "Chicago Bears",
        Abv: "CHI"
    },
    "4": {
        Name: "Cincinatti Bengals",
        Abv: "CIN"
    },
    "5": {
        Name: "Cleveland Browns",
        Abv: "CLE"
    },
    "6": {
        Name: "Dallas Cowboys",
        Abv: "DAL"
    },
    "7": {
        Name: "Denver Broncos",
        Abv: "DEN"
    },
    "8": {
        Name: "Detroit Lions",
        Abv: "DET"
    },
    "9": {
        Name: "Green Bay Packers",
        Abv: "GNB"
    },
    "10": {
        Name: "Tennessee Titans",
        Abv: "TEN"
    },
    "11": {
        Name: "Indianapolis Colts",
        Abv: "IND"
    },
    "12": {
        Name: "Kansas City Chiefs",
        Abv: "KC"
    },
    "13": {
        Name: "Oakland Raiders",
        Abv: "OAK"
    },
    "14": {
        Name: "Los Angeles Rams",
        Abv: "LAR"
    },
    "18": {
        Name: "New Orleans Saints",
        Abv: "NOR"
    },
    "16": {
        Name: "Minnesota Vikings",
        Abv: "MIN"
    },
    "19": {
        Name: "New York Giants",
        Abv: "NYG"
    },
    "20": {
        Name: "New York Jets",
        Abv: "NYJ"
    },
    "21": {
        Name: "Philadelphia Eagles",
        Abv: "PHI"
    },
    "22": {
        Name: "Arizona Cardinals",
        Abv: "ARI"
    },
    "23": {
        Name: "Pittsburgh Stealers",
        Abv: "PIT"
    },
    "24": {
        Name: "Los Angeles Chargers",
        Abv: "LAC"
    },
    "25": {
        Name: "San Francisco 49ers",
        Abv: "SF"
    },
    "26": {
        Name: "Seattle Seahawks",
        Abv: "SEA"
    },
    "27": {
        Name: "Tampa Bay Buccaneers",
        Abv: "TB"
    },
    "28": {
        Name: "Washington Redskins",
        Abv: "WAS"
    },
    "29": {
        Name: "Carolina Panthers",
        Abv: "CAR"
    },
    "30": {
        Name: "Jacksonville Jaguars",
        Abv: "JAC"
    },
    "33": {
        Name: "Baltimore Ravens",
        Abv: "BAL"
    },
    "34": {
        Name: "Houston Texans",
        Abv: "HOU"
    }
}

const teamData: TeamData = {
    TeamNames: teamNames,
    PositionNames: positionNames
}

export default teamData

