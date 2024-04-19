document.addEventListener('DOMContentLoaded', function () {
    const searchHighestSalaryBtn = document.getElementById('searchHighestSalary');
    const searchHighestRatingBtn = document.getElementById('searchHighestRating');
    const searchHighestReportedSalariesBtn = document.getElementById('searchHighestReportedSalaries');
    const tableContainer = document.getElementById('tableContainer');

    function fetchData(param) {
        fetch(`/highest/${param}`)
            .then(response => response.json())
            .then(data => {
                // Sort data by highest value in descending order
                const sortedData = Object.entries(data).sort((a, b) => b[1].highest_value - a[1].highest_value);

                // Clear previous content
                tableContainer.innerHTML = '';

                // Create table and headers
                const table = document.createElement('table');
                const thead = document.createElement('thead');
                const headerRow = document.createElement('tr');
                const th1 = document.createElement('th');
                const th2 = document.createElement('th');
                const th3 = document.createElement('th');
                th1.textContent = 'Designation';
                th2.textContent = 'Company Name';
                th3.textContent = param === 'reported_salaries' ? 'Reported Salaries' : 'Highest ' + param.charAt(0).toUpperCase() + param.slice(1);
                headerRow.appendChild(th1);
                headerRow.appendChild(th2);
                headerRow.appendChild(th3);
                thead.appendChild(headerRow);
                table.appendChild(thead);

                // Create table body and rows
                const tbody = document.createElement('tbody');
                sortedData.forEach(([designation, { company_name, highest_value }]) => {
                    const row = document.createElement('tr');
                    const cell1 = document.createElement('td');
                    const cell2 = document.createElement('td');
                    const cell3 = document.createElement('td');

                    cell1.textContent = designation;
                    cell2.textContent = company_name;
                    cell3.textContent = param === 'salary' ? highest_value + ' LPA' : highest_value;

                    row.appendChild(cell1);
                    row.appendChild(cell2);
                    row.appendChild(cell3);
                    tbody.appendChild(row);
                });
                table.appendChild(tbody);

                // Append table to container
                tableContainer.appendChild(table);
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Event listeners for each button
    searchHighestSalaryBtn.addEventListener('click', () => fetchData('salary'));
    searchHighestRatingBtn.addEventListener('click', () => fetchData('rating'));
    searchHighestReportedSalariesBtn.addEventListener('click', () => fetchData('reported_salaries'));
});
