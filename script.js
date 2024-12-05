// Retrieve employee data from localStorage (if any)
let employees = JSON.parse(localStorage.getItem('employees')) || [];

// Function to render employees
// Function to render employees
function renderEmployees(filteredEmployees = employees) {
    const employeeList = document.getElementById('employeeList');
    employeeList.innerHTML = ''; // Clear the table before rendering

    filteredEmployees.forEach((employee, index) => {
        const row = document.createElement('tr');
        row.classList.add('show'); // Add class to trigger animation
        row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.position}</td>
            <td>${employee.salary}</td>
            <td>
                <button class="edit" onclick="editEmployee(${index})">Edit</button>
                <button class="delete" onclick="deleteEmployee(${index})">Delete</button>
            </td>
        `;
        employeeList.appendChild(row);
    });
}


// Function to add a new employee
function addEmployee() {
    const name = document.getElementById('employeeName').value;
    const position = document.getElementById('employeePosition').value;
    const salary = document.getElementById('employeeSalary').value;

    if (!name || !position || !salary) {
        alert('All fields are required!');
        return;
    }

    // Add new employee to array
    employees.push({ name, position, salary });

    // Save updated employee list to localStorage
    localStorage.setItem('employees', JSON.stringify(employees));

    // Clear the form inputs
    document.getElementById('employeeName').value = '';
    document.getElementById('employeePosition').value = '';
    document.getElementById('employeeSalary').value = '';

    // Re-render the employee table
    renderEmployees();
}

// Function to delete an employee
function deleteEmployee(index) {
    // Remove the employee from the array
    employees.splice(index, 1);

    // Save updated employee list to localStorage
    localStorage.setItem('employees', JSON.stringify(employees));

    // Re-render the employee table
    renderEmployees();
}

// Function to edit an employee
function editEmployee(index) {
    const employee = employees[index];
    
    // Pre-fill the form with employee data for editing
    document.getElementById('employeeName').value = employee.name;
    document.getElementById('employeePosition').value = employee.position;
    document.getElementById('employeeSalary').value = employee.salary;

    // Change the Add button to Update button
    const addButton = document.querySelector('button');
    addButton.textContent = 'Update Employee';
    addButton.onclick = function() {
        updateEmployee(index);
    };
}

// Function to update an employee
function updateEmployee(index) {
    const name = document.getElementById('employeeName').value;
    const position = document.getElementById('employeePosition').value;
    const salary = document.getElementById('employeeSalary').value;

    if (!name || !position || !salary) {
        alert('All fields are required!');
        return;
    }

    // Update employee data
    employees[index] = { name, position, salary };

    // Save updated employee list to localStorage
    localStorage.setItem('employees', JSON.stringify(employees));

    // Re-render the employee table
    renderEmployees();

    // Reset the form
    document.getElementById('employeeName').value = '';
    document.getElementById('employeePosition').value = '';
    document.getElementById('employeeSalary').value = '';

    // Change the Update button back to Add
    const addButton = document.querySelector('button');
    addButton.textContent = 'Add Employee';
    addButton.onclick = addEmployee;
}

// Function to retrieve employees based on search input
function retrieveEmployees() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();

    // Filter employees based on search term (matching name or position)
    const filteredEmployees = employees.filter(employee => 
        employee.name.toLowerCase().includes(searchTerm) || 
        employee.position.toLowerCase().includes(searchTerm)
    );

    // Re-render the employee table with filtered results
    renderEmployees(filteredEmployees);
}

// Initial render of employee data
renderEmployees();
