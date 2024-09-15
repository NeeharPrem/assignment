# Revenue Analysis and Projection Application

This application analyzes customer order data to calculate revenue  and also provide projections for the upcoming months.

## Table of Contents
1. [Setup Instructions](#setup-instructions)
2. [Data Analysis and Projection Methods](#data-analysis-and-projection-methods)
3. [API Endpoints](#api-endpoints)
4. [Additional Features](#additional-features)
5. [Database Setup](#database-setup)
6. [Example API Responses](#example-api-responses)

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/NeeharPrem/assignment.git
   cd assignment
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up the database:
   - Ensure MySQL is installed and running on your system.
4. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables with your specific values:
     ```
     DB_USER= username
     DB_PASSWORD= password
     ```

5. Start the application:
   ```
   npm run dev
   ```

The server should now be running on `http://localhost:3000`.

This also starts front on `http://localhost:5173`.

## Data Analysis and Projection Methods

### Revenue Analysis
- Monthly revenue is calculated by summing the order amounts for each month.
- Revenue growth is determined by calculating the percentage change between consecutive months.

### Projection Methods
1. Linear Regression:
   - Fits a linear trend line to the historical data.
   - Projects future revenue based on the overall trend of the data.

## API Endpoints

1. GET `/api/revenue`
   - Retrieves monthly revenue data.
   - Query parameters: `startDate`, `endDate`
   - Example: `/api/revenue?startDate=2024-01-01&endDate=2024-12-31`

2. GET `/api/projection`
   - Provides revenue projections for the next three months.
   - Query parameters: `startDate`, `endDate`.
   - Example: `/api/projection?startDate=2024-01-01&endDate=2024-12-31&method=linearRegression`

3. GET `/api/topcustomers`
   - Retrieves top customers based on their purchase data.

## Additional Features

1. Customer Analysis:
   - Identifies top customers based on total order amount.

2. Data Export:
   - Allows exporting of revenue data to CSV format.
   - Endpoint: GET `/api/export-revenue`
   - Example: `/api/export-revenue?startDate=2024-01-01&endDate=2024-12-31`

3. Frontend Dashboard:
   - A simple dashboard to see the api result.
   - Access at the root URL: `http://localhost:5173`

## Database Setup

The `db.sql` file includes the following:

```sql
CREATE DATABASE revenue_analysis;
USE revenue_analysis;

CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    ordered_item VARCHAR(100) NOT NULL,
    order_amount DECIMAL(10, 2) NOT NULL,
    order_date DATE NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

-- Sample data insertion statements are included in the SQL file
```

## Example API Responses

1. Revenue Data:
```json
[
  {
    "month": "2024-06",
    "total_revenue": 300,
    "growth_rate": null
  },
  {
    "month": "2024-07",
    "total_revenue": 340,
    "growth_rate": 13.33
  },
  {
    "month": "2024-08",
    "total_revenue": 360,
    "growth_rate": 5.88
  },
  {
    "month": "2024-09",
    "total_revenue": 350,
    "growth_rate": -2.78
  },
  {
    "month": "2024-10",
    "total_revenue": 420,
    "growth_rate": 20
  },
  {
    "month": "2024-11",
    "total_revenue": 380,
    "growth_rate": -9.52
  },
  {
    "month": "2024-12",
    "total_revenue": 410,
    "growth_rate": 7.89
  }
]
```

2. Revenue Projection:
```json
[
  {
    "month": "2025-01",
    "projected_revenue": 432.86
  },
  {
    "month": "2025-02",
    "projected_revenue": 449.64
  },
  {
    "month": "2025-03",
    "projected_revenue": 466.43
  }
]
```

3. Top customers:
```json
[
  {
    "customer_name": "Jane Smith",
    "total_revenue": 800
  },
  {
    "customer_name": "Jhon Doe",
    "total_revenue": 800
  },
  {
    "customer_name": "Anil Rajeev",
    "total_revenue": 770
  },
  {
    "customer_name": "Bob Johnson",
    "total_revenue": 760
  },
  {
    "customer_name": "Nikhil",
    "total_revenue": 740
  }
]
```
