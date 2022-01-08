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

        try{
            return await response.json()
        }catch(err){
            return response
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
        username: data.username,
        email: data.email ,
        id : data._id ,
        gender: data.gender,
        token : data.accessToken ,
     }

     sessionStorage.setItem('userData' , JSON.stringify(userData));

}


export async function register ( username, email , password , gender) {
    const data = await post( 'http://localhost:3030/users/register' , {username,email , password , gender});

    const userData  = {
        username: data.username,
        email: data.email ,
        id : data._id ,
        gender: data.gender,
        token : data.accessToken ,
     }

     sessionStorage.setItem('userData' , JSON.stringify(userData));

}

export async function logout () {
    await get('http://localhost:3030/users/logout');

    sessionStorage.removeItem('userData')
}

