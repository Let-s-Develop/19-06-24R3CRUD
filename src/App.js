import React, { useState } from 'react';
import './App.css';

function EmployeeTable() {
  const [employees, setEmployees] = useState([]);
  const [inputName, setInputName] = useState('');
  const [inputPosition, setInputPosition] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [filter, setFilter] = useState('');

  const addEmployee = () => {
    if (!inputName.trim() || !inputPosition.trim()) return;
    setEmployees([...employees, { id: Date.now(), name: inputName, position: inputPosition }]);
    setInputName('');
    setInputPosition('');
  };

  const editEmployee = (employee) => {
    setSelectedEmployee(employee);
    setInputName(employee.name);
    setInputPosition(employee.position);
  };

  const updateEmployee = () => {
    if (!inputName.trim() || !inputPosition.trim()) return;
    const updatedEmployees = employees.map(emp =>
      emp.id === selectedEmployee.id ? { ...selectedEmployee, name: inputName, position: inputPosition } : emp
    );
    setEmployees(updatedEmployees);
    setInputName('');
    setInputPosition('');
    setSelectedEmployee(null);
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(filter.toLowerCase()) ||
    emp.position.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Employee Table</h2>
      <input
        className="input-field"
        type="text"
        placeholder="Employee Name"
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
      />
      <input
        className="input-field"
        type="text"
        placeholder="Position"
        value={inputPosition}
        onChange={(e) => setInputPosition(e.target.value)}
      />
      {selectedEmployee ? (
        <>
          <button className="button" onClick={updateEmployee}>Update</button>
          <button className="button" onClick={() => setSelectedEmployee(null)}>Cancel</button>
        </>
      ) : (
        <button className="button" onClick={addEmployee}>Add Employee</button>
      )}
      <input
        className="input-field"
        type="text"
        placeholder="Filter by Name or Position"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.position}</td>
              <td>
                <button className="button" onClick={() => editEmployee(emp)}>Edit</button>
                <button className="button" onClick={() => deleteEmployee(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}



function App() {
  return (
    <div className="app">
      <EmployeeTable />
     
    </div>
  );
}

export default App;
