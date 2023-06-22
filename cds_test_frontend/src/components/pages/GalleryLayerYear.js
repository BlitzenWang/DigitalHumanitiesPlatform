import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Canvas = styled.div`
  background-color: rgba(113, 165, 189, 1);
  min-height: 100vh; 
`;

const Cover = styled.img`
  height: 420px;
  width: 272px;
  object-fit: cover;
  align-self: stretch;
  margin: 0px;
`;

const CustomText = styled('div')(({ theme }) => ({
  textAlign: `center`,
  whiteSpace: `pre-wrap`,
  fontSynthesis: `none`,
  color: `rgba(47, 47, 47, 1)`,
  fontStyle: `normal`,
  fontFamily: `Montserrat`,
  fontWeight: `500`,
  fontSize: `20px`,
  letterSpacing: `0px`,
  textDecoration: `none`,
  lineHeight: `25px`,
  textTransform: `none`,
  alignSelf: `stretch`,
  margin: `6px 0px 0px 0px`,
}));

function Magazine({ coverImage, name, year }) {
  	return (
    	<div>
			<a href= {`http://localhost:3000/Gallery/${name}/${year}`} >
				<Cover src={coverImage} loading="lazy" alt={'Cover'} />
			</a>
			
			<CustomText>{year}</CustomText>
    	</div>
  	);
}

const MagazineContainer = styled('div')({
  	display: 'grid',
  	gridTemplateColumns: 'repeat(4, 1fr)',
	paddingTop: '50px',
  	gridGap: '20px',  
});


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
	<Canvas>
		<MagazineContainer>
			{magazineData && magazineData.map((item, index) => (
				<Magazine key={index} coverImage={`http://localhost:5000/fetch_file/${item.file_path}`} name = {magazineName} year={item.issue_time} />
			))}
    	</MagazineContainer>
	</Canvas>
    	
  	);
}


export default GalaryLayerYear;