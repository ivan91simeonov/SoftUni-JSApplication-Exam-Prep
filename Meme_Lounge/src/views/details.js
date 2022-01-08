import {  deleteMeme, getSingleMeme } from '../api/data.js';
import { html } from '../lib.js';


const detailsTemplate = (meme , isOwner , onDelete) => html`<section id="meme-details">
<h1>Meme Title: ${meme.title}</h1>
<div class="meme-details">
    <div class="meme-img">
        <img alt="meme-alt" src=${meme.imageUrl}>
    </div>
    <div class="meme-description">
        <h2>Meme Description</h2>
        <p>${meme.description}</p>

        ${isOwner ? html`
        <a class="button warning" href="/edit/${meme._id}">Edit</a>
        <button @click=${onDelete} class="button danger">Delete</button>
        ` : null}
        
    </div>
</div>
</section>`;

export async function detailsPage (ctx){
    const item = await getSingleMeme(ctx.params.id);
    const userData = JSON.parse(sessionStorage.getItem('userData'));

    const isOwner = userData && item._ownerId == userData.id ;


    ctx.render(detailsTemplate(item , isOwner , onDelete));


    async function onDelete(){
        const choise = confirm('Are you sure that you wont delete this ');

        if(choise) {
          await  deleteMeme(item._id)
            ctx.page.redirect('/catalog')
        }
    }
}