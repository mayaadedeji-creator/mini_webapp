import { useNavigate } from 'react-router-dom';
import { usePackage } from '../context/PackageContext';
import BoxDisplay from '../components/BoxDisplay';
import MailLabel from '../components/MailLabel.jsx';
import './OpeningPage.css';

// Long enough for "Grandma & Grandpa Johnson"; the label fits about two lines.
const NAME_MAX = 30;

export default function OpeningPage() {
  const navigate = useNavigate();
  const { to, setTo, from, setFrom } = usePackage();
  const ready = to.trim() !== '' && from.trim() !== '';

  return (
    <>
      <div className="in-box-1">
        <h1>Opening Page</h1>
      </div>

      <div className="in-box-2">
        <BoxDisplay state="open" label={{ to, from }} />
      </div>

      <div className="in-box-3 label-panel">
        <MailLabel to={to} from={from} />

        <label className="label-field">
          To
          <input
            value={to}
            onChange={(e) => setTo(e.target.value)}
            maxLength={NAME_MAX}
            placeholder="Who's it for?"
            autoFocus
          />
        </label>

        <label className="label-field">
          From
          <input
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            maxLength={NAME_MAX}
            placeholder="Who's sending it?"
          />
        </label>

        <button className="page-button" disabled={!ready} onClick={() => navigate('/fill-the-box')}>
          Next
        </button>
      </div>
    </>
  );
}
