import React, { useState, useEffect } from 'react';
import { isNameValid, getLocations} from './mock-api/apis.js'
import logo from './logo.svg';
import './App.css';

function App() {
  const [name, setName] = useState('')
  const [nameValid, setNameValid] = useState(true)
  const [locations, setLocations] = useState([])
  const [location, setLocation] = useState('Canada')
  const [tableVals, setTableVals] = useState([])

  // Fetch the location when page loads and set to state var for later use
  useEffect(() => {
    const fetchData = async () => {
      const locationsGet = await getLocations()
      setLocations(locationsGet);
    }
  
    fetchData().catch(console.error);
  }, [])

  // On each change check if the name is valid and set state var to appropriate value
  const onNameChange = async (e) => {
    e.preventDefault();
    setName(e.target.value)
    const result = await isNameValid(e.target.value)
    setNameValid(result)
  }

  const onLocationChange = (e) => {
    e.preventDefault();
    setLocation(e.target.value)
  }

  const onAdd = (e) => {
    e.preventDefault();
    if (name && nameValid) {
      const val = {
        name: name,
        location: location
      }
      setTableVals([...tableVals, val])
      setName('')
      setLocation('Canada')
    }
  }

  const onClear = (e) => {
    e.preventDefault();
    setName('')
    setLocation('Canada')
    setTableVals([])
  }



  return (
    <div className="App">
      <div className="name-input">
        <div className="name">Name</div>
        <div className="input-error-box">
          <input className="input-field" value={name} onChange={onNameChange}></input>
          {!nameValid ? <div className="name-error">this name has already been taken</div> : null}
        </div>
      </div>
      <form className="location-input">
        <label className="name">Location</label>
        <select className="input-field" value={location} onChange={onLocationChange}>
          {locations.map(l => {
            return <option className="location-option" value={l}>{l}</option>
          })}
        </select>
      </form>
      <div className="add-clear">
        <button className="add" onClick={onAdd}>Add</button>
        <button onClick={onClear}>Clear</button>
      </div>
      <table className="table">
        <tr>
          <th className="table-header">Name</th>
          <th className="table-header">Location</th>
        </tr>
        {tableVals.map(tv => {
          return <tr className="table-row">
            <td className="table-cell">{tv.name}</td>
            <td className="table-cell">{tv.location}</td>
          </tr>
        })}
      </table>
    </div>
  );
}

export default App;
