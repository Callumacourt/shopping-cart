import about1 from '../../assets/about1.jpg'
import awardImg from '../../assets/award.svg'
import globeImg from '../../assets/globe.svg'
import bagImg from '../../assets/shopping-bag.svg'
import initiative1 from '../../assets/initiative1.jpg'
import initiative2 from '../../assets/initiative2.jpg'
import styles from './About.module.css'

const About = () => {
  return (
    <>
    <div className={styles.contentWrapper}>
      <main>
        <section className = {styles.story1}>
          <div>
        <h2>Our story</h2>
        <p classname = {styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Duis vitae dolor libero. Proin eu ultrices mauris. Maecenas 
          auctor nisl eget nisl auctor auctor. Ut nec ultricies arcu, 
          a lobortis odio. Aenean lorem leo, tempor eget iaculis quis, 
          faucibus et sapien. Nulla condimentum libero pharetra cursus 
          euismod. Etiam ut fringilla quam. In efficitur imperdiet turpis, 
          non molestie justo luctus sit amet. Suspendisse tristique feugiat
          quam eget pulvinar. Fusce gravida quam vel eros eleifend accumsan. 
          Cras ut pellentesque odio, in faucibus turpis. Pellentesque aliquam 
          massa est, sed condimentum tortor ullamcorper nec. Nunc sagittis 
          vitae lorem a pellentesque.
        </p>
        </div>
        <div className={styles.imgContainer}>
          <img className = {styles.img} src={about1} alt="" />
        </div>
        <small className = {styles.small}>Tempus leo eu aenean</small>
        </section>
        <section className = {styles.story2}>
          <h3 className = {styles.header3}>Lorem ipsum dolor</h3>
          <p className = {styles.paragraph}>
            Sit amet consectetur adipiscing elit. 
            Quisque faucibus ex sapien vitae pellentesque sem placerat.
             In id cursus mi pretium tellus duis convallis. Tempus leo eu
              aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus
               nec metus bibendum egestas. Iaculis massa nisl malesuada 
               lacinia integer nunc posuere. Ut hendrerit semper vel 
               class aptent taciti sociosqu. Ad litora torquent per
                conubia nostra inceptos himenaeos.
          </p>
        </section>
        <section className = {styles.graphicSection}>
            <img src={bagImg} alt="a shopping bag logo" />
            <p>Sporting a stunningly vast catalogue of around 20 items</p>
            <img src={awardImg} alt="an award logo" />
            <p>Winner of best clothing ever of all time award</p>
            <img src={globeImg} alt="a globe image" />
            <p>Shipping worldwide, but not really</p>
        </section>
        <h4>Initiatives</h4>
        <section className = {styles.initiatives}>
          <div>
            <img src={initiative1} alt="" />
            <h3>Climate action</h3>
            <p>We're committed to reducing our environmental footprint. 
              From using recycled packaging to partnering with carbon-neutral 
              delivery services, every order helps support a cleaner planet. 
              We're also working toward sourcing more sustainable fabrics and
               minimizing waste across our production process.</p>
          </div>
          <div>
            <img src={initiative2} alt="" />
            <h3>Giving back to the community</h3>
            <p>We believe business should be a force for good. A portion of every 
              sale goes toward local community projects—whether it's supporting 
              youth programs, funding creative workshops, or donating essentials 
              to those in need. When you shop with us, you're helping build something better</p>
          </div>
        </section>
      </main>
    </div>
    </>
  );
};

export default About;
