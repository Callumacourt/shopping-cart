import menu from '../../assets/menu.svg'
import x from '../../assets/x.svg'
import styles from './Header.module.css'
import { useState } from 'react'

const NavDropdown = () => {
    const [expand, setExpand] = useState(false)
    return (
        <>
            <img src={menu} className = {styles.header_icons} alt='A menu dropdown icons' onClick={() => {expand ? setExpand(false) : setExpand(true)}} />
            {expand && (
                <section className={styles.navDropdown}>
                <button onClick={() => {setExpand(false)}}>{<img src={x} alt='Close button X'/>}</button>
                <ul>
                    <li>Mens</li>
                    <li>Womens</li>
                    <li>About Us</li>
                    <li>Cart</li>
                </ul>
                </section>
            )}
        </>
    )
}

export default NavDropdown