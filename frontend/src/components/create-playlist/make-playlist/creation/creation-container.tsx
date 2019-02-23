import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import ChangeCategories from './change-categories/change-categories';
import PlaylistImage from './playlist-image/playlist-image';
import PlaylistInformation from './playlist-information/playlist-information';
import SongInput from './song-input/songs-input';

export default class CreationContainer extends React.Component<any, any> {
    public constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <Container>
                <Row>
                    <Col sm={6}>
                        <PlaylistImage />
                    </Col>
                    <Col sm={6}>
                        <PlaylistInformation />
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <SongInput />
                    </Col>
                    <Col sm={6}>
                        <ChangeCategories />
                    </Col>
                </Row>
            </Container>
        )
    }
}