import menu from '../../assets/menu.svg'
import x from '../../assets/x.svg'
import { useProducts } from '../../context/ProductContext'
import styles from './Header.module.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const NavDropdown = () => {
    const [expand, setExpand] = useState(false)
    const { setCategory } = useProducts()
    return (
        <>
            <img
                src={menu}
                className={styles.header_icons}
                alt='A menu dropdown icon'
                onClick={() => setExpand(!expand)}
            />
            {expand && (
                <nav className={styles.navDropdown} aria-label='Main Navigation'>
                    <button
                        onClick={() => setExpand(false)}
                        aria-label="Close navigation menu"
                    >
                        <img src={x} alt="" aria-hidden="true" />
                    </button>
                    <ul>
                        <li>
                            <Link
                                aria-label="Mens clothing"
                                to="/store"
                                onClick={() => {
                                    setCategory(`men's clothing`)
                                    setExpand(false)
                                }}
                                aria-current={window.location.pathname === '/store' ? "page" : undefined}
                            >
                                Mens
                            </Link>
                        </li>
                        <li>
                            <Link
                                aria-label="Womens clothing"
                                to="/store"
                                onClick={() => {
                                    setCategory(`women's clothing`)
                                    setExpand(false)
                                }}
                                aria-current={window.location.pathname === '/store' ? "page" : undefined}
                            >
                                Womens
                            </Link>
                        </li>
                        <li>
                            <Link
                                aria-label="Jewelery"
                                to="/store"
                                onClick={() => {
                                    setCategory(`jewelery`)
                                    setExpand(false)
                                }}
                                aria-current={window.location.pathname === '/store' ? "page" : undefined}
                            >
                                Jewelery
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/about"
                                onClick={() => setExpand(false)}
                                aria-current={window.location.pathname === '/about' ? "page" : undefined}
                            >
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/cart"
                                onClick={() => setExpand(false)}
                                aria-current={window.location.pathname === '/cart' ? "page" : undefined}
                            >
                                Cart
                            </Link>
                        </li>
                    </ul>
                </nav>
            )}
        </>
    )
}

export default NavDropdown