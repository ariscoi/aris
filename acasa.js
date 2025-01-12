window.addEventListener("load", function() {
    if (localStorage.getItem("loggedIn") === "true") {
        document.getElementById("loginForm").style.display = "none"; 
        document.getElementById("logoutButton").style.display = "block"; 
    } else {
        document.getElementById("loginForm").style.display = "block"; 
        document.getElementById("logoutButton").style.display = "none"; 
    }
});

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    fetch('users.json')
        .then(response => response.json()) 
        .then(data => {
            const users = data.users; 
            const user = users.find(u => u.username === username && u.password === password); 

            if (user) {
                document.getElementById("loginMessage").textContent = "Login successful!";
                localStorage.setItem("loggedIn", "true"); 

                
                document.getElementById("loginForm").style.display = "none";
                document.getElementById("logoutButton").style.display = "block";
            } else {
                document.getElementById("loginMessage").textContent = "Invalid username or password.";
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            document.getElementById("loginMessage").textContent = "An error occurred. Please try again.";
        });
});


document.getElementById("logoutButton").addEventListener("click", function() {
    localStorage.removeItem("loggedIn"); 
    document.getElementById("loginForm").style.display = "block"; 
    document.getElementById("logoutButton").style.display = "none";
});