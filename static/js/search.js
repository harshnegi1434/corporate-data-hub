document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const tableContainer = document.getElementById('tableContainer');
    const paginationButtons = document.getElementById('paginationButtons');
    let currentPage = 1;

    function reorderRecords(records) {
        records.sort((a, b) => a.ID - b.ID);
        return records;
    }
    function clearTableContainer() {
        while (tableContainer.firstChild) {
            tableContainer.removeChild(tableContainer.firstChild);
        }
    }

    function clearPaginationButtons() {
        paginationButtons.innerHTML = '';
    }

    function displayRecords(records) {
        clearTableContainer();

        if (records.length === 0) {
            tableContainer.innerHTML = '<p>No records found.</p>';
            return;
        }

        const table = document.createElement('table');
        const tableHead = document.createElement('thead');
        const tableBody = document.createElement('tbody');

        const tableHeaders = ['ID', 'Company Name', 'Salary', 'Rating', 'Reported Salaries', 'Designation'];
        const tableHeaderRow = document.createElement('tr');

        tableHeaders.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            tableHeaderRow.appendChild(th);
        });

        tableHead.appendChild(tableHeaderRow);
        table.appendChild(tableHead);

        const recordsPerPage = 10;
        const startIndex = (currentPage - 1) * recordsPerPage;
        const endIndex = Math.min(startIndex + recordsPerPage, records.length);

        for (let i = startIndex; i < endIndex; i++) {
            const record = records[i];
            const row = document.createElement('tr');

            // Map keys to the desired order
            const orderedKeys = ['ID', 'Company Name', 'Salary', 'Rating', 'Reported Salaries', 'Designation'];
            orderedKeys.forEach(key => {
                const cell = document.createElement('td');
                if (key === 'Salary') {
                    cell.textContent = record[key] + ' LPA'; // Append 'LPA' to the salary value
                } else {
                    cell.textContent = record[key];
                }
                row.appendChild(cell);
            });

            tableBody.appendChild(row);
        }

        table.appendChild(tableBody);
        tableContainer.appendChild(table);

        if (records.length > recordsPerPage) {
            clearPaginationButtons();

            const totalPages = Math.ceil(records.length / recordsPerPage);

            if (currentPage > 1) {
                const prevButton = document.createElement('button');
                prevButton.classList.add('prevNextButton');
                prevButton.textContent = 'Previous';
                prevButton.addEventListener('click', () => {
                    currentPage--;
                    displayRecords(records);
                });
                paginationButtons.appendChild(prevButton);
            }

            if (currentPage < totalPages) {
                const nextButton = document.createElement('button');
                nextButton.classList.add('prevNextButton');
                nextButton.textContent = 'Next';
                nextButton.addEventListener('click', () => {
                    currentPage++;
                    displayRecords(records);
                });
                paginationButtons.appendChild(nextButton);
            }
        }
    }

    function searchByDesignation() {
        const searchTerm = searchInput.value;

        fetch(`/records/designation/${searchTerm}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Didnt found any Designation Name like '${searchTerm}' in the database.`);
                }
                return response.json();
            })
            .then(data => {
                if (data.error) {
                    throw new Error(data.error);
                }
                const records = data.companies;
                const reorderedRecords = reorderRecords(records)
                currentPage = 1;
                displayRecords(reorderedRecords);
            })
            .catch(error => {
                clearTableContainer();
                clearPaginationButtons();
                tableContainer.innerHTML = `<p>Error: ${error.message}</p>`;
            });
    }

    function searchByCompanyName() {
        const searchTerm = searchInput.value;

        fetch(`/records/company/${searchTerm}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Didnt found any Company Name like '${searchTerm}' in the database.`);
                }
                return response.json();
            })
            .then(data => {
                if (data.error) {
                    throw new Error(data.error);
                }
                const records = data.companies;
                currentPage = 1;
                displayRecords(records);
            })
            .catch(error => {
                clearTableContainer();
                clearPaginationButtons();
                tableContainer.innerHTML = `<p>Error: ${error.message}</p>`;
            });
    }

    searchButton.addEventListener('click', () => {
        const searchType = document.querySelector('input[name="searchType"]:checked').value;

        if (searchType === 'designation') {
            searchByDesignation();
        } else if (searchType === 'company_name') {
            searchByCompanyName();
        }
    });
});

