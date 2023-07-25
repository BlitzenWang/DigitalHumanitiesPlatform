import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';



function Magazine({ coverImage, name, issue_time }) {
  	return (
		<div>
			<img className="Cover" src={coverImage} loading="lazy" alt={'Cover'} />

			<div className="CustomText">{issue_time}</div>
			<div className="button-container">
				<button className="btn" onClick={() => handleButtonClickBook(name, issue_time)}>Flipbook</button>
				<button className="btn" onClick={() => handleButtonClickPage(name, issue_time)}>All Pages</button>
			</div>
		</div>
    	
    	
  	);
	
}

const handleButtonClickBook = (name, issue_time) => {
	window.location.href = `/book/${name}_${issue_time.replace("-", "_")}/page/1`;
};

const handleButtonClickPage = (name, issue_time) => {
	window.location.href = `/Gallery/${name}/${issue_time.replace("-", "/")}`;
};



function GalaryLayerIssues() {
  	const {magazineName, year} = useParams();
  	const [magazineData, setmagazineData] = useState();

  	const fetchData = async () => {
		const response = await fetch(`http://localhost:5000/database/getMagazine?magazineName=${magazineName}&year=${year}&issue=null`);
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
          <Magazine key={index} coverImage={`http://localhost:5000/fetch_file/${item.file_path}`} name = {magazineName} issue_time={item.issue_time} />
        ))}
      </div>

    </div>
);

}



export default GalaryLayerIssues;