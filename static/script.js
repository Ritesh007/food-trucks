document.addEventListener('DOMContentLoaded', () => { // code runs only after the DOM is fully loaded
    const foodTrucksTableElement = $('#food-trucks-table'); // Select the table element for DataTables
    let foodTrucksTable = null; // Initialize the DataTables instance

    const zipcodeFilter = document.querySelector('#zipcode-filter'); // Select the ZIP code filter element
    const statusFilter = document.querySelector('#status-filter'); // Select the status filter element
    const applicantFilter = document.querySelector('#applicant-filter'); // Select the applicant filter element
    const facilityTypeFilter = document.querySelector('#facility-type-filter'); // Select the facility type filter element
    const clearFiltersButton = document.querySelector('#clear-filters'); // Select the clear filters button

    let data = []; // Initialize an array to store the fetched data

    // Fetch data from the API
    const fetchData = async () => {
        try {
            const response = await fetch('/api/food-trucks/list'); // Fetch data from the API endpoint
            data = await response.json(); // Parse the JSON response
            populateFilters(data); // Populate the filter dropdowns
            applyFilters(); // Apply filters to the data
        } catch (error) {
            console.error('Error fetching data:', error); // Log any errors
        }
    };

    // Populate filter dropdowns with unique values from the data
    const populateFilters = (data) => {
        const zipCodes = new Set(); // A collection of unique ZIP codes
        const statuses = new Set(); // A collection of unique statuses
        const applicants = new Set(); // A collection of unique applicants
        const facilityTypes = new Set(); // A collection of unique facility types
    
        data.forEach(truck => {
            zipCodes.add(truck['Zip Codes']); // Add ZIP code to the set
            statuses.add(truck.Status); // Add status to the set
            applicants.add(truck.Applicant); // Add applicant to the set
            facilityTypes.add(truck.FacilityType); // Add facility type to the set
        });
    
        // Populate the dropdowns with the unique values
        populateSelect(zipcodeFilter, Array.from(zipCodes), 'Select a Zip Code');
        populateSelect(statusFilter, Array.from(statuses), 'Select a Status');
        populateSelect(applicantFilter, Array.from(applicants), 'Select an Applicant');
        populateSelect(facilityTypeFilter, Array.from(facilityTypes), 'Select a Facility Type');
    };
    
    // Populate a select element with options
    const populateSelect = (selectElement, options, placeholderText) => {
        // Clear existing options
        selectElement.innerHTML = '';
        // Add placeholder option
        const placeholder = document.createElement('option');
        placeholder.value = '';
        placeholder.textContent = placeholderText;
        placeholder.disabled = true;
        placeholder.selected = true;
        selectElement.appendChild(placeholder);
        // Add new options
        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option;
            opt.textContent = option;
            selectElement.appendChild(opt);
        });
    };
    
    // Apply filters to the data and render the table
    const applyFilters = () => {
        // Get selected filter values
        const zipcode = Array.from(zipcodeFilter.selectedOptions).filter(option => option.value !== '').map(option => option.value);
        const status = Array.from(statusFilter.selectedOptions).filter(option => option.value !== '').map(option => option.value);
        const applicant = Array.from(applicantFilter.selectedOptions).filter(option => option.value !== '').map(option => option.value);
        const facilityType = Array.from(facilityTypeFilter.selectedOptions).filter(option => option.value !== '').map(option => option.value);
        // Filter data based on selected values
        const filteredData = data.filter(truck =>
            (!zipcode.length || zipcode.includes(String(truck['Zip Codes']))) &&
            (!status.length || status.includes(truck.Status)) &&
            (!applicant.length || applicant.includes(truck.Applicant)) &&
            (!facilityType.length || facilityType.includes(truck.FacilityType))
        );

        renderTable(filteredData);
    };

    // Render the table with data
    const renderTable = (data) => {
        if (foodTrucksTable) {
            foodTrucksTable.clear().rows.add(data).draw(); // Clear existing data and add new data (draw updates the display table)
        } else {
            // Initialize DataTables with the given data and column definitions
            foodTrucksTable = foodTrucksTableElement.DataTable({
                data: data,
                columns: [
                    { data: 'locationid', title: 'Location ID' },
                    { data: 'Applicant', title: 'Applicant' },
                    { data: 'FacilityType', title: 'Facility Type' },
                    { data: 'Zip Codes', title: 'Zip Code' },
                    { data: 'Status', title: 'Status' },
                    { data: 'FoodItems', title: 'Food Items' }
                ],
                paging: true, // Enable pagination
                searching: false // Disable the default search box
            });
        }
    };

    // Clear all filters and reapply them
    const clearFilters = () => {
        zipcodeFilter.selectedIndex = 0; // Reset ZIP code filter
        statusFilter.selectedIndex = 0; // Reset status filter
        applicantFilter.selectedIndex = 0; // Reset applicant filter
        facilityTypeFilter.selectedIndex = 0; // Reset facility type filter
        applyFilters(); // Reapply filters to the data
    };

     // Add event listeners to filter elements and clear button
    zipcodeFilter.addEventListener('change', applyFilters);
    statusFilter.addEventListener('change', applyFilters);
    applicantFilter.addEventListener('change', applyFilters);
    facilityTypeFilter.addEventListener('change', applyFilters);
    clearFiltersButton.addEventListener('click', clearFilters);

    fetchData(); // Fetch data and initialize the app
});
