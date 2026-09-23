import { createContext, useContext, useState } from 'react';

const PackageContext = createContext();

export function PackageProvider({ children }) {
  const [to, setTo] = useState('');
  const [from, setFrom] = useState('');
  const [items, setItems] = useState([]);

  const addItem = (item) => {
    setItems((prev) => {
      const alreadyIn = prev.some((i) => i.id === item.id);
      if (alreadyIn) {
        return prev.filter((i) => i.id !== item.id);
      }
      return [...prev, item];

});
  };

  const value = { to, setTo, from, setFrom, items, addItem };

    return (
    <PackageContext.Provider value={value}>
      {children}
    </PackageContext.Provider>
  );
}

export function usePackage() {
  return useContext(PackageContext);
}
