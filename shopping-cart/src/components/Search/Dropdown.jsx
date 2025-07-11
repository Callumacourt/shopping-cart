import { Link} from 'react-router-dom';
import styles from './Search.module.css';

export default function Dropdown({setMobileExpanded = false, searchTerm, matches, setInput }) {

  const sliceMatch = (searchTerm, match) => {

    const lowerMatch = match.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`'~()]/g,"")
    const lowerSearch = searchTerm.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_'`~()]/g,"");
    const index = lowerMatch.indexOf(lowerSearch)

    if (index === -1) return [match, "", ""]

    return [
      match.slice(0, index),
      match.slice(index, index + searchTerm.length),
      match.slice(index + searchTerm.length)
    ]
  }

  const handleSearchSelect = () => {
    if (setMobileExpanded) setMobileExpanded(false);
    if (setInput) setInput('');
  }
  return (
    <div className={styles.dropdown}>
      {searchTerm.length >=3 && 
        matches.map((match) => {
          const [before, matchPart, after] = sliceMatch(searchTerm, match.title)
          return (
            <div key={match.id}>
              <Link to={`/product/${match.id}`}>
                <span onClick={handleSearchSelect}>
                  <h3>
                    {before}
                    <strong>{matchPart}</strong>
                    {after}
                  </h3>
                </span>
              </Link>
            </div>
          )
        })}
        </div>
        )
      }