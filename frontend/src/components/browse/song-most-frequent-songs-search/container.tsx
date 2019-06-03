import * as React from 'react';
import { IState, IPlaylistState } from 'src/reducers';
import { connect } from 'react-redux';
import { Song } from 'src/models/Song';
import * as playlistActions from 'src/actions/playlist/playlist-actions';
import SongSearch from '../song-search';
import SearchChip from '../search-chip';
import { Row, Col } from 'reactstrap';
import SongsTable from 'src/components/create-playlist/make-playlist/tables/table';

interface IProps extends IPlaylistState {
    addSongForMostFrequentSongsSearch: (song: Song) => void;
    getFrequentlyOccurringSongsWithGivenSongs: () => void;
    removeSongForMostFrequentSongsSearch: (spotifyTrackId: string) => void;
}

export class MostFrequentlyOccurringSongsWithGivenSongs extends React.Component<IProps, any> {
    public constructor(props: IProps) {
        super(props);
    }

    public search = () => {
        if (this.props.songsForMostFrequentSongsSearch.length) {
            this.props.getFrequentlyOccurringSongsWithGivenSongs();
        }
    }

    public render() {
        return (
            <div className='search-container'>
                <SongSearch songFunction={this.props.addSongForMostFrequentSongsSearch} songs={this.props.songsForMostFrequentSongsSearch} />
                <Row>
                    {
                        this.props.songsForMostFrequentSongsSearch.map((song: Song) => {
                            return (
                                <Col lg={6} key={song.spotifyTrackId}>
                                    <SearchChip
                                        dataToDisplay={`${song.name} by ${song.artistName}`}
                                        removeFunction={this.props.removeSongForMostFrequentSongsSearch}
                                        uniqueIdentifier={song.spotifyTrackId}
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
                    (this.props.mostFrequentSongsSearchResults.length) ?
                        <SongsTable
                            songs={this.props.mostFrequentSongsSearchResults}
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
    addSongForMostFrequentSongsSearch: playlistActions.addSongForMostFrequentSongsSearch,
    getFrequentlyOccurringSongsWithGivenSongs: playlistActions.getFrequentlyOccurringSongsWithGivenSongs,
    removeSongForMostFrequentSongsSearch: playlistActions.removeSongForMostFrequentSongsSearch
}
export default connect(mapStateToProps, mapDispatchToProps)(MostFrequentlyOccurringSongsWithGivenSongs);