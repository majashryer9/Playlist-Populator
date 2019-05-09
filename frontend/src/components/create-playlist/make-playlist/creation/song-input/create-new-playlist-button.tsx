import * as React from 'react';
import { connect } from 'react-redux';
import { IPlaylistState, IState } from 'src/reducers';
import * as playlistActions from 'src/actions/playlist/playlist-actions';

interface IProps extends IPlaylistState {
    clearMostRecentlyAddedSong: () => void;
    clearPlaylistSongs: () => void;
    clearSuggestedSongs: () => void;
    setPopulated: (populated: boolean) => void;
}

export class CreateNewPlaylistButton extends React.Component<IProps, any> {

    public constructor(props: IProps) {
        super(props);
    }

    public clearEverything = () => {
        this.props.clearPlaylistSongs();
        this.props.clearSuggestedSongs();
        this.props.setPopulated(false);
        this.props.clearMostRecentlyAddedSong();
    }

    public render() {
        return (
            <div className='create-new-playlist-button-container'>
                <button
                    className='create-new-playlist-button'
                    onClick={this.clearEverything}
                >
                    CREATE NEW PLAYLIST
                </button>
            </div>
        )
    }
}

const mapStateToProps = (state: IState) => (state.playlist);
const mapDispatchToProps = {
    clearMostRecentlyAddedSong: playlistActions.clearMostRecentlyAddedSong,
    clearPlaylistSongs: playlistActions.clearPlaylistSongs,
    clearSuggestedSongs: playlistActions.clearSuggestedSongs,
    setPopulated: playlistActions.setPopulated
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateNewPlaylistButton);