import './BoxDisplay.css';
import openBox from '../assets/box/open-box.svg';
import closedBox from '../assets/box/closed-box.svg';

export default function BoxDisplay({ state = 'open' }) {
  const image = state === 'open' ? openBox : closedBox;

  return (
    <div className="box-display">
      <img src={image} alt={state === 'open' ? 'Open box' : 'Closed box'} />
    </div>
  );
}