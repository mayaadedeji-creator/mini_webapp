import { useNavigate } from 'react-router-dom';

export default function OpeningPage() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Opening Page</h1>
      <button onClick={() => navigate('/fill-the-box')}>Next</button>
    </div>
  );
}
