import clothing from '../../assets/clothing.jpg';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

const HomeHero = () => {
  return (
    <>
      <section>
        <div className={styles.imageContainer}>
          <img
            className={styles.heroImg}
            src={clothing}
            alt="alady dressed stylishly"
          />
        </div>
        <div className={styles.container}>
          <div className={styles.textWrapper}>
            <h3>Logoipsum</h3>
            <p>Revolutionising fashion</p>
          </div>
          <Link to={'/cart'}>
            <button>Shop now</button>
          </Link>
          <Link to={'/about'}>
            <button>Learn more</button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default HomeHero;
