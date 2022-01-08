import { myProfileBooks } from '../api/data.js';
import { html } from '../lib.js';

const profilTemplate = (books) => html`    <section id="my-books-page" class="my-books">
<h1>My Books</h1>
<!-- Display ul: with list-items for every user's books (if any) -->
    ${books.length == 0 
       ? html`<p class="no-books">No books in database!</p>`
       :books.map(itemTemplate) 
    }

<!-- Display paragraph: If the user doesn't have his own books  -->
</section>`;

const itemTemplate = (book) => html`<ul class="my-books-list">
<li class="otherBooks">
    <h3>${book.title}</h3>
    <p>Type: ${book.type}</p>
    <p class="img"><img src=${book.imageUrl}></p>
    <a class="button" href="/details/${book._id}">Details</a>
</li>
<!-- <li class="otherBooks">
    <h3>A Court of Thorns and Roses</h3>
    <p>Type: Fiction</p>
    <p class="img"><img src="/images/book1.png"></p>
    <a class="button" href="#">Details</a>
</li> -->
</ul>`;

export async function profilePage (ctx) {

    const userData = JSON.parse(sessionStorage.getItem('userData'));

    const userId = await myProfileBooks(userData.id)

    ctx.render(profilTemplate(userId));
}