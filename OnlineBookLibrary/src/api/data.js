import * as api from './api.js'


export const login = api.login ;
export const register = api.register ;
export const logout = api.logout ;



export async function getAllBooks() {
    return api.get('http://localhost:3030/data/books?sortBy=_createdOn%20desc');
}

export async function getSingleBook (id) {
    return api.get('http://localhost:3030/data/books/' + id)
}

export async function deleteBook(id){
    return api.del('http://localhost:3030/data/books/' + id)

}

export async function createBook (data) {
    return api.post('http://localhost:3030/data/books' , data);
}

export async function editBook (id , data) {
    return api.put('http://localhost:3030/data/books/' + id , data);
}

export async function myProfileBooks (userId) {
    return api.get(`http://localhost:3030/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}