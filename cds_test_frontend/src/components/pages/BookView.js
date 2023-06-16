import React, { useEffect, useRef, useState, useCallback, forwardRef  } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import HTMLFlipBook from 'react-pageflip';
import BookClass from '../BookClass';

const Page = forwardRef((props, ref) => {
  return (
    <div 
      className="page" 
      ref={ref} 
      style={{ transform: `scale(${props.zoom})` }}
    >
      <div className="page-content">
        <img 
          src={props.src} 
          alt="" 
          className="page-image" 
          style={{ objectFit: 'contain', width: '93%', height: '93%' }}
        />
      </div>
    </div>
  );
});



const getBook = async (bookName) => {
  const response = await fetch(`http://localhost:5000/database/getBook?bookName=${bookName}`);
  if (!response.ok) {
    throw new Error('fetch failed');
  }
  const data = await response.json();
  return data;
};

const Book = () => {
  const { bookName, startPage } = useParams();
  const flipBook = useRef();
  const [pages, setPages] = useState();
  let imgPaths = [];



  useEffect(() => {
    const fetchData = async () => {
      const paths = await getBook(bookName);
      imgPaths = Object.values(paths);
      console.log(imgPaths[0].file_path)
      setPages(imgPaths.map((image, index) => (
      <Page key={index} src={`http://localhost:5000/fetch_file/${image.file_path}`} />
      )));
    };
    fetchData();

    
    console.log(flipBook.current.pageFlip());
    if (flipBook.current.pageFlip()) {
      flipBook.current.pageFlip().turnToPage(startPage);
    }
    
    
  }, [bookName, flipBook]);

  const [zoom, setZoom] = useState(1);

  const toggleZoom = () => {
    setZoom(zoom === 1 ? 2 : 1);
  }

  useEffect(() => {
    {imgPaths.map((image, index) => (
          <Page key={index} src={`http://localhost:5000/fetch_file/${image.file_path}`} zoom={zoom} />
      ))}
  }, [zoom])

  const onPage = useCallback((e) => {
        console.log('Current page: ' + e.data);
    }, []);
  
  
  

  return (
		<div>
			<HTMLFlipBook
			width={550}
			height={733}
			size="stretch"
			minWidth={315}
			maxWidth={1000}
			minHeight={400}
			maxHeight={1533}
			maxShadowOpacity={0.5}
			showCover={true}
			mobileScrollSupport={true}
			onFlip={onPage}
			className="demo-book"
			ref={flipBook}
			>

    {pages}
      
			</HTMLFlipBook>
      <button onClick={toggleZoom}>Zoom</button>

		</div>
  );
};

const BookView = () => {
  return (
    <div className="container">
      <Book/>
    </div>
  );
};

export default BookView;
