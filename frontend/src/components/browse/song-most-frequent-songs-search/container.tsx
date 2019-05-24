import * as React from 'react';
import { IState, IPlaylistState } from 'src/reducers';
import { connect } from 'react-redux';
import { Song } from 'src/models/Song';
import * as playlistActions from 'src/actions/playlist/playlist-actions';
import SongSearch from '../song-search';
import SearchChip from '../search-chip';
import { Row, Col } from 'reactstrap';

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
                                <Col sm={4} key={song.spotifyTrackId}>
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
                    <Col xs={12} className='search-button-container'>
                        <button onClick={this.search}> Search </button>
                    </Col>
                </Row>
                {
                    this.props.mostFrequentSongsSearchResults.map((song: Song) => {
                        return (
                            <div key={song.spotifyTrackId}>
                                {song.name}
                            </div>
                        )
                    })
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