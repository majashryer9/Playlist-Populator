import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import SongsTable from './table';
import { IPlaylistState, IState } from '../../../../reducers';
import { connect } from 'react-redux';
import { Song } from '../../../../models/Song';
import * as playlistActions from '../../../actions/playlist/playlist-actions';

interface IProps extends IPlaylistState {
    addSongToNewPlaylist: (song: Song) => void;
    removeSongFromNewPlaylist: (song: Song) => void;
    removeSongFromSuggestedSongs: (song: Song) => void;
    setMostRecentlyAddedSong: (song: Song) => void;
}

export class TableContainer extends React.Component<IProps, {}> {
    public constructor(props: any) {
        super(props);
    }

    public add = (song: Song) => {
        this.props.addSongToNewPlaylist(song);
        this.props.removeSongFromSuggestedSongs(song);
        this.props.setMostRecentlyAddedSong(song);
    }

    public render() {
        const songs = this.props.newPlaylist.songs;
        const suggestedSongs = this.props.suggestedSongs;
        const songsLength = songs.length;
        const suggestedSongsLength = suggestedSongs.length;
        return (
            <Container>
                <Row>
                    <Col>
                        {
                            (songsLength) ?
                                <SongsTable
                                    buttonClick={this.props.removeSongFromNewPlaylist}
                                    buttonLabel={'Remove from Playlist'}
                                    songs={songs}
                                />
                                : null
                        }
                    </Col>
                    <Col>
                        {
                            (suggestedSongsLength) ?
                                <SongsTable
                                    buttonClick={this.add}
                                    buttonDisabled={songsLength > 5}
                                    buttonLabel={'Add to Playlist'}
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
    removeSongFromNewPlaylist: playlistActions.removeSongFromNewPlaylist,
    removeSongFromSuggestedSongs: playlistActions.removeSongFromSuggestedSongs,
    setMostRecentlyAddedSong: playlistActions.setMostRecentlyAddedSong
}
export default connect(mapStateToProps, mapDispatchToProps)(TableContainer);