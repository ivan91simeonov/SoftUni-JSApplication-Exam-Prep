import { deleteBook, getSingleBook } from '../api/data.js';
import { html } from '../lib.js';

const detailsTemplate = (book , isOwner , onDelete) => html`<section id="details-page" class="details">
<div class="book-information">
    <h3>${book.title}</h3>
    <p class="type">Type: ${book.type}</p>
    <p class="img"><img src=${book.imageUrl}></p>
    <div class="actions">
        <!-- Edit/Delete buttons ( Only for creator of this book )  -->
        ${isOwner 
        ? html` <a class="button" href="/edit/${book._id}">Edit</a>
                <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a> `:null }


        <!-- Bonus -->
        <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
        <!-- <a class="button" href="#">Like</a> -->

        <!-- ( for Guests and Users )  -->
        <div class="likes">
            <img class="hearts" src="/images/heart.png">
            <span id="total-likes">Likes: 0</span>
        </div>
        <!-- Bonus -->
    </div>
</div>
<div class="book-description">
    <h3>Description:</h3>
    <p>${book.description}</p>
</div>
</section>`;


export async function detailsPage (ctx) {
    const item = await getSingleBook(ctx.params.id);

    const userData = JSON.parse(sessionStorage.getItem('userData'));
    
    const isOwner = userData && userData.id == item._ownerId ;

    ctx.render(detailsTemplate(item , isOwner , onDelete));

    async function onDelete () {
        const choise = confirm(`Are you sure that you won\'t delete this book ${item.title}`);

        if(choise) {
            await deleteBook(ctx.params.id);
            ctx.page.redirect('/')
        }
    }
}