import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './style.css';



function Page({ bookName, image, page }) {
  	return (
    	<div>
		<a href = {`/book/${bookName}/page/${page}`}>
			<img className="Cover" src={image} loading="lazy" alt={'Cover'} />
		</a>
      	
      	<div className="CustomText">{page}</div>
    	</div>
  	);
}




function GalleryLayerPage() {
  	const {magazineName, year, issue} = useParams();
  	const [magazineData, setmagazineData] = useState();
	const bookname = magazineName.concat('_', year, '_', issue);
	console.log(bookname);

  	const fetchData = async () => {
		const response = await fetch(`http://localhost:5000/database/getMagazine?magazineName=${magazineName}&year=${year}&issue=${issue}`);
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
				<Page key={index} bookName = {bookname} image={`http://localhost:5000/fetch_file/${item.file_path}`} page={item.page_num} />
			))}
			</div>
		</div>
  	);
}


export default GalleryLayerPage;