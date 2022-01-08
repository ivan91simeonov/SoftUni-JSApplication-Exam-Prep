import { myProfile } from '../api/data.js';
import { html } from '../lib.js';
import { editPage } from './edit.js';


const profileTemplate = ( memes, userData) => html`<section id="user-profile-page" class="user-profile">
<article class="user-info">
    <img id="user-avatar-url" alt="user-profile" src="/images/${userData.gender}.png">
    <div class="user-content">
        <p>Username: ${userData.username}</p>
        <p>Email: ${userData.email}</p>
        <p>My memes count: ${memes.length}</p>
    </div>
</article>
<h1 id="user-listings-title">User Memes</h1>
<div class="user-meme-listings">
    <!-- Display : All created memes by this user (If any) --> 
   ${memes.length == 0 ?
   html `<p class="no-memes">No memes in database.</p>`
   :memes.map(itemTemplate)
   }
    <!-- Display : If user doesn't have own memes  --> 
   
</div>
</section>`;

const itemTemplate = (item) => html` <div class="user-meme">
<p class="user-meme-title">${item.title}</p>
<img class="userProfileImage" alt="meme-img" src=${item.imageUrl}>
<a class="button" href="/details/${item._id}">Details</a>
</div>
`

export async function profilePage (ctx) {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const userId = await myProfile(userData.id);
    console.log(userData)

    ctx.render(profileTemplate(userId , userData))
}