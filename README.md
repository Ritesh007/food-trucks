# Food Truck

This project provides a Flask-based API to query food trucks data in San Francisco. It also includes a front-end UI to interact with the API and view the data.

## Features

- **API**:
    - **List all food trucks**: Get a comprehensive list of food trucks available in the dataset.
        - GET /api/food-trucks/list: Returns a list of all food trucks.
    - **Filtering**: Allow filtering based on key-value pairs.
        - GET /api/food-trucks/list?key1=value1&key2=value2: Returns a list of food trucks filtered by the specified key-value pairs.
    - Access the API documentation at http://127.0.0.1:5000/swagger for more details on API usage.
    
- **Front-end UI**:
    - **View Food Trucks**: Displays a table of food trucks with columns for Location ID, Applicant, Facility Type, Zip Code, Status, and Food Items.
    - **Filter Food Trucks**: Provides multi-select dropdown filters for Zip Codes, Status, Applicant, and Facility Type to filter the displayed food trucks.
    - **Clear Filters**: A button to clear all applied filters and reset the table.


## Running the application Locally

### Prerequisites

- Python 3.x

### Steps

1. Clone the repository to your local machine.
```sh
git clone https://github.com/yourusername/food-truck-api.git
cd food-trucks
```
2. Install the required dependencies:
```sh
pip install -r requirements.txt
```
3. Run the Flask application:
```sh
python app.py
```
4. Open your web browser and navigate to http://127.0.0.1:5000 to see the index page.
5. Access the API documentation at http://127.0.0.1:5000/swagger.



## Contribution Guide
We welcome contributions to the Food Truck project! To ensure a smooth and collaborative development process, please follow these guidelines when contributing code.
### Steps to Contribute
- Refer [Running the application Locally section](#running-the-application-locally) on how to setup the project locally.
- Write Unit Tests: For any new functionality or changes, write corresponding unit tests to ensure coverage.
    - Unit tests should be placed in the tests directory.
- Run Unit Tests: Run all unit tests to make sure your changes do not break existing functionality.
    - To run unit tests from project root: ```python -m unittest discover -s tests```
- Commit Changes: Commit your changes with a descriptive commit message.
- Push to your Changes to a feature branch and raise a pull request to the main branch.
- Your PR will be reviewed by project maintainers. Be prepared to make any necessary changes based on feedback.
- Once your PR is approved, it will be merged into the main branch.

## Future Improvements

### Continuous Integration (CI) with GitHub Actions
Implementing a CI pipeline using GitHub Actions ensures that code changes are automatically tested and validated before merging into the main branch. This helps maintain code quality and prevents the introduction of bugs.

### Hosting Backend on AWS Lambda
Deploy the Flask backend as an AWS Lambda function using AWS API Gateway. This ensures scalability and cost efficiency.

### Hosting Frontend on AWS S3
Host the static front-end files on AWS S3 and use AWS CloudFront for CDN distribution.

### IAC for infrastructure
IAC and pipeline to deploy the infrastructure.

## Deployment Pipeline
Create a deployment pipeline to automate the deployment process for different environments.

## Automated Release Versioning
Automate versioning and release creation.

## High availability
Ensure high availability by deploying the application in multiple AWS regions.

## Data moved to database
Instead of using a CSV file, move the data to a robust database for better performance, scalability, and data management.

## Disaster recovery
Utilize AWS RDS automated backups and snapshots to quickly restore the database in case of a failure.

## Monitoring
- Setup monitoring such as: availability, Performance, Error tracking, Resource utilization, Traffic.
- Implement an alerting mechanism to notify the team of any failures in the CI pipeline, backend errors, or frontend issues.
