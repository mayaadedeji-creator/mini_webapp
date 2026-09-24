import { useEffect, useState } from 'react';
import { fetchAffirmation } from './affirmations.js';

export default function AffirmationEditor({ value, onChange }) {
  const [loading, setLoading] = useState(!value.text);

  // Pull one in automatically the first time the modal opens.
  useEffect(() => {
    if (value.text) return;
    const controller = new AbortController();
    fetchAffirmation(controller.signal)
      .then((text) => {
        onChange({ text });
        setLoading(false);
      })
      .catch(() => {});
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const another = async () => {
    setLoading(true);
    onChange({ text: await fetchAffirmation() });
    setLoading(false);
  };

  return (
    <div className="feature-stack">
      <div className="affirmation-card">
        {loading ? <span className="feature-hint">Finding an affirmation…</span> : `“${value.text}”`}
      </div>
      <button type="button" className="feature-button secondary" onClick={another} disabled={loading}>
        ↻ Give me another
      </button>
    </div>
  );
}
