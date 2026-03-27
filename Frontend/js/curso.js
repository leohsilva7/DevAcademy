const apiUrl = `http://localhost:5059/api/Cursos`;
const messageBox = document.getElementById('message-box');
const form = document.getElementById('create-curso-form');

function parseJwt(token)
{
    try
    {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c){
            return '%' + ('00' + c.charCodeAt(0).toString(16).slice(-2));
        }).join(''));
        return JSON.parse(jsonPayload);
    }
    catch (error)
    {
        console.error(error);
        return;
    }
}
const token = localStorage.getItem('token');
let userRole = null;
if (token)
{
    const payload = parseJwt(token);
    if (payload)
    {
        userRole = payload.role;
    }
}
const rolesArray = userRole ? (Array.isArray(userRole) ? userRole : [userRole]) : [];
if (!token)
{
    messageBox.textContent("Usuário Não Autorizado");
    form.style.display = 'none';
    setTimeout(() => {
        console.log("Esperando Um Tempo");
    }, 5000);
    window.location.href = '../index.html';
}
else if (!rolesArray.includes("Admin") && !rolesArray.includes("Professor"))
{
    alert("Acesso Negado. Você Não Tem Permissão para visualizar essa página");
    window.location.href = '../index.html';
}
async function createCurso(event) 
{
    
    event.preventDefault();
    messageBox.textContent = '';
    const title = document.getElementById('title-id').value;
    const description = document.getElementById('description-id').value;
    const hours = document.getElementById('hours-id').value;
    const submitBtn = document.getElementById('submit-btn');
    try 
    {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Carregando...';
        const res = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({title, description, hours}),
        });
        if (res.status !== 201)
            {
                throw new Error(`${res.status}`);
            }
        const data = await res.json();
        messageBox.textContent = data.message;
    }
    catch (error)
    {
        console.error(error);
    }
    finally 
    {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Criar';
    }
}
form.addEventListener('submit', createCurso);