import * as React from 'react';
import { IState, IPlaylistState } from 'src/reducers';
import { connect } from 'react-redux';
import * as playlistActions from 'src/actions/playlist/playlist-actions';
import SearchChip from '../search-chip';
import { Row, Col } from 'reactstrap';
import SongsTable from 'src/components/create-playlist/make-playlist/tables/table';
import { Artist } from 'src/models/Artist';
import ArtistSearch from '../artist-search';

interface IProps extends IPlaylistState {
    addArtistForMostFrequentSongsSearch: (artist: Artist) => void;
    getFrequentlyOccurringSongsWithGivenArtists: () => void;
    removeArtistForMostFrequentSongsSearch: (spotifyArtistId: string) => void;
}

export class MostFrequentlyOccurringSongsWithGivenArtists extends React.Component<IProps, any> {
    public constructor(props: IProps) {
        super(props);
    }

    public search = () => {
        if (this.props.artistsForMostFrequentSongsSearch.length) {
            this.props.getFrequentlyOccurringSongsWithGivenArtists();
        }
    }

    public render() {
        return (
            <div className='search-container'>
                <ArtistSearch
                    artistFunction={this.props.addArtistForMostFrequentSongsSearch}
                    artists={this.props.artistsForMostFrequentSongsSearch}
                />
                <Row>
                    {
                        this.props.artistsForMostFrequentSongsSearch.map((artist: Artist) => {
                            return (
                                <Col lg={6} key={artist.spotifyArtistId}>
                                    <SearchChip
                                        dataToDisplay={artist.artistName}
                                        removeFunction={this.props.removeArtistForMostFrequentSongsSearch}
                                        uniqueIdentifier={artist.spotifyArtistId}
                                    />
                                </Col>
                            )
                        })
                    }
                </Row>
                <Row>
                    <Col xs={12} className='search-button-container margin-bottom-10'>
                        <button onClick={this.search}> Search </button>
                    </Col>
                </Row>
                {
                    (this.props.mostFrequentSongsWithGivenArtistsSearchResults.length) ?
                        <SongsTable
                            songs={this.props.mostFrequentSongsWithGivenArtistsSearchResults}
                        />
                        :
                        null
                }
            </div>
        );
    }
}

const mapStateToProps = (state: IState) => (state.playlist);
const mapDispatchToProps = {
    addArtistForMostFrequentSongsSearch: playlistActions.addArtistForMostFrequentSongsSearch,
    getFrequentlyOccurringSongsWithGivenArtists: playlistActions.getFrequentlyOccurringSongsWithGivenArtists,
    removeArtistForMostFrequentSongsSearch: playlistActions.removeArtistForMostFrequentSongsSearch
}
export default connect(mapStateToProps, mapDispatchToProps)(MostFrequentlyOccurringSongsWithGivenArtists);