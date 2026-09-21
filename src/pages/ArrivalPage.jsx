import { useNavigate } from 'react-router-dom';

export default function ArrivalPage() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Arrival Page</h1>
      <p>Click to open / reveal animation goes here</p>
      <button onClick={() => navigate('/')}>Make your own</button>
    </div>
  );
}