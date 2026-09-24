import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePackage } from '../context/PackageContext';
import BoxDisplay from '../components/BoxDisplay';
import Modal from '../components/Modal.jsx';
import { getFeature } from '../features';
import './ArrivalPage.css';

export default function ArrivalPage() {
  const navigate = useNavigate();
  const { items, from } = usePackage();
  const [opened, setOpened] = useState(false);
  const [viewing, setViewing] = useState(null);
  const [seen, setSeen] = useState(() => new Set());

  const isEmpty = items.length === 0;
  const Viewer = viewing && getFeature(viewing.id).Viewer;

  const view = (item) => {
    setViewing(item);
    setSeen((prev) => new Set(prev).add(item.id));
  };

  let hint;
  if (isEmpty) hint = 'This box is empty.';
  else if (!opened) hint = 'Tap the box to open it';
  else if (seen.size < items.length) hint = `${items.length - seen.size} left to open`;
  else hint = "You've opened everything 💌";

  return (
    <>
      <div className="in-box-1">
        <h1>{from ? `A package from ${from}` : "You've got a package!"}</h1>
      </div>

      <div className="in-box-2 arrival-stage">
        {opened ? (
          <div className="arrival-box is-open">
            <BoxDisplay state="open" />
          </div>
        ) : (
          <button
            className="arrival-box is-closed"
            onClick={() => setOpened(true)}
            disabled={isEmpty}
            aria-label="Open the box"
          >
            <BoxDisplay state="closed" />
          </button>
        )}
        <p className="arrival-hint">{hint}</p>
      </div>

      <div className="in-box-3">
        {opened && (
          <div className="item-list">
            {items.map((item, index) => (
              <button
                key={item.id}
                className={`item-card arrival-item${seen.has(item.id) ? ' is-seen' : ''}`}
                style={{ animationDelay: `${index * 90}ms` }}
                onClick={() => view(item)}
              >
                <div className="item-thumb">
                  <img src={item.image} alt="" />
                </div>
                <span className="item-name">{item.name}</span>
              </button>
            ))}
          </div>
        )}
        <button className="arrival-make-own" onClick={() => navigate('/')}>
          Make your own
        </button>
      </div>

      {viewing && (
        <Modal title={viewing.name} icon={viewing.image} onClose={() => setViewing(null)}>
          <Viewer value={viewing.data} />
        </Modal>
      )}
    </>
  );
}
