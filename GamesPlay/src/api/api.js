async function request (url , options) {

    try {
        const response = await fetch (url , options)

        if(response.ok == false) {
            if(response.status == 403) {
                sessionStorage.removeItem('userDate')
            }
            const error = await response.json();
            throw new Error(error.message);
        }

        if(response.status == 204) {
            return response
        }else {
            return response.json();
        }

    }catch (err) {
        alert(err.message)
        throw err 
    }
}

function createOptions (method = 'get' , date) {
    
     const  options = {
        method , 
        headers: {}
       }

     if(date != undefined) {
        options.headers['Content-Type'] = 'application/json'
        options.body = JSON.stringify(date);
        }

        const userData = JSON.parse(sessionStorage.getItem('userData'));

        if(userData != null) {
            options.headers['X-Authorization'] = userData.token;
        }

        return options
}

export async function get (url) {
    return request (url , createOptions());
}

export async function post (url , data) {
    return request(url , createOptions('post' , data));
}

export async function put (url , data) {
    return request (url , createOptions('put' , data));
}


export async function del (url) {
    return request(url , createOptions('delete'));
}


export async function login (email , password) {

    const data = await post( 'http://localhost:3030/users/login' , {email , password});

    const userData  = {
        email: data.email ,
        id : data._id ,
        token : data.accessToken ,
     }

     sessionStorage.setItem('userData' , JSON.stringify(userData));

}


export async function register (email , password) {
    const data = await post( 'http://localhost:3030/users/register' , {email , password});

    const userData  = {
        email: data.email ,
        id : data._id ,
        token : data.accessToken ,
     }

     sessionStorage.setItem('userData' , JSON.stringify(userData));

}

export async function logout () {
    await get('http://localhost:3030/users/logout');

    sessionStorage.removeItem('userData')
}


