import * as React from 'react'
import { Container, Row, Col } from 'reactstrap';
import MostFrequentlyOccurringSongsWithGivenSongs from './song-most-frequent-songs-search/container';
import AdvancedSearchContainer from './advanced-search/container';

export default class BrowseContainer extends React.Component<any, any> {
    public constructor(props: any) {
        super(props);
    }

        public render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <AdvancedSearchContainer />
                        <MostFrequentlyOccurringSongsWithGivenSongs />
                    </Col>
                </Row>
            </Container>
        )
    }
}