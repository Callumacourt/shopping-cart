import { Link } from 'react-router-dom';
import styles from './Hero.module.css';
import Carousel from './Carousel';
import { useProducts } from '../../context/ProductContext';

const HomeHero = () => {
  const {setCategory} = useProducts()
  return (
    <>
      <section>
        <div className={styles.imageContainer}>
          <Carousel />
          <div className={styles.container}>
            <div className={styles.textWrapper}>
              <h3>Logoipsum</h3>
              <p>
                We create fashion that moves with you. Timeless, functional, and
                effortlessly refined. Thoughtfully designed, responsibly made,
                and always ahead of the curve.
              </p>
            </div>
            <div className={styles.buttons}>
              <Link to="/store">
                <button onClick={() => setCategory()}>Shop now</button>
              </Link>
              <Link to="/about">
                <button>Learn more</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.content}></section>
    </>
  );
};

export default HomeHero;
