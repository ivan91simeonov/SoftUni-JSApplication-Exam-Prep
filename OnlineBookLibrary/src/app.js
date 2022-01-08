import {page , render} from './lib.js';

import * as api from './api/data.js'
import { catalogPage } from './views/catalog.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { logout } from './api/api.js';
import { detailsPage } from './views/details.js';
import { createPage } from './views/create.js';
import { editPage } from './views/edit.js';
import { profilePage } from './views/myBooks.js';

window.api = api;

const main = document.getElementById('site-content');
document.getElementById('logoutBtn').addEventListener('click' , onLogout)

page(decoratePage);
page('/' , catalogPage);
page('/login' , loginPage);
page('/register' , registerPage);
page('/details/:id' , detailsPage);
page('/create' , createPage);
page('/edit/:id' , editPage);
page('/my-books' , profilePage)

upadateNav ()
page.start();

function decoratePage (ctx , next) {
    ctx.render = (template) => render (template ,main );
    ctx.navigation = upadateNav ;
    next();
}

function upadateNav () {
    const userData = JSON.parse(sessionStorage.getItem('userData'));

    if(userData){
        document.querySelector('div#user span').textContent = `Welcome, ${userData.email}`
        document.getElementById('user').style.display = 'block';
        document.getElementById('guest').style.display = 'none';
    }else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'block';
    }
}

async function onLogout () {
    await logout();
    upadateNav ();
    page.redirect('/');
}