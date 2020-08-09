import React from 'react';
import './Header.css';
import Menu from './Menu'

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null
        }
        this.menus = [
            new Menu(1, 'Home', '/Home', ''),
            new Menu(2, 'About', '/About', '')
        ]
        this.menuItems = [];
        this.createMenuItems();
    }

    createMenuItems() {
        for (const menu of this.menus) {
            const item = 
            <li key={menu.id} className='menu-item'>
                <a className='smoothScroll' href={menu.url}>
                    <i className='fa fa-user'></i>
                    {menu.text}
                </a>
                </li>
            this.menuItems.push(item);
        }
    }

    componentDidMount() {
        // this.createMenuItems();
    }

    render() {
        return (
            <nav className="navbar navbar-expand-xl navbar-light bg-light">
                <a className="navbar-brand" href="#">Navbar</a>
            </nav>
        );
    }
}

export default Header;
