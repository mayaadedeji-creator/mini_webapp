import { useState } from 'react';
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
import BoxDisplay from '../components/BoxDisplay.jsx';
import FeatureModal from '../components/FeatureModal.jsx';

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
  const { items, saveItem, removeItem, to, from } = usePackage();
  const [activeItem, setActiveItem] = useState(null);

  const existing = activeItem && items.find((i) => i.id === activeItem.id);
  const closeModal = () => setActiveItem(null);

  return (
    <>
      <div className="in-box-1">
        <h1>Fill The Box Page</h1>
      </div>

      <div className="in-box-2">
      <BoxDisplay state="open" label={{ to, from }} />
    <button className="page-button" onClick={() => navigate('/arrival')}>
      Finish and preview package
  </button>
</div>


      <div className="in-box-3">
        <div className="item-list">
          {availableItems.map((item) => {
            const inBox = items.some((i) => i.id === item.id);
            return (
            <button
              key={item.id}
              className={`item-card${inBox ? ' is-in-box' : ''}`}
              onClick={() => setActiveItem(item)}
              aria-label={inBox ? `${item.name} (in your box)` : item.name}
            >
              {inBox && <span className="item-check" aria-hidden="true">✓</span>}
              <div className="item-thumb">
                <img src={item.image} alt="" />
              </div>
              <span className="item-name">{item.name}</span>
            </button>
            );
          })}
        </div>
      </div>

      {activeItem && (
        <FeatureModal
          key={activeItem.id}
          item={activeItem}
          existing={existing}
          onSave={(data) => {
            saveItem({ ...activeItem, data });
            closeModal();
          }}
          onRemove={() => {
            removeItem(activeItem.id);
            closeModal();
          }}
          onClose={closeModal}
        />
      )}
    </>
  );
}
