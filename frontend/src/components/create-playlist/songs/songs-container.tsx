import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import SongsInput from './songs-input';
import SongsTable from './songs-table';
import { IPlaylistState, IState } from '../../../reducers';
import { connect } from 'react-redux';
import { Song } from '../../../models/Song';
import * as playlistActions from '../../actions/playlist/playlist-actions';

interface IProps extends IPlaylistState {
    addSongToNewPlaylist: (song: Song) => void;
    removeSongFromNewPlaylist: (song: Song) => void;
    removeSongFromSuggestedSongs: (song: Song) => void;
}

export class SongsContainer extends React.Component<IProps, {}> {
    public constructor(props: any) {
        super(props);
    }

    public add = (song: Song) => {
        this.props.addSongToNewPlaylist(song);
        this.props.removeSongFromSuggestedSongs(song);
    }

    public render() {
        const length = this.props.newPlaylist.songs.length;
        return (
            <Container>
                <Row>
                    <Col>
                        <SongsInput />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <SongsTable buttonClick={this.props.removeSongFromNewPlaylist} buttonLabel={'Remove from Playlist'} songs={this.props.newPlaylist.songs} />
                    </Col>
                    <Col>
                        <SongsTable buttonClick={this.add} buttonDisabled={length > 5} buttonLabel={'Add to Playlist'} songs={this.props.suggestedSongs} />
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
    removeSongFromSuggestedSongs: playlistActions.removeSongFromSuggestedSongs
}
export default connect(mapStateToProps, mapDispatchToProps)(SongsContainer);