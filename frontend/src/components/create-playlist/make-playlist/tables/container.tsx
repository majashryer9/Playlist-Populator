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
    removeSongFromNewPlaylist: (song: Song) => void;
    removeSongFromSuggestedSongs: (song: Song) => void;
    setMostRecentlyAddedSong: (song: Song) => void;
}

export class TableContainer extends React.Component<IProps, {}> {
    public constructor(props: IProps) {
        super(props);
    }

    public add = (song: Song) => {
        const songsLength = this.props.newPlaylist.songs.length;
        if (songsLength <= 5) {
            this.props.addSongToNewPlaylist(song);
            this.props.removeSongFromSuggestedSongs(song);
            this.props.setMostRecentlyAddedSong(song);
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
        return (
            <Container>
                <Row>
                    <Col sm={12} md={6}>
                        {
                            (songsLength) ?
                                <SongsTable
                                    buttonClick={this.removeFromNewPlaylistAndAddToSuggestedSongs}
                                    icon={<FaTimes className='table-icon' />}
                                    songs={songs}
                                />
                                : null
                        }
                    </Col>
                    <Col sm={12} md={6}>
                        {
                            (suggestedSongsLength) ?
                                <SongsTable
                                    buttonClick={this.add}
                                    icon={<FaPlus className='table-icon' />}
                                    songs={suggestedSongs}
                                />
                                : null
                        }
                    </Col>
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