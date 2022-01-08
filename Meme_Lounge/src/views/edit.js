import { editMeme, getSingleMeme } from '../api/data.js';
import { html } from '../lib.js';


const editTemplate = ( item , onSubmit) => html`<section id="edit-meme">
<form @submit=${onSubmit} id="edit-form">
    <h1>Edit Meme</h1>
    <div class="container">
        <label for="title">Title</label>
        <input id="title" type="text" placeholder="Enter Title" name="title" .value=${item.title}>
        <label for="description">Description</label>
        <textarea id="description" placeholder="Enter Description" name="description" .value=${item.description}> </textarea>
        <label for="imageUrl">Image Url</label>
        <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${item.imageUrl}>
        <input type="submit" class="registerbtn button" value="Edit Meme">
    </div>
</form>
</section>`;


export async function editPage (ctx) {
    const item = await getSingleMeme(ctx.params.id)
    ctx.render(editTemplate( item ,onSubmit));

    async function onSubmit (e){
        e.preventDefault();

        const formData = new FormData(e.target);

        const title = formData.get('title').trim();
        const imageUrl = formData.get('imageUrl').trim();
        const description = formData.get('description').trim();

        if(title == '' || imageUrl == '' || description == ''){
            return alert('All fields are require');
        }

        await editMeme(ctx.params.id , {title , imageUrl , description})
        ctx.page.redirect(`/details/${ctx.params.id}`)
    }
}