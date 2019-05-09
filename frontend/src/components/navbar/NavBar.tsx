import * as React from 'react';
import { FaBars, FaMusic } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface INavBarState {
    showDropdown: boolean;
}

export default class NavBar extends React.Component<any, INavBarState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            showDropdown: false
        }
    }

    public links = () => {
        return (
            <>
                <Link to='/my-profile'> My Profile </Link>
                <Link to='/create-playlist'> Create Playlist </Link>
                <Link to='/browse'> Browse </Link>
            </>
        )
    }

    public toggle = () => {
        this.setState((prevState: INavBarState) => ({
            showDropdown: !prevState.showDropdown
        }));
    }

    public render() {
        return (
            <>
                <div className='nav'>
                    <div className='logo-and-menu-container'>
                        <div className='links-container'>
                            <div className='logo'>
                                <Link to='/'>
                                    <FaMusic />
                                </Link>
                            </div>
                            <div className='hide-on-mobile'>
                                {this.links()}
                            </div>
                        </div>
                        <div
                            className='hamburger-menu-container'
                            onClick={this.toggle}
                        >
                            <FaBars />
                        </div>
                    </div>
                    <div className={(this.state.showDropdown) ? 'dropdown-links' : 'dropdown-links no-height'}>
                        {this.links()}
                    </div>
                </div>
            </>
        )
    }
}