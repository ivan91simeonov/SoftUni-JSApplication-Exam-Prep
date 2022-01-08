import { page  , render} from './lib.js';
import { homePage } from './views/home.js';
import * as api from './api/data.js'
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { logout } from './api/api.js';
import { catalogPage } from './views/catalog.js';
import { detailsPage } from './views/details.js';
import { createPage } from './views/create.js';
import { editPage } from './views/edit.js';

window.api = api

const main = document.getElementById("main-content");

document.getElementById('logoutBtn').addEventListener('click' , onLogout)


page(decoratePage)
page('/' , homePage);
page('/login' , loginPage);
page('/register' , registerPage);
page('/catalog' , catalogPage);
page('/details/:id' , detailsPage);
page('/edit/:id' , editPage );
page('/create', createPage)

updateNav ()
page.start()



function decoratePage (ctx , next) {
    ctx.render = (template) => render(template , main);
    ctx.navigation = updateNav ;
    next();
}

function updateNav () {
    const userData = JSON.parse(sessionStorage.getItem('userData'));

    if(userData) {
        document.getElementById('user').style.display = 'block'
        document.getElementById('guest').style.display = 'none'
    }else {
        document.getElementById('user').style.display = 'none'
        document.getElementById('guest').style.display = 'block'
    }
}


async function onLogout () {
  await logout();
  updateNav ();
  page.redirect('/');
}