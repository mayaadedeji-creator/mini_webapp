import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PackageProvider } from './context/PackageContext';
import OpeningPage from './pages/OpeningPage';
import FillTheBoxPage from './pages/FillTheBoxPage';
import ArrivalPage from './pages/ArrivalPage';

function App() {
  return (
    <PackageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<OpeningPage />} />
          <Route path="/fill-the-box" element={<FillTheBoxPage />} />
          <Route path="/arrival" element={<ArrivalPage />} />
        </Routes>
      </BrowserRouter>
    </PackageProvider>
  );
}

export default App;