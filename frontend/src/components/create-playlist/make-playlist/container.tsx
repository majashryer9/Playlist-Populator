import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import TableContainer from './tables/container';
import CreationContainer from './creation/creation-container';
import ExploreContainer from './explore/explore-container';

export default class MakePlaylistContainer extends React.Component<any, any> {
    public constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <Container>
                <Row>
                    <Col sm={12}>
                        <CreationContainer />
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <TableContainer />
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <ExploreContainer />
                    </Col>
                </Row>
            </Container>
        )
    }
}