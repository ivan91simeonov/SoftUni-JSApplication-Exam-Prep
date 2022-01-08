import { createMeme } from '../api/data.js';
import { html } from '../lib.js';


const createTemplate = (onSubmit) => html`<section id="create-meme">
<form @submit=${onSubmit} id="create-form">
    <div class="container">
        <h1>Create Meme</h1>
        <label for="title">Title</label>
        <input id="title" type="text" placeholder="Enter Title" name="title">
        <label for="description">Description</label>
        <textarea id="description" placeholder="Enter Description" name="description"></textarea>
        <label for="imageUrl">Meme Image</label>
        <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
        <input type="submit" class="registerbtn button" value="Create Meme">
    </div>
</form>
</section>`;


export function createPage (ctx) {
    ctx.render(createTemplate(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const title = formData.get('title').trim();
        const imageUrl = formData.get('imageUrl').trim();
        const description = formData.get('description').trim();

        if(title == '' || imageUrl == '' || description == ''){
            return alert('All fields are require');
        }

        await createMeme({title , imageUrl , description});
        ctx.page.redirect('/catalog')
    }
}