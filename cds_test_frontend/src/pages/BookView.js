import React, { useEffect, useRef, useState, useCallback, forwardRef  } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import HTMLFlipBook from 'react-pageflip';
import styled from 'styled-components';


const Page = forwardRef((props, ref) => {
  return (
    <div 
      className="page" 
      ref={ref} 
      
    >
      <div className="page-content" style={{width: '100%', height: '100%' }}>
        <img 
          src={props.src} 
          alt="" 
          className="page-image" 
          style={{ objectFit: 'fill', width: '100%', height: '100%' }}
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
  const inputRef = useRef();

  const [pages, setPages] = useState();
  let imgPaths = [];



  useEffect(() => {
    const fetchData = async () => {
      const paths = await getBook(bookName);
      imgPaths = Object.values(paths);
      setPages(imgPaths.map((image, index) => (
      <Page key={index} src={`http://localhost:5000/fetch_file/${image.file_path}`} />
      )));
    };
    fetchData();

    
   
    
  }, [bookName, flipBook]);



  const onPage = useCallback((e) => {
        console.log('Current page: ' + e.data);
    }, []);
  
  const setCurrentPage = (e) => {
    e.preventDefault();
    const p = parseInt(inputRef.current.value)>pages.length ? pages.length:parseInt(inputRef.current.value);
    console.log(p);

    flipBook.current.pageFlip().turnToPage(p-1);
  }
  

  return (
		<div className='flipbook-wrapper'>
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
      onInit={() => {
      flipBook.current.pageFlip().turnToPage(startPage-1);
      }}
			className="demo-book"
			ref={flipBook}
			>
    {pages}
      
			</HTMLFlipBook>
      
      <form onSubmit={setCurrentPage} style={{position: 'fixed', bottom: '15px', right: '15px', gap: "10px", margin: '10px'}}>
          <div style={{flexDirection: "row", display: 'flex',  marginLeft: "80px"}}>
              <input ref={inputRef} className="form-control" type='text' placeholder="Go to page"/>  
              <button className="btn btn-primary" type="submit"> Go </button>
          </div>
      </form>

		</div>
  );
};

const BookView = () => {
  return (
    <Book/>
  );
};

export default BookView;
