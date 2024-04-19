document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('form');
    
    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent default form submission
        
        const username = document.querySelector('input[name="username"]').value;
        const password = document.querySelector('input[name="password"]').value;

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
            });

            const responseData = await response.text();
            
            if (response.redirected) {
                // Handle successful login
                const successMessage = document.createElement('p');
                successMessage.textContent = 'Login successful';
                
                successMessage.classList.add('success-message');
                
                const form = document.querySelector('form');
                form.parentNode.insertBefore(successMessage, form.nextSibling);
                
                // Remove success message after 3 seconds and redirect
                setTimeout(function () {
                    successMessage.remove();
                    window.location.href = response.url; // Redirect to the new URL
                }, 3000);
            } else {
                // Handle error message
                const errorMessage = document.createElement('p');
                errorMessage.textContent = 'Invalid username or password';
                
                errorMessage.classList.add('error-message');
                
                const form = document.querySelector('form');
                form.parentNode.insertBefore(errorMessage, form.nextSibling);
                
                // Remove error message after 3 seconds
                setTimeout(function () {
                    errorMessage.remove();
                }, 3000);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error here, e.g., display a generic error message
        }
    });
});
