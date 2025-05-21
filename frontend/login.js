// Registrar usuario
document.getElementById("SignInButton").addEventListener("click", () => {
    const Nombre = document.getElementById("Nombre_Completo").value;
    const correo = document.getElementById("email").value;
    const Numero = document.getElementById("Numero").value;
    const Contraseña = document.getElementById("Contraseña").value;

    if (password !== passwordRepeat) {
        alert("Passwords do not match.");
        return;
    }

    if (!Nombre || !password) {
        alert("All fields are required.");
        return;
    }

    const data = {
        Nombre: Nombre,
        correo: correo,
        Numero: Numero,
        Contraseña: Contraseña,
        
        
    };

    fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error("Registration failed.");
            }
        })
        .then(message => {
            alert(message);
            document.getElementById("password").value = "";
            document.getElementById("passwordRepeat").value = "";
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while registering.");
        });
});

// Buscar usuario por Nombre_Completo
document.getElementById("LogInButton").addEventListener("click", () => {
    const Nombre_Completo = document.getElementById("LogIn").value;
    const password = document.getElementById("LogPassword").value;

    if (!Nombre_Completo || !password) {
        alert("Please enter a Nombre_Completo.");
        return;
    }

    fetch(`http://localhost:3000/user/${Nombre_Completo}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 404) {
                throw new Error("User not found.");
            } else {
                throw new Error("Error fetching user.");
            }
        })
        .then(user => {
            if (user.password == password) {
                alert(`${user.iduser} register`);
            }else{
                alert(`Wrong password`);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert(error.message);
        });
});