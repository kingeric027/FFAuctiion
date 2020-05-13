import { Category, Catalog } from "ordercloud-javascript-sdk";


const GetCurrentSeason = () => {
    return (new Date()).getMonth() >= 3 ? (new Date()).getFullYear() :  (new Date()).getFullYear() - 1; 
}

const GetMaxBid = (team: Category, league: Catalog) => {
    return team.xp?.BudgetRemaining - (league.xp?.RosterSize - team.xp?.Players?.length - 1)
}

export default {
    GetCurrentSeason,
    GetMaxBid
};