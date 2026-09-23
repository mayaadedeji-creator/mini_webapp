import { useNavigate } from 'react-router-dom';
import { usePackage } from '../context/PackageContext';

import letterIcon from '../assets/letter.svg';
import songIcon from '../assets/song.svg';
import photoIcon from '../assets/photo.svg';
import mapPinIcon from '../assets/map-pin.svg';
import affirmationIcon from '../assets/affirmation.svg';
import scratchOffIcon from '../assets/scratch-off-card.svg';
import voiceMemoIcon from '../assets/voice-memo.svg';
import drawingIcon from '../assets/drawing.svg';
import whyIcon from '../assets/why-im-sending-this.svg';
import recommendationIcon from '../assets/recommendation.svg';

const availableItems = [
  { id: 'letter', name: 'Letter', image: letterIcon },
  { id: 'song', name: 'Song', image: songIcon },
  { id: 'photo', name: 'Photo', image: photoIcon },
  { id: 'map-pin', name: 'Map Pin', image: mapPinIcon },
  { id: 'affirmation', name: 'Affirmation', image: affirmationIcon },
  { id: 'scratch-off', name: 'Scratch Off Card', image: scratchOffIcon },
  { id: 'voice-memo', name: 'Voice Memo', image: voiceMemoIcon },
  { id: 'drawing', name: 'Drawing', image: drawingIcon },
  { id: 'why', name: "Why I'm Sending This", image: whyIcon },
  { id: 'recommendation', name: 'Recommendation', image: recommendationIcon },
];

export default function FillTheBoxPage() {
  const navigate = useNavigate();
  const { items, addItem } = usePackage();

  return (
    <>
      <div className="in-box-1">
        <h1>Fill The Box Page</h1>
      </div>

      <div className="in-box-2">
        <h2>In your box:</h2>
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
        <button onClick={() => navigate('/arrival')}>
          Finish and preview package
        </button>
      </div>

      <div className="in-box-3">
        <div className="item-list">
          {availableItems.map((item) => (
            <button
              key={item.id}
              className="item-card"
              onClick={() => addItem(item)}
            >
              <div className="item-thumb">
                <img src={item.image} alt="" />
              </div>
              <span className="item-name">{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}