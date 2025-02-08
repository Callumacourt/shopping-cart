import { Link } from 'react-router-dom';

export default function Dropdown({ matches }) {
  return (
    <div>
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
