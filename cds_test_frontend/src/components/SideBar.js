import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


function SideBar() {
  return (
    <div className="SideBar">
      <Dropdown />
      <TimeFilter />
    </div>
  );
}

export default SideBar;






function Dropdown() {
  const [selected, setSelected] = useState('');

  return (
    <select value={selected} onChange={e => setSelected(e.target.value)}>
      <option value="">Select an option</option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      {/* Add more options as required */}
    </select>
  );
}

function TimeFilter() {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const filter = () => {
    console.log(`${startTime} to ${endTime}`)
  };

  return (
    <div className="time-filter">
	 <div className="time-dropdowns">
      <select value={startTime} onChange={e => setStartTime(e.target.value)}>
        <option value="">Select start time</option>
        <option value="startTime1">Start Time 1</option>
        <option value="startTime2">Start Time 2</option>
        {/* Add more options as required */}
      </select>
      <select value={endTime} onChange={e => setEndTime(e.target.value)}>
        <option value="">Select end time</option>
        <option value="endTime1">End Time 1</option>
        <option value="endTime2">End Time 2</option>
        {/* Add more options as required */}
      </select>
	  </div>
      <button onClick={filter}>Filter</button>
    </div>
  );
}
