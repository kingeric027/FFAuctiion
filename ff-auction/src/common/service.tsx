import { Category, Catalog } from "ordercloud-javascript-sdk";
import { DraftedPlayer } from "../draft/playerTable/draftPlayerForm";


const GetCurrentSeason = () => {
    return (new Date()).getMonth() >= 3 ? (new Date()).getFullYear() :  (new Date()).getFullYear() - 1; 
}

const GetMaxBid = (team: Category, league: Catalog) => {
    return team.xp?.BudgetRemaining - (league.xp?.RosterSize - team.xp?.Players?.length - 1)
}

const GetBudgetSpent = (players: DraftedPlayer[]) => {
    return players.map(p => p.value).reduce(function(a, b){ return a+b}, 0)
}

export default {
    GetCurrentSeason,
    GetMaxBid,
    GetBudgetSpent
};