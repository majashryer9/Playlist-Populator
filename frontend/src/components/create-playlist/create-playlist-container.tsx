import * as React from 'react';
import { IState, IPlaylistState } from '../../reducers';
import CategoriesContainer from './categories/categories-container';
import { connect } from 'react-redux';
import SongsContainer from './songs/songs-container';

interface ICreatePlaylistContainerState {
    showCategories: boolean
}

export class CreatePlaylistContainer extends React.Component<IPlaylistState, ICreatePlaylistContainerState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            showCategories: true
        }
    }

    public showSongs = () => {
        this.setState({
            ...this.state,
            showCategories: false
        })
    }

    public render() {
        return (
            <div>
                {
                    (this.state.showCategories) ? <CategoriesContainer showSongs={this.showSongs} />
                        : <SongsContainer />
                }
            </div>
        )
    }
}

const mapStateToProps = (state: IState) => (state.playlist);
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(CreatePlaylistContainer);