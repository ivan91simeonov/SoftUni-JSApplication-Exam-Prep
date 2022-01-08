import { delteGame, getGameById } from '../api/data.js';
import { html } from '../lib.js';

const detailsTemplate = (game , isOwner , onDelete) => html `<section id="game-details">
<h1>Game Details</h1>
<div class="info-section">

    <div class="game-header">
        <img class="game-img" src=${game.imageUrl} />
        <h1>${game.title}</h1>
        <span class="levels">MaxLevel: ${game.maxLevel}</span>
        <p class="type">${game.category}</p>
    </div>

    <p class="text">${game.summary}</p>

    <!-- Bonus ( for Guests and Users )
    <div class="details-comments">
        <h2>Comments:</h2>
        <ul>
            <!-- list all comments for current game (If any) -->
            <!-- <li class="comment"> -->
                <!-- <p>Content: I rate this one quite highly.</p> -->
            <!-- </li> -->
            <!-- <li class="comment"> -->
                <!-- <p>Content: The best game.</p> -->
            <!-- </li> -->
        <!-- </ul> -->
        <!-- Display paragraph: If there are no games in the database -->
        <!-- <p class="no-comment">No comments.</p> -->
    <!-- </div> --> 

    <!-- Edit/Delete buttons ( Only for creator of this game )  -->
    <div class="buttons">
        ${isOwner ? html`
        <a href="/edit/${game._id}" class="button">Edit</a>
        <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>` : null}
    </div>
</div>
`

export async function detailsPage (ctx) {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    
    const game = await getGameById(ctx.params.id);

    const isOwner = userData &&  game._ownerId == userData.id;

    ctx.render(detailsTemplate(game , isOwner , onDelete));

    async function onDelete (){
        const choise = confirm('Are you shure you wont delete this game');

        if(choise){
            await delteGame(ctx.params.id);
            ctx.page.redirect('/')
        }
    }
}