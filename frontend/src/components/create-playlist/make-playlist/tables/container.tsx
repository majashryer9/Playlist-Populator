import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { connect } from 'react-redux';
import SongsTable from './table';
import { IPlaylistState, IState } from 'src/reducers';
import { Song } from 'src/models/Song';
import * as playlistActions from 'src/actions/playlist/playlist-actions';

interface IProps extends IPlaylistState {
    addSongToNewPlaylist: (song: Song) => void;
    addSongToSuggestedSongs: (song: Song) => void;
    populated: boolean;
    removeSongFromNewPlaylist: (song: Song) => void;
    removeSongFromSuggestedSongs: (song: Song) => void;
    setMostRecentlyAddedSong: (song: Song) => void;
}

export class TableContainer extends React.Component<IProps, {}> {
    public constructor(props: IProps) {
        super(props);
    }

    public add = (song: Song) => {
        const numSongsAlreadyAdded = this.props.newPlaylist.songs.length;
        if (numSongsAlreadyAdded < 5) {
            this.props.addSongToNewPlaylist(song);
            this.props.removeSongFromSuggestedSongs(song);
            this.props.setMostRecentlyAddedSong(song);
        }
        else {
            // set an error message 
        }
    }

    public removeFromNewPlaylistAndAddToSuggestedSongs = (song: Song) => {
        this.props.removeSongFromNewPlaylist(song);
        this.props.addSongToSuggestedSongs(song);
    }

    public render() {
        const songs = this.props.newPlaylist.songs;
        const suggestedSongs = this.props.suggestedSongs;
        const songsLength = songs.length;
        const suggestedSongsLength = suggestedSongs.length;
        const { populated } = this.props;
        return (
            <Container>
                <Row>
                    <Col
                        sm={12}
                        md={(populated) ? 12 : 6}
                        lg={(populated) ? { size: 8, offset: 2 } : 6}
                    >
                        {
                            (songsLength) ?
                                <SongsTable
                                    buttonClick={this.removeFromNewPlaylistAndAddToSuggestedSongs}
                                    icon={<FaTimes className='table-icon' />}
                                    includePopulateButton={true}
                                    songs={songs}
                                    tableLabel={'Your playlist: '}
                                />
                                :
                                null
                        }
                    </Col>
                    {
                        (suggestedSongsLength && !populated) ?
                            <Col sm={12} md={6}>
                                <SongsTable
                                    buttonClick={this.add}
                                    icon={<FaPlus className='table-icon' />}
                                    songs={suggestedSongs}
                                    tableLabel={'Suggested songs to add to your playlist: '}
                                />
                            </Col>
                            :
                            null
                    }
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = (state: IState) => (state.playlist);
const mapDispatchToProps = {
    addSongToNewPlaylist: playlistActions.addSongToNewPlaylist,
    addSongToSuggestedSongs: playlistActions.addSongToSuggestedSongs,
    removeSongFromNewPlaylist: playlistActions.removeSongFromNewPlaylist,
    removeSongFromSuggestedSongs: playlistActions.removeSongFromSuggestedSongs,
    setMostRecentlyAddedSong: playlistActions.setMostRecentlyAddedSong
}
export default connect(mapStateToProps, mapDispatchToProps)(TableContainer);