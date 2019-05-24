import * as React from 'react';
import { IState, IPlaylistState } from 'src/reducers';
import { connect } from 'react-redux';
import CategorySearch from './category-search';
import SongSearch from '../song-search';
import ArtistSearch from './artist-search';
import { Song } from 'src/models/Song';
import { Category } from 'src/models/Category';
import { Artist } from 'src/models/Artist';
import * as playlistActions from 'src/actions/playlist/playlist-actions';
import { Row, Col } from 'reactstrap';
import SearchChip from '../search-chip';
import { Playlist } from 'src/models/Playlist';
import PlaylistCard from 'src/components/reusable-components/playlist-card/card';

interface IProps extends IPlaylistState {
    addSongForSearch: (songForSearch: Song) => void;
    advancedSearch: (spotifyTrackIds: string[], spotifyArtistIds: string[], categoryNames: string[]) => void;
    removeArtistForSearch: (spotifyArtistId: string) => void;
    removeCategoryForSearch: (categoryName: string) => void;
    removeSongForSearch: (spotifyTrackId: string) => void;
}

export class AdvancedSearchContainer extends React.Component<IProps, any> {
    public constructor(props: IProps) {
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
            <div className='search-container advanced-search-container'>
                <CategorySearch />
                <Row>
                    <Col xs={9} sm={10} lg={11}>
                        <Row>
                            {
                                this.props.categoriesForSearch.map((categoryForSearch: Category) => {
                                    return (
                                        <Col sm={4} key={categoryForSearch.name}>
                                            <SearchChip
                                                dataToDisplay={categoryForSearch.name}
                                                removeFunction={this.props.removeCategoryForSearch}
                                                uniqueIdentifier={categoryForSearch.name}
                                            />
                                        </Col>
                                    );
                                })
                            }
                        </Row>
                    </Col>
                </Row>
                <SongSearch songFunction={this.props.addSongForSearch} songs={this.props.songsForSearch} />
                <Row>
                    <Col xs={9} sm={10} lg={11}>
                        <Row>
                            {
                                this.props.songsForSearch.map((songForSearch: Song) => {
                                    return (
                                        <Col sm={4} key={songForSearch.spotifyTrackId}>
                                            <SearchChip
                                                dataToDisplay={`${songForSearch.name} by ${songForSearch.artistName}`}
                                                removeFunction={this.props.removeSongForSearch}
                                                uniqueIdentifier={songForSearch.spotifyTrackId}
                                            />
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </Col>
                </Row>
                <ArtistSearch />
                <Row>
                    <Col xs={9} sm={10} lg={11}>
                        <Row>
                            {
                                this.props.artistsForSearch.map((artistForSearch: Artist) => {
                                    return (
                                        <Col sm={4} key={artistForSearch.spotifyArtistId}>
                                            <SearchChip
                                                dataToDisplay={artistForSearch.artistName}
                                                removeFunction={this.props.removeArtistForSearch}
                                                uniqueIdentifier={artistForSearch.spotifyArtistId}
                                            />
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} className='search-button-container'>
                        <button onClick={this.advancedSearch}> Search </button>
                    </Col>
                </Row>
                {
                    (this.props.advancedSearchResults.length) ?
                        <Row>
                            {
                                this.props.advancedSearchResults.map((playlist: Playlist) => {
                                    return (
                                        <Col xs={12} md={6} key={playlist.id} className='playlist-card-container'>
                                            <PlaylistCard playlist={playlist} />
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                        :
                        null
                }
            </div>
        );
    }
}

const mapStateToProps = (state: IState) => (state.playlist);
const mapDispatchToProps = {
    addSongForSearch: playlistActions.addSongForSearch,
    advancedSearch: playlistActions.advancedSearch,
    removeArtistForSearch: playlistActions.removeArtistForSearch,
    removeCategoryForSearch: playlistActions.removeCategoryForSearch,
    removeSongForSearch: playlistActions.removeSongForSearch
}
export default connect(mapStateToProps, mapDispatchToProps)(AdvancedSearchContainer);