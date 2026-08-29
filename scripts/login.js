const modal1 = document.getElementById('id01');
const modal2 = document.getElementById('id02');

function closeModel1()
{
    document.getElementById('id01').style.display='none';
    document.getElementById('signupbtn').style.display='block';
    document.getElementById('loginbtn').style.display='block';
    document.getElementById('head').style.display='block';
}

function closeModel2()
{
    document.getElementById('id02').style.display='none';
    document.getElementById('signupbtn').style.display='block';
    document.getElementById('loginbtn').style.display='block';
    document.getElementById('head').style.display='block';
}

function showModel1()
{
    document.getElementById('id01').style.display='block';
    document.getElementById('signupbtn').style.display='none';
    document.getElementById('loginbtn').style.display='none';
    document.getElementById('head').style.display='none';
}

function showModel2()
{
    document.getElementById('id02').style.display='block';
    document.getElementById('signupbtn').style.display='none';
    document.getElementById('loginbtn').style.display='none';
    document.getElementById('head').style.display='none';
}

function register(event) {
    event.preventDefault();
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if(username == "" || email == "" || password =="" || username.length < 2 || password.length < 6 || !email.includes('@')){
        alert("syntax error");
        return;
    }

    const users = JSON.parse(localStorage.getItem('allUsers')) ?? {};

    if(users[email] !== undefined)
    {
        alert("user exists");
        closeModel1();
        showModel2();
        return;
    }

    const user = {
        username: username,
        email: email,
        password: password
    }

    users[email] = user;

    localStorage.setItem('currentUser', JSON.stringify(user))
    localStorage.setItem('allUsers', JSON.stringify(users))
    alert("registering success");
    window.open('home-page.html','_self')
}


function login(event)
{
    event.preventDefault();
    let email = document.getElementById("email2").value;
    let password = document.getElementById("password2").value;

    // if(email == "" || password =="" || password.length < 6 || !email.includes('@')){
    //     alert("syntax error");
    //     return;
    // }

    const users = JSON.parse(localStorage.getItem('allUsers')) ?? {};
    if(users[email] === undefined)
    {
        alert('אינך רשום במערכת עליך להרשם ב-sign up');
        closeModel2();
        showModel1();
        return;
    }

    if(users[email].password === password)
    {
        window.open('home-page.html','_self')    }

    else
        alert('error');
   
}
