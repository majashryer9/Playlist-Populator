import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import PlaylistImage from './playlist-image/playlist-image';
import SongInput from './song-input/songs-input';
import PlaylistInformation from './playlist-information/playlist-information';
import ChangeCategories from './change-categories/change-categories';

export default class CreationContainer extends React.Component<any, any> {
    public constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <Container>
                <Row>
                    <Col md={12} lg={6}>
                        <PlaylistImage />
                    </Col>
                    <Col md={12} lg={6}>
                        <div className='playlist-info-and-categories-wrapper'>
                            <PlaylistInformation />
                            <ChangeCategories />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col
                        md={12}
                        lg={{ size: 8, offset: 2 }}
                    >
                        <SongInput />
                    </Col>
                </Row>
            </Container>
        )
    }
}