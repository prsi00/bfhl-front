// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css';

const options = [
  { value: 'alphabets', label: 'Alphabets' },
  { value: 'numbers', label: 'Numbers' },
  { value: 'highestLowercase', label: 'Highest lowercase alphabet' }
];

function App() {
  const [inputValue, setInputValue] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [responseData, setResponseData] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      JSON.parse(inputValue); // Validate JSON
      setError('');

      const response = await axios.post('https://candid-frangipane-4e8b52.netlify.app/bfhl', JSON.parse(inputValue));

      const filteredData = filterResponseData(response.data);
      setResponseData(filteredData);
    } catch (err) {
      setError('Invalid JSON input');
      setResponseData('');
    }
  };

  const filterResponseData = (data) => {
    let filtered = {};
    if (selectedOptions.some(option => option.value === 'alphabets')) {
      filtered.alphabets = data.alphabets;
    }
    if (selectedOptions.some(option => option.value === 'numbers')) {
      filtered.numbers = data.numbers;
    }
    if (selectedOptions.some(option => option.value === 'highestLowercase')) {
      filtered.highestLowercase = data.highestLowercase;
    }
    return filtered;
  };

  return (
    <div className="App">
      <h1>Your Roll Number</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          value={inputValue}
          onChange={handleInputChange}
          placeholder='Enter JSON here...'
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      {error && <p className="error">{error}</p>}
      <Select
        isMulti
        options={options}
        onChange={handleSelectChange}
        className="Select"
      />
      <div className="response">
        <h2>Response Data:</h2>
        <pre>{JSON.stringify(responseData, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
