import React, { useState, useEffect } from 'react';

function App() {
  const [jsonInput, setJsonInput] = useState('{"data": ["L", "1", "335", "4", "C", "Z", "b"]}');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    
    document.title = "21BIT0177";
  }, []);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedJson = JSON.parse(jsonInput);

    
      if (!parsedJson.data) {
        throw new Error('Invalid JSON: Missing "data" key');
      }

      const res = await fetch('http://localhost:3000/bfhl', {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedJson),
      });

      if (!res.ok) {
        throw new Error('API request failed');
      }

      const data = await res.json();
      setResponse(data);
      setShowDropdown(true); 
      setError('');
    } catch (err) {
      setError(err.message);
      setResponse(null);
      setShowDropdown(false);
    }
  };

  const handleOptionChange = (e) => {
    const value = e.target.value;
    setSelectedOptions(
      selectedOptions.includes(value)
        ? selectedOptions.filter((option) => option !== value)
        : [...selectedOptions, value]
    );
  };

  const renderResponse = () => {
    if (!response) return null;

    const displayData = {};
    if (selectedOptions.includes('Numbers')) {
      displayData['Numbers'] = response.numbers.join(',');
    }
    if (selectedOptions.includes('Alphabets')) {
      displayData['Alphabets'] = response.alphabets.join(',');
    }
    if (selectedOptions.includes('Highest Lowercase Alphabet')) {
      displayData['Highest Lowercase Alphabet'] = response.highest_lowercase_alphabet.join(',');
    }

    return (
      <div>
        {Object.entries(displayData).map(([key, value]) => (
          <div key={key}>
            <strong>{key}:</strong> {value}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1>Your Roll Number</h1>

      <form onSubmit={handleSubmit}>
        <textarea
          rows="10"
          cols="50"
          value={jsonInput}
          onChange={handleInputChange}
          placeholder='Enter JSON e.g. { "data": ["L", "1", "335", "4", "C", "Z", "b"] }'
        />
        <button type="submit">Submit</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {showDropdown && response && (
        <div>
          <h2>Select Options to Display:</h2>
          <label>
            <input
              type="checkbox"
              value="Numbers"
              onChange={handleOptionChange}
            />
            Numbers
          </label>
          <label>
            <input
              type="checkbox"
              value="Alphabets"
              onChange={handleOptionChange}
            />
            Alphabets
          </label>
          <label>
            <input
              type="checkbox"
              value="Highest Lowercase Alphabet"
              onChange={handleOptionChange}
            />
            Highest Lowercase Alphabet
          </label>

          <h2>Response:</h2>
          {renderResponse()}
        </div>
      )}
    </div>
  );
}

export default App;
