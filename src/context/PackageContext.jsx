import { createContext, useContext, useState } from 'react';

const PackageContext = createContext();

export function PackageProvider({ children }) {
  const [to, setTo] = useState('');
  const [from, setFrom] = useState('');
  const [items, setItems] = useState([]);

  const addItem = (item) => setItems((prev) => [...prev, item]);
  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  const value = { to, setTo, from, setFrom, items, addItem, removeItem };

  return (
    <PackageContext.Provider value={value}>
      {children}
    </PackageContext.Provider>
  );
}

export function usePackage() {
  return useContext(PackageContext);
}