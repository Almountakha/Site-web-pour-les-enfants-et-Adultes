// Fonction pour enregistrer un nouvel utilisateur
function registerUser(event) {
    event.preventDefault();
    const name = document.getElementById("register-name").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const age = parseInt(document.getElementById("register-age").value, 10);

    let users = JSON.parse(localStorage.getItem("users") || "[]");
    // Vérifier si l'email existe déjà
    if (users.find(user => user.email === email)) {
        alert("Cet email est déjà utilisé.");
        return;
    }
    users.push({ name, email, password, age });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Inscription réussie ! Vous pouvez vous connecter.");
    window.location.href = "connexion.html";
}

// Fonction pour connecter un utilisateur
function loginUser(event) {
    event.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    let users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        alert("Email ou mot de passe incorrect.");
        return;
    }
    // Stocker l'utilisateur connecté (ex: dans localStorage)
    localStorage.setItem("currentUser", JSON.stringify(user));

    // Redirection selon l'âge
    if (user.age >= 18) {
        window.location.href = "adulte.html";
    } else {
        window.location.href = "enfant.html";
    }
}

// Ajout des écouteurs d'événements pour les formulaires
document.addEventListener("DOMContentLoaded", function() {
    const registerForm = document.getElementById("register-form");
    if (registerForm) {
        registerForm.addEventListener("submit", registerUser);
    }

    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", loginUser);
    }
});