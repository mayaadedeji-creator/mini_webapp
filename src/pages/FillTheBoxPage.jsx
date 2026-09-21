import { useNavigate } from 'react-router-dom';

export default function FillTheBoxPage() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Fill The Box Page</h1>
      <p>Scollable list of package items will go here</p>
      <button onClick={() => navigate('/arrival')}>Finish and preview package</button>
    </div>
  );
}