const apiUrl = `http://localhost:5059/auth/login`;
const emailInput = document.getElementById('email-id');
const passwordInput = document.getElementById('password-id');
const messageContainer = document.getElementById('message-box');
const loginBtn = document.getElementById('login-btn');
const form = document.getElementById('login-form');

const loginSection = document.getElementById('login-section');
const dashboardSection = document.getElementById('dashboard-section')
const fetchDataBtn = document.getElementById('fetch-data-btn');
const apiDataBox = document.getElementById('api-data');
const logoutBtn = document.getElementById('logout-btn');

function initIndex(){
    const token = localStorage.getItem('token');
    if (token) {
        loginSection.classList.add("hidden");
        dashboardSection.classList.remove("hidden");
    }
    else {
        dashboardSection.classList.add("hidden");
        loginSection.classList.remove("hidden");
    }
}

async function login(event){
    event.preventDefault();
    try {
        loginBtn.disabled = true;
        loginBtn.textContent = 'Carregando';
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
            throw new Error(data.message || 'Credenciais Inválidas');
        }
        console.log(data.token);
        localStorage.setItem('token', data.token);
        // sessionStorage.setItem('userEmail', email)
        initIndex();
        }
        catch (error) {
            messageContainer.innerHTML = `
                <p>${error.message}</p>
            `
        }
        finally {
            loginBtn.disabled = false;
            loginBtn.textContent = 'Entrar';
        }
}
form.addEventListener('submit', async (event) => {
    await login(event);
});
function logout() {
    localStorage.removeItem('token');
    initIndex();
    apiDataBox.style.display = 'none';
}
initIndex();
logoutBtn.addEventListener('click', logout);