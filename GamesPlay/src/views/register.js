import { register } from '../api/api.js';
import { html } from '../lib.js';

const registerTemplate = (onSubmit) => html `<section id="register-page" class="content auth">
<form @submit=${onSubmit} id="register">
    <div class="container">
        <div class="brand-logo"></div>
        <h1>Register</h1>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="maria@email.com">

        <label for="pass">Password:</label>
        <input type="password" name="password" id="register-password">

        <label for="con-pass">Confirm Password:</label>
        <input type="password" name="confirm-password" id="confirm-password">

        <input class="btn submit" type="submit" value="Register">

        <p class="field">
            <span>If you already have profile click <a href="/login">here</a></span>
        </p>
    </div>
</form>
</section>`

export function registerPage (ctx) {
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const rePass = formData.get('confirm-password').trim();

        if(email == '' || password == '') {
            return alert('Email or password don\'t match')
        }

        if(password != rePass) {
            return alert('Password don\'t match');
        }


        await register(email , password);

        ctx.navigation()
        ctx.page.redirect('/')
    }
}