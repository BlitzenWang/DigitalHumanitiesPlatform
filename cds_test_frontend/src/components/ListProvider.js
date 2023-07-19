import React, { createContext, useState, useEffect } from 'react';

export const ListContext = createContext({ list: [], setList: () => {} });

export const ListProvider = ({ children }) => {
  const [list, setList] = useState(() => {
    const savedList = localStorage.getItem("list");
    if (savedList) {
      return JSON.parse(savedList);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <ListContext.Provider value={{ list, setList }}>
      {children}
    </ListContext.Provider>
  );
};
