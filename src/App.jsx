import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PackageProvider } from './context/PackageContext';
import Layout from './components/Layout';
import OpeningPage from './Pages/OpeningPage';
import ArrivalPage from './Pages/ArrivalPage';
import FillTheBoxPage from './Pages/FillTheBoxPage';
import './App.css';


function App() {
  return (
    <PackageProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<OpeningPage />} />
            <Route path="/fill-the-box" element={<FillTheBoxPage />} />
            <Route path="/arrival" element={<ArrivalPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PackageProvider>
  );
}

export default App;