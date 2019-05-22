import * as React from 'react';
import { FaTimes } from 'react-icons/fa';
import { IPlaylistState, IState } from 'src/reducers';
import { connect } from 'react-redux';
import * as playlistActions from 'src/actions/playlist/playlist-actions';

interface IProps extends IPlaylistState {
    typeOfSearch: 'category' | 'song' | 'artist';
    dataToDisplay: string;
    uniqueIdentifier: string;
    removeArtistForSearch: (spotifyArtistId: string) => void;
    removeCategoryForSearch: (categoryName: string) => void;
    removeSongForSearch: (spotifyTrackId: string) => void;
}

export class SearchChip extends React.Component<IProps, any> {
    public constructor(props: any) {
        super(props);
    }

    public remove = () => {
        const { typeOfSearch, uniqueIdentifier } = this.props;
        switch (typeOfSearch) {
            case 'category':
                this.props.removeCategoryForSearch(uniqueIdentifier);
            case 'song':
                this.props.removeSongForSearch(uniqueIdentifier);
            case 'artist':
                this.props.removeArtistForSearch(uniqueIdentifier);
        }
    }

    public render() {
        return (
            <div className='search-chip-container'>
                <FaTimes onClick={this.remove} />
                {this.props.dataToDisplay}
            </div>
        );
    }
}

const mapStateToProps = (state: IState) => (state.playlist);
const mapDispatchToProps = {
    removeArtistForSearch: playlistActions.removeArtistForSearch,
    removeCategoryForSearch: playlistActions.removeCategoryForSearch,
    removeSongForSearch: playlistActions.removeSongForSearch
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchChip);