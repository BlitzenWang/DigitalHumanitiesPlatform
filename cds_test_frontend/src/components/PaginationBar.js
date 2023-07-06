import React from 'react';

function getCurrentPages(totalPages, currentPage) {
    let len = totalPages.length;
    let subArray;

    if (len <= 10) {
        return totalPages; // return original array if size <= 10
    } else {
        if (currentPage < 5) {
            subArray = totalPages.slice(0, 10);
        } else if (currentPage >= len - 5) {
            subArray = totalPages.slice(len - 10);
        } else {
            subArray = totalPages.slice(currentPage - 5, currentPage + 5);
        }
    }

    return subArray;
}

function PaginationBar({ totalPages, currentPage, onPageChange }) {
  totalPages = [...Array(totalPages).keys()].map(n => n + 1);
  const pages = getCurrentPages(totalPages, currentPage)
  const len = totalPages.length+1;



  return (
    <div className='pagination-container'>
      <button
            key={0}
            disabled={1 === currentPage}
            className={`pagination-button-direction ${1 === currentPage ? 'disabled' : ''}`}
            onClick={() => onPageChange(1)}
        >
          <span className={`pagination-button-direction-text`}>
                {'<<'}
          </span>
        </button>
      <button
            key={1}
            disabled={1 === currentPage}
            className={`pagination-button-direction ${1 === currentPage ? 'disabled' : ''}`}
            onClick={() => onPageChange(currentPage-1)}
        >
          <span className={`pagination-button-direction-text`}>
                {'<'}
          </span>
        </button>
      {pages.map(page => (
        <button
            key={page+2}
            disabled={page === currentPage}
            className={`pagination-button-page ${page === currentPage ? 'disabled' : ''}`}
            onClick={() => onPageChange(page)}
        >
            <span className={`pagination-button-number ${page === currentPage ? 'disabled' : ''}`}>
                {page}
            </span>
        </button>
      ))}
      <button
            key={len+1}
            disabled={len-1 === currentPage}
            className={`pagination-button-direction ${len-1 === currentPage ? 'disabled' : ''}`}
            onClick={() => onPageChange(currentPage+1)}
        >
          <span className={`pagination-button-direction-text`}>
                {'>'}
          </span>
        </button>
      <button
            key={len+2}
            disabled={len-1 === currentPage}
            className={`pagination-button-direction ${len-1 === currentPage ? 'disabled' : ''}`}
            onClick={() => onPageChange(len-1)}
        >
          <span className={`pagination-button-direction-text`}>
                {'>>'}
          </span>
        </button>
    </div>
  );
}

export default PaginationBar;
