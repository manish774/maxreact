import React from 'react'
import classes from './Header.module.css'
const Header = () => {
    return (
        <header className={classes.header}>
            <a href="#default" class="logo">CompanyLogo</a>
            <div className={classes.headerright}>
                <a className="active" href="#home">Home</a>
                <a href="#contact">Contact</a>
                <a href="#about">About</a>
            </div>
        </header>
    )
}
export default Header;