import axios from "axios";


export default {
    getPlayerList: function() {
        return axios.get("https://fantasy.espn.com/apis/v3/games/ffl/seasons/2020/segments/0/leaguedefaults/3?view=kona_player_info");
      },
}

