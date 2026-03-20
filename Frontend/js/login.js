const apiUrl = `http://localhost:5059/auth/login`;
const emailInput = document.getElementById('email-id');
const passwordInput = document.getElementById('password-id');
const messageContainer = document.getElementById('message-box');
const loginBtn = document.getElementById('login-btn');
const form = document.getElementById('login-form');
async function login(event){
        event.preventDefault();
        try{
            loginBtn.disabled = true;
            const res = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: emailInput.value,
                    password: passwordInput.value
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                console.error(`${data} ${res.status}`);
                messageContainer.innerHTML = `
                    <p>${data.message}</p>
                `
            }
            localStorage.setItem('token', data.token);
            console.log(localStorage.getItem('token'));
        }
        finally{
            loginBtn.disabled = false;
        }
}
form.addEventListener('submit', async (event) => {
    await login(event);
});