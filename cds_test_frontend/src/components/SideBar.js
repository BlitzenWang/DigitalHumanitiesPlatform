import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import caretIcon from './icons/dropdown-list-arrow.png'

function SideBar({years, filterSelectedMagazine, filterStartTime, filterEndTime}) {
  const [selectedMagazine, setSelectedMagazine] = useState('default');
  const [startTime, setStartTime] = useState('1950');
  const [endTime, setEndTime] = useState('1970');

  function Dropdown() {
    const [open, setOpen] = useState(false);
    const magazineNameMap = {
        "default": "Magazine",
        "RMHB": "人民画报",
        "JFJHB": "解放军画报",
        "MZHB": "民族画报"
    }

    return (
      <div className='dropdown-menu-magazine-container'>
        <div 
          className='dropdown-menu-magazine-frame' 
          onClick={() => setOpen(!open)}
        >
          <div className='dropdown-menu-magazine-text'>{magazineNameMap[selectedMagazine]}</div>
          <div className={`dropdown-arrow ${open ? 'open' : ''}`}>
            <img className='dropdown-arrow-image' src={caretIcon}/>
          </div>
        </div>
          <div className={`dropdown-menu-item-container ${open ? 'open' : ''}`}>
            <button 
              className='dropdown-menu-item'
              onClick={() => {setSelectedMagazine('RMHB'); setOpen(!open)}}
            > 
              <div className='dropdown-menu-item-text'>人民画报</div>
            </button>
            <button 
              className='dropdown-menu-item' 
              onClick={() => {setSelectedMagazine('JFJHB'); setOpen(!open)}}
            >
              <div className='dropdown-menu-item-text'>解放军画报</div>
            </button>
            <button 
              className='dropdown-menu-item' 
              onClick={() => {setSelectedMagazine('MZHB'); setOpen(!open)}}
            >
              <div className='dropdown-menu-item-text'>民族画报</div>
            </button>
          </div>
        
      </div>
    );
  }


  function TimeFilterDropdown({years, time, setTime}) {
    
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false);
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    return (
        <div className='dropdown-menu-time-container' ref={ref}>
          <div className='dropdown-menu-time-frame' onClick={() => setOpen(!open)}>
            <div className='dropdown-menu-time-text'>{time}</div>
            <div className={`dropdown-arrow ${open ? 'open' : ''}`}>
              <img className='dropdown-arrow-image' src={caretIcon}/>
            </div>
          </div>
          <div className={`dropdown-menu-item-container ${open ? 'open' : ''}`}>
            <div className='dropdown-menu-items-height-limiter'>
              {years.map(year => (
                <button 
                    className={"dropdown-menu-item"}
                    onClick={() => {
                    setTime(year);
                    setOpen(!open)}}
                >
                    <div className={"dropdown-menu-item-text"}>
                        {year}
                    </div>
                </button>
              ))}
            </div>
          </div>
        </div>

    );
}

  function TimeFilter({years}){

    return (
      <div className='dropdown-time-filter-container'>
        <div className='dropdown-time-text-container'>
          <div className='dropdown-time-text'>From</div>
          <div className='dropdown-time-text'>To</div>
        </div>

        <div className='dropdown-time-menu-container'>
          <TimeFilterDropdown years={years} time={startTime} setTime={setStartTime}/>
          <TimeFilterDropdown years={years} time={endTime} setTime={setEndTime}/>
        </div>
      </div>



    );

  }

  function FilterButton() {
    const filter = () => {
      filterSelectedMagazine(selectedMagazine);
      filterStartTime(startTime);
      filterEndTime(endTime);
    };
    return (
    <button className='dropdown-button-submit'
    onClick={filter}>
      <div className='dropdown-button-submit-text'>Filter</div>
    </button>
    );
  }

  return (
    <div className="sidebar-container">
      <Dropdown />
      <div className='dropdown-divider'/>
      <TimeFilter years={years}/>
      <div className='dropdown-divider'/>
      <FilterButton/>
    </div>
  );
}

export default SideBar;