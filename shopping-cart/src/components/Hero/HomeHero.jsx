import pianoImage1 from '../../assets/piano1.jpg';
import styles from './Hero.module.css';

const HomeHero = () => {
  return (
    <>
      <section>
        <div className={styles.container}>
          <h2>Play the sound of your dreams</h2>
          <p>
            Explore our handpicked selection of pianos, designed to inspire
            musicians of every level. From timeless classics to cutting-edge
            designs, your perfect piano is just a click away
          </p>
          <button>Shop now</button>
          <button>Learn more</button>
        </div>
        <div className={styles.imageContainer}>
          <img
            className={styles.heroImg}
            src={pianoImage1}
            alt="A grand piano"
          />
        </div>
      </section>
    </>
  );
};

export default HomeHero;
