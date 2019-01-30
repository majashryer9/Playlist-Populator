import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import SongsInput from './songs-input';
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
                        <SongsInput />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <SongsTable buttonLabel={'Remove from Playlist'} songs={this.props.newPlaylist.songs} />
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