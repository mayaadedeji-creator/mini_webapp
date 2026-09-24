import { useNavigate } from 'react-router-dom';
import BoxDisplay from '../components/BoxDisplay';

export default function OpeningPage() {
  const navigate = useNavigate();
  return (
    <>
      <div className="in-box-1">
        <h1>Opening Page</h1>
      </div>

      <div className="in-box-2">
        <BoxDisplay state="open" />
        {/* your to/from input fields will go here */}
      </div>

      <div className="in-box-3">
        <button onClick={() => navigate('/fill-the-box')}>Next</button>
      </div>
    </>
  );
}