import * as React from 'react';
import { FaBars } from 'react-icons/fa';
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
                <Link to='/home'> Home </Link>
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
                    <div className='links-container'>
                        {this.links()}
                    </div>
                    <div
                        className='hamburger-menu-container'
                        onClick={this.toggle}
                    >
                        <FaBars />
                    </div>
                    {
                        this.state.showDropdown ?
                            <div className='dropdown-links'>
                                {this.links()}
                            </div>
                            : null
                    }
                </div>
            </>
        )
    }
}