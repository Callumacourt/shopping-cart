import { Link } from 'react-router-dom';
import styles from '../Header/header.module.css';

export default function Dropdown({ matches }) {
  return (
    <div className={styles.dropdown}>
      {matches.map((match) => (
        <div key={match.id}>
          <Link to={`/product/${match.id}`}>
            <h1>{match.title}</h1>
          </Link>
        </div>
      ))}
    </div>
  );
}
