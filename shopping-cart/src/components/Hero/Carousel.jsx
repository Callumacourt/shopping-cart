import { useState } from 'react';
import { default as hero1 } from '../../assets/hero1.jpg';
import { default as hero2 } from '../../assets/hero2.jpg';
import { default as hero3 } from '../../assets/hero3.jpg';
import { default as hero4 } from '../../assets/hero4.jpg';
import { default as hero5 } from '../../assets/hero5.jpg';

import styles from './Carousel.module.css';

export default function Carousel() {
  const images = [hero1, hero2, hero3, hero4, hero5];
  const [imgIndex, setImgIndex] = useState(0);

  const prevSlide = () => {
    setImgIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setImgIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className={styles.carousel} role='region' aria-label='Product image carousel'>
      <button
        className={styles.prevButton}
        onClick={prevSlide}
        aria-label="Previous Slide"
      >
        &lt;
      </button>
      <img
        src={images[imgIndex]}
        alt={`Slide ${imgIndex + 1}`}
        className={styles.carouselImage}
      />
      <button
        className={styles.nextButton}
        onClick={nextSlide}
        aria-label="Next Slide"
      >
        &gt;
      </button>
    </div>
  );
}
