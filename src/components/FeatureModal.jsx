import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { getFeature } from '../features';
import './FeatureModal.css';

// The centered box that opens when you click a feature in the inventory.
// It holds a draft of the feature's data; nothing goes in the box until "Add to box".
export default function FeatureModal({ item, existing, onSave, onRemove, onClose }) {
  const feature = getFeature(item.id);
  const Editor = feature.Editor;
  const [draft, setDraft] = useState(existing?.data ?? feature.initialData);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const canSave = feature.isComplete(draft);

  return createPortal(
    <div className="feature-modal-backdrop" onClick={onClose}>
      <div
        className="feature-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="feature-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="feature-modal-header">
          <img src={item.image} alt="" className="feature-modal-icon" />
          <h2 id="feature-modal-title">{item.name}</h2>
          <button className="feature-modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>

        <div className="feature-modal-body">
          <Editor value={draft} onChange={setDraft} />
        </div>

        <footer className="feature-modal-footer">
          {existing && (
            <button className="feature-modal-remove" onClick={onRemove}>
              Remove from box
            </button>
          )}
          <button
            className="feature-modal-save"
            disabled={!canSave}
            onClick={() => onSave(draft)}
          >
            {existing ? 'Save changes' : 'Add to box'}
          </button>
        </footer>
      </div>
    </div>,
    document.body
  );
}
