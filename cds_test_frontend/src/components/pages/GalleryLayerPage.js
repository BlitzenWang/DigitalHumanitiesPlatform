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

function Page({ image, page }) {
  	return (
    	<div>
      	<Cover src={image} loading="lazy" alt={'Cover'} />
      	<CustomText>{page}</CustomText>
    	</div>
  	);
}

const MagazineContainer = styled('div')({
  	display: 'grid',
  	gridTemplateColumns: 'repeat(4, 1fr)',
	paddingTop: '50px',
  	gridGap: '20px',  
});


function GalleryLayerPage() {
  	const {magazineName, year, issue} = useParams();
  	const [magazineData, setmagazineData] = useState();

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
		<Canvas>
			<MagazineContainer>
			{magazineData && magazineData.map((item, index) => (
				<Page key={index} image={`http://localhost:5000/fetch_file/${item.file_path}`} page={item.page_num} />
			))}
			</MagazineContainer>
		</Canvas>
  	);
}


export default GalleryLayerPage;