import menu from '../../assets/menu.svg'
import x from '../../assets/x.svg'
import { useProducts } from '../../context/ProductContext'
import styles from './Header.module.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const NavDropdown = () => {
    const [expand, setExpand] = useState(false)
    const {setCategory} = useProducts()
    return (
        <>
            <img src={menu} className = {styles.header_icons} alt='A menu dropdown icons' onClick={() => {expand ? setExpand(false) : setExpand(true)}} />
            {expand && (
                <section className={styles.navDropdown}>
                <button onClick={() => {setExpand(false)}}>{<img src={x} alt='Close button X'/>}</button>
                <ul>
                    <Link to = '/store'>
                        <li onClick={() => {
                            setCategory(`men's clothing`)
                            setExpand(false)
                            }}>Mens
                            </li>
                    </Link>
                    <Link to= '/store'>
                        <li onClick={() => {
                            setCategory(`women's clothing`)
                            setExpand(false)
                        }}>Womens
                        </li>
                    </Link>
                    <Link to= '/about'>
                        <li onClick={() => {
                            setExpand(false)
                        }}>About Us</li>
                    </Link>
                    <Link to= '/cart'>
                        <li onClick={() => {
                            setExpand(false)
                        }}>Cart</li>
                    </Link>
                </ul>
                </section>
            )}
        </>
    )
}

export default NavDropdown