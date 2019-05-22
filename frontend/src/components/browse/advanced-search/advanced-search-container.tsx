import * as React from 'react';
import { IState, IPlaylistState } from 'src/reducers';
import { connect } from 'react-redux';
import CategorySearch from './category-search';
import SongSearch from './song-search';
import ArtistSearch from './artist-search';
import { Song } from 'src/models/Song';
import { Category } from 'src/models/Category';
import { Artist } from 'src/models/Artist';
import * as playlistActions from 'src/actions/playlist/playlist-actions';
import { Container } from 'reactstrap';
import SearchChip from './search-chip';

interface IProps extends IPlaylistState {
    advancedSearch: (spotifyTrackIds: string[], spotifyArtistIds: string[], categoryNames: string[]) => void;
}

export class AdvancedSearchContainer extends React.Component<IProps, any> {
    public constructor(props: any) {
        super(props);
    }

    public advancedSearch = () => {
        const categoryNames = this.props.categoriesForSearch.map((categoryForSearch: Category) => categoryForSearch.name);
        const spotifyTrackIds = this.props.songsForSearch.map((songForSearch: Song) => songForSearch.spotifyTrackId);
        const spotifyArtistIds = this.props.artistsForSearch.map((artistForSearch: Artist) => artistForSearch.spotifyArtistId);
        this.props.advancedSearch(spotifyTrackIds, spotifyArtistIds, categoryNames);
    }

    public render() {
        return (
            <Container>
                <CategorySearch />
                {
                    this.props.categoriesForSearch.map((categoryForSearch: Category) => {
                        return (
                            <SearchChip
                                key={categoryForSearch.name}
                                typeOfSearch='category'
                                dataToDisplay={categoryForSearch.name}
                                uniqueIdentifier={categoryForSearch.name}
                            />
                        );
                    })
                }
                <SongSearch />
                {
                    this.props.songsForSearch.map((songForSearch: Song) => {
                        return (
                            <SearchChip
                                key={songForSearch.spotifyTrackId}
                                typeOfSearch='song'
                                dataToDisplay={songForSearch.name}
                                uniqueIdentifier={songForSearch.spotifyTrackId}
                            />
                        )
                    })
                }
                <ArtistSearch />
                {
                    this.props.artistsForSearch.map((artistForSearch: Artist) => {
                        return (
                            <SearchChip
                                key={artistForSearch.spotifyArtistId}
                                typeOfSearch='artist'
                                dataToDisplay={artistForSearch.artistName}
                                uniqueIdentifier={artistForSearch.spotifyArtistId}
                            />
                        )
                    })
                }
                <button onClick={this.advancedSearch}> Search </button>
            </Container>
        );
    }
}

const mapStateToProps = (state: IState) => (state.playlist);
const mapDispatchToProps = {
    advancedSearch: playlistActions.advancedSearch
}
export default connect(mapStateToProps, mapDispatchToProps)(AdvancedSearchContainer);