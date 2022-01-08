import { deleteCar, getDetails } from '../api/data.js';
import { html } from '../lib.js';

const detailsTemplate = (car , isOwner , onDelete) => html`<section id="listing-details">
<h1>Details</h1>
<div class="details-info">
    <img src=${car.imageUrl}>
    <hr>
    <ul class="listing-props">
        <li><span>Brand:</span>${car.brand}</li>
        <li><span>Model:</span>${car.model}</li>
        <li><span>Year:</span>${car.year}</li>
        <li><span>Price:</span>${car.price}$</li>
    </ul>

    <p class="description-para">${car.description}<p>

    ${isOwner 
        ?html`
        <div class="listings-buttons">
        <a href="/edit/${car._id}" class="button-list">Edit</a>
        <a @click=${onDelete} href="javascript:void(0)" class="button-list">Delete</a>
    </div>` : null }
</div>
</section>`;


export async function detailsPage (ctx) {
    const item = await getDetails(ctx.params.id);
    const userData = JSON.parse(sessionStorage.getItem('userData'));

    const isOwner = userData && userData.id == item._ownerId
    ctx.render(detailsTemplate(item , isOwner , onDelete));

    async function onDelete () {
        const chois = confirm(`Are you sure that you wont delete this car ${item.brand , item.model}`)

        if(chois){
            await deleteCar(item._id);
            ctx.page.redirect('/catalog');
        }
    }
} 