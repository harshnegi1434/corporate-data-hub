# Corporate Data Hub

This web application provides functionalities to manage company data including adding, updating, and querying records. It is built using Python and Flask framework with SQLAlchemy for database management.

## Features

- **Search**: Search for companies by designation or company name.
- **Highest**: Get the highest salaries, ratings, or reported salaries for each designation.
- **Statistics**: View statistics of the company database through visualizations
- **Add/Update Records**: Add new records or update existing records in the database.

## Setup

1. Clone the repository:

    ```bash
    git clone <repository-url>
    ```

2. Navigate to the project directory:

    ```bash
    cd company-data-management
    ```

3. Install dependencies:

    ```bash
    pip install -r requirements.txt
    ```

4. Run the application:

    ```bash
    python app.py
    ```

5. Access the application in your web browser at `http://localhost:5000`.

## Usage

- Navigate to different pages using the provided links.
- Use the search functionality to find companies by designation or name.
- View highest salaries, ratings, or reported salaries for each designation.
- Add or update records in the database as needed.
- View the different visualization provided by analyzing the database

## Data Processing
- **Web Scraping:** The `Web_Scraping.ipynb` notebook contains code for scraping data from Glassdoor.
- **Data Transformation:** The `Data_Transformation.ipynb` notebook preprocesses the scraped data into usable csv file.

## Database
- The SQLite database `company_data.db` in the `instance/` directory stores the company data.

## Visualizations
- Visualizations are generated using Matplotlib, Seaborn, and WordCloud libraries.
- The generated images are stored in the `static/images/` directory.
