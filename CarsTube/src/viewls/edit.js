import { editCar, getSingleCar } from '../api/data.js';
import { html } from '../lib.js';

const editTemplate = ( car , onSubmit) => html`<section id="edit-listing">
<div class="container">

    <form @submit=${onSubmit} id="edit-form">
        <h1>Edit Car Listing</h1>
        <p>Please fill in this form to edit an listing.</p>
        <hr>

        <p>Car Brand</p>
        <input type="text" placeholder="Enter Car Brand" name="brand" .value=${car.brand}>

        <p>Car Model</p>
        <input type="text" placeholder="Enter Car Model" name="model" .value=${car.model}>

        <p>Description</p>
        <input type="text" placeholder="Enter Description" name="description" .value=${car.description}>

        <p>Car Year</p>
        <input type="number" placeholder="Enter Car Year" name="year" .value=${car.year}>

        <p>Car Image</p>
        <input type="text" placeholder="Enter Car Image" name="imageUrl" .value=${car.imageUrl}>

        <p>Car Price</p>
        <input type="number" placeholder="Enter Car Price" name="price" .value=${car.price}>

        <hr>
        <input type="submit" class="registerbtn" value="Edit Listing">
    </form>
</div>
</section>`;


export async function editPage (ctx) {
    const item = await getSingleCar(ctx.params.id);
    console.log(item)

    ctx.render(editTemplate(item , onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const brand = formData.get('brand').trim();
        const model = formData.get('model').trim();
        const description = formData.get('description').trim();
        let year = formData.get('year').trim();
        const imageUrl = formData.get('imageUrl').trim();
        let price = formData.get('price').trim();

        year = Number(year);
        price = Number(price);

        if(price < 0 || year < 0) {
            return alert ('Price and year must be positive numbers')
        }
        if(brand == '' || model == '' || description == '' || year == '' || imageUrl == '' || price == ''){
            return alert('All fields must be field');
        }

        await editCar(item._id , {
            brand,
            model,
            description,
            year,
            imageUrl,
            price
         })

         ctx.page.redirect(`/details/${ctx.params.id}`)
    }
}