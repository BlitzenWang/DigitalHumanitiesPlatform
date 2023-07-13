import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './style.css';


function Magazine({ coverImage, name, year }) {
  return (
    <div>
      <a href={`http://localhost:3000/Gallery/${name}/${year}`}>
        <img className="Cover" src={coverImage} loading="lazy" alt="Cover" />
      </a>

      <div className="CustomText">{year}</div>
    </div>
  );
}


function GalaryLayerYear() {
  	const {magazineName} = useParams();
  	const [magazineData, setmagazineData] = useState();
	console.log(magazineName);
  	const fetchData = async () => {
		const response = await fetch(`http://localhost:5000/database/getMagazine?magazineName=${magazineName}&year=null&issue=null`);
		if (!response.ok) {
			throw new Error('fetch failed');
		}
		const data = await response.json();
		setmagazineData(data);
    };

    
    useEffect(() => {
      fetchData();
    }, []);

  	return (
	<div className="Canvas">
		<div className="MagazineContainer">
			{magazineData && magazineData.map((item, index) => (
				<Magazine key={index} coverImage={`http://localhost:5000/fetch_file/${item.file_path}`} name = {magazineName} year={item.issue_time} />
			))}
    	</div>
	</div>
    	
  	);
}


export default GalaryLayerYear;