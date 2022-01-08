import { logout } from './api/api.js';
import {page , render}  from './lib.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import * as api from './api/data.js'
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { profilePage } from './views/myProfile.js';

window.api = api

const root = document.querySelector('main');
document.getElementById('logoutBtn').addEventListener('click' , onLogout)

page(decoratePage);
page('/' , homePage);
page('/catalog' , catalogPage);
page('/login' , loginPage);
page ('/register' , registerPage);
page('/create' , createPage);
page('/details/:id' , detailsPage);
page('/edit/:id' , editPage);
page('/my-profile' , profilePage)

updateNav()
page.start();

function decoratePage (ctx , next) {
    ctx.render = (template ) => render(template , root);
    ctx.navigation = updateNav ;
    next()
} 


function updateNav () {
    const userData = JSON.parse(sessionStorage.getItem('userData'));

    if(userData) {
        document.querySelector('div.profile span').textContent = `Welcome, ${userData.email}`
        document.querySelector('.user').style.display = 'block';
        document.querySelector('.guest').style.display = 'none';
    }else {
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'block';
    }
}


async function onLogout () {
  await  logout();
    updateNav ()
    page.redirect('/');
}
