import * as api from './api.js'


export const login = api.login;
export const register = api.register;
export const logout = api.logout;


export async function getAllMemes () {
    return api.get('http://localhost:3030/data/memes?sortBy=_createdOn%20desc')
}

export async function getSingleMeme (id) {
    return api.get('http://localhost:3030/data/memes/' + id )
}

export async function createMeme (data) {
    return api.post('http://localhost:3030/data/memes' , data);
}

export async function deleteMeme (id) {
    return api.del('http://localhost:3030/data/memes/' + id )
}

export async function editMeme (id , data) {
    return api.put('http://localhost:3030/data/memes/' + id , data);
}

export async function myProfile (userId) {
    return api.get(`http://localhost:3030/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}