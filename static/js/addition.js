document.addEventListener('DOMContentLoaded', function () {
    const detailsForm = document.getElementById('detailsForm');
    const statusMessage = document.getElementById('statusMessage');

    detailsForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(detailsForm);
        const operation = document.querySelector('input[name="operation"]:checked').value;
        let url = '';
        let message = '';

        const data = {
            company_name: formData.get('companyName'),
            salary: formData.get('salary'),
            rating: formData.get('rating'),
            designation: formData.get('designation')
        };

        if (operation === 'add') {
            url = '/add-details';
            message = 'Company added successfully';
            // Use POST for adding
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                statusMessage.textContent = message;
                statusMessage.style.color = 'green';
                detailsForm.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                statusMessage.textContent = error.message || 'Error adding company.';
                statusMessage.style.color = 'red';
            });
        } else if (operation === 'update') {
            url = '/update';
            message = 'Company updated successfully';
            // Use PUT for updating
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                statusMessage.textContent = message;
                statusMessage.style.color = 'green';
                detailsForm.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                statusMessage.textContent = error.message || 'Error updating company.';
                statusMessage.style.color = 'red';
            });
        }
    });
});
