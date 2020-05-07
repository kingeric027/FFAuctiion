

const GetCurrentSeason = () => {
    return (new Date()).getMonth() >= 3 ? (new Date()).getFullYear() :  (new Date()).getFullYear() - 1; 
}

export default {
    GetCurrentSeason
};