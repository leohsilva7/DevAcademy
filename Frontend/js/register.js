const apiUrl = `http://localhost:5059/auth/register`;
const nameInput = document.getElementById('name-id')
const emailInput = document.getElementById('email-id');
const passwordInput = document.getElementById('password-id');
const confirmPasswordInput = document.getElementById('password-confirm-id');
const roleSelect = document.getElementById('role-id');
const registerBtn = document.getElementById('register-btn');
const formRegister = document.getElementById('register-form');
async function register(event){
    event.preventDefault();
    try{
        registerBtn.disabled = true;
        if (passwordInput.value !== confirmPasswordInput.value){
            alert('As Senhas Não São Iguais!');
            return ;
        }
        const formData = {
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
            role: roleSelect.value,
        }   
        const res = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData),
        });
        const data = res.json();
        if (res.status !== 201) {
            console.error(`${data} ${res.status}`);
            return;
        };
        window.location.href = "./index.html";
    }
    finally{
        registerBtn.disabled = false;
    }
}
formRegister.addEventListener('submit', async (event) => {
    await register(event);
});