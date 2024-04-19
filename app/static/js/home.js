document.addEventListener('DOMContentLoaded', function () {
    const logoutButton = document.getElementById('logoutButton');

    logoutButton.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the default link behavior
        
        // Change button text to "Logging out..."
        logoutButton.textContent = 'Logging out...';

        // Redirect to the logout URL after a short delay
        setTimeout(function () {
            window.location.href = '/logout';
        }, 1000); // 1000ms = 1 second
    });
});
