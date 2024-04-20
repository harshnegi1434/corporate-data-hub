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
            url = '/companies'; // Updated endpoint for adding a company
            message = 'Company added successfully';
            
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add company.');
                }
                return response.json();
            })
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
            url = '/companies/update'; // Updated endpoint for updating a company
            message = 'Company updated successfully';
            
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update company.');
                }
                return response.json();
            })
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
