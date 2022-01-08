import * as api from './api.js'

export const login = api.login ;
export const register = api.register ;
export const logout = api.logout 



export async function displayAllGames () {
    return api.get('http://localhost:3030/data/games?sortBy=_createdOn%20desc&distinct=category')
}

export async function allGames () {
    return api.get('http://localhost:3030/data/games?sortBy=_createdOn%20desc');
}

export async function getGameById (id) {
    return api.get('http://localhost:3030/data/games/' + id)
}

export async function createGame (data) {
    return api.post('http://localhost:3030/data/games' , data);
}

export async function delteGame (id) {
    return api.del('http://localhost:3030/data/games/'  + id)
}

export async function editGame (id , data) {
    return api.put('http://localhost:3030/data/games/' + id , data)
}