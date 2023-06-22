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

function Magazine({ coverImage, name, issue_time }) {
  	return (
    	<div>
		<a href= {`http://localhost:3000/Gallery/${name}/${issue_time.replace("-", "/")}`} >
			<Cover src={coverImage} loading="lazy" alt={'Cover'} />
		</a>
      	
      	<CustomText>{issue_time}</CustomText>
    	</div>
  	);
}

const MagazineContainer = styled('div')({
  	display: 'grid',
  	gridTemplateColumns: 'repeat(4, 1fr)',
	paddingTop: '50px',
  	gridGap: '20px',  
});


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
		<Canvas>
			<MagazineContainer>
			{magazineData && magazineData.map((item, index) => (
				<Magazine key={index} coverImage={`http://localhost:5000/fetch_file/${item.file_path}`} name = {magazineName} issue_time={item.issue_time} />
			))}
			</MagazineContainer>
		</Canvas>
  	);
}


export default GalaryLayerIssues;