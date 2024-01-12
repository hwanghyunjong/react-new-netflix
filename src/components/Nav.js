import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
    const [show, setShow] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                setShow(true);
            } else {
                setShow(false);
            }
        });

        return () => {
            window.removeEventListener("scroll", () => {});
        }
    }, []);
    

    const handleChange = (e) => {
        setSearchValue(e.target.value);
        navigate(`/search?q=${e.target.value}`);
    }


    return (
        <nav className={show ? 'nav nav__black' : 'nav'}>
            <img alt='netflix logo' 
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/220px-Netflix_2015_logo.svg.png'
                className='nav__logo'
                onClick={() => window.location.reload()} />

            <input 
                value={searchValue} 
                onChange={handleChange} 
                className='nav__input' 
                type='text' 
                placeholder='Search Movie' />

            <img alt='User logged' 
                src='https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-88wkdmjrorckekha.jpg'
                className='nav__avatar'/>
        </nav>
    )
}


export default Nav;