import { logout } from './api/data.js';
import {page , render} from './lib.js' ;
import { homePage } from './viewls/home.js';
import { loginPage } from './viewls/login.js';
import { registerPage } from './viewls/register.js';
import { catalogPage } from './viewls/catalog.js';
import { detailsPage } from './viewls/details.js';
import { createPage } from './viewls/create.js';
import { editPage } from './viewls/edit.js';
import { profilePage } from './viewls/myProfile.js';


const root = document.getElementById('site-content');
document.getElementById('logoutBtn').addEventListener('click' , onLogout)

page(decoratePage)
page('/' , homePage);
page('/catalog' , catalogPage);
page('/details/:id' , detailsPage) 
page('/login', loginPage);
page('/register' , registerPage);
page('/create' , createPage);
page('/edit/:id' , editPage);
page('/profile' , profilePage);

onNavigation () 
page.start();


function decoratePage (ctx , next) {
    ctx.render = template => render(template , root);
    ctx.navigation = onNavigation ;
    next();
}

function onNavigation () {
    const userData = JSON.parse(sessionStorage.getItem('userData'));

    if(userData) {
        document.querySelector('div#profile a').textContent = `Welcome ${userData.username}`
        document.getElementById('profile').style.display = 'block';
        document.getElementById('guest').style.display = 'none';
    }else {
        document.getElementById('profile').style.display = 'none';
        document.getElementById('guest').style.display = 'block';
    }
}  


async function onLogout() {
    await logout();
    onNavigation () 
    page.redirect('/');
}