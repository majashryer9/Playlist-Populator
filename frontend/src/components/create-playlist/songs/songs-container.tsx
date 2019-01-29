import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import SongInput from './song-input';
import SongsTable from './songs-table';
import { IPlaylistState, IState } from '../../../reducers';
import { connect } from 'react-redux';

export class SongsContainer extends React.Component<IPlaylistState, {}> {
    public constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <SongInput />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <SongsTable buttonLabel={'Remove'} songs={this.props.newPlaylist.songs} />
                    </Col>
                    <Col>
                        <SongsTable buttonLabel={'Add to Playlist'} songs={this.props.suggestedSongs} />
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = (state: IState) => (state.playlist);
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(SongsContainer);