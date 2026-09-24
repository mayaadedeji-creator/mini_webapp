import { useNavigate } from 'react-router-dom';
import BoxDisplay from '../components/BoxDisplay';

export default function ArrivalPage() {
  const navigate = useNavigate();
  return (
    <>
      <div className="in-box-1">
        <h1>Arrival Page</h1>
        <p>Click to open / reveal animation goes here</p>
      </div>

      <div className="in-box-2">
        <BoxDisplay state="closed" />
      </div>

      <div className="in-box-3">
        <button onClick={() => navigate('/')}>Make your own</button>
      </div>
    </>
  );
}