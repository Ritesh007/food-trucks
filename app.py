from flask import Flask, jsonify, render_template, request
import pandas as pd
import os
from flask_swagger_ui import get_swaggerui_blueprint

app = Flask(__name__)

# Swagger UI configuration
SWAGGER_URL = '/swagger'
API_URL = '/static/swagger.json'
SWAGGER_BLUEPRINT = get_swaggerui_blueprint(
    SWAGGER_URL, 
    API_URL,
    config = {
        'app_name': "Food Truck API"
    }
)

app.register_blueprint(SWAGGER_BLUEPRINT, url_prefix=SWAGGER_URL)

# Define the path to the CSV file
base_dir = os.path.dirname(__file__)
csv_file_path = os.path.join(base_dir, 'data', 'Mobile_Food_Facility_Permit.csv')

# Load the CSV data into a DataFrame
try:
    df = pd.read_csv(csv_file_path)
except FileNotFoundError:
    raise Exception(f"CSV file not found at path: {csv_file_path}")
except pd.errors.EmptyDataError:
    raise Exception("CSV file is empty")
except Exception as e:
    raise Exception(f"An error occurred while reading the CSV file: {e}")

# Function to convert NaN values to empty strings
def nan_to_empty(x):
    if pd.isna(x):
        return "None"
    return x

# Create a mapping of query parameter names to DataFrame column names
column_mapping = {
    'Zip_Codes': 'Zip Codes',
    'Status': 'Status',
    'Applicant': 'Applicant',
    'Facility_Type': 'FacilityType'
}

@app.route('/')
def index():
    # Render the index.html template for the root URL
    return render_template('index.html')

@app.route('/api/food-trucks/list', methods=['GET'])
def get_food_trucks():
    try:
        # Get query parameters
        query_params = request.args.to_dict()
        # Filter the DataFrame based on query parameters
        filtered_df = df
        for key, value in query_params.items():
            # Map the query parameter key to the DataFrame column name
            column_name = column_mapping.get(key, None)
            if column_name is None:
                return jsonify({'error': f"Invalid filtering parameter: {key}"}), 400
            
            # Handle special case for Zip Codes
            if column_name == 'Zip Codes':
                value = float(value) if '.' in value else int(value)
                filtered_df = filtered_df[filtered_df[column_name] == value]
            else:
                filtered_df = filtered_df[filtered_df[column_name].astype(str) == str(value)]
        
        # Convert NaN to empty strings and return the filtered data
        data = filtered_df.applymap(nan_to_empty).to_dict(orient='records')
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': f"An error occurred while processing the request: {e}"}), 500



if __name__ == '__main__':
    # Run the Flask app in debug mode
    app.run(debug=True)
