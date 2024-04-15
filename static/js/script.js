document.addEventListener('DOMContentLoaded', function () {
    const loginLink = document.getElementById('loginLink');
    
    loginLink.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default link behavior
        
        // Fade out the content
        const content = document.querySelector('.wrapper');
        content.classList.add('fade-out');
        
        // Redirect to the login page after the fade-out animation completes
        setTimeout(function () {
            window.location.href = loginLink.href;
        }, 2000); // 2000ms = 2 seconds (time of fade-out animation)
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const content = document.querySelector('.wrapper');
    
    // Add fade-in class to apply fade-in animation
    content.classList.add('fade-in');
});


document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') {
        const content = document.querySelector('.wrapper');
        content.classList.remove('fade-out');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const content = document.querySelector('.main');
    
    // Add fade-in class to apply fade-in animation
    content.classList.add('fade-in');
});

document.addEventListener('DOMContentLoaded', function () {
    const currentPage = document.body.id;

    if (currentPage === 'loginPage' || currentPage === 'signupPage') {
        const content = document.querySelector('.main');
        
        // Add fade-in class to apply fade-in animation
        content.classList.add('fade-in');
    }
});
