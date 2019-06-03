import * as React from 'react'
import { Container, Row, Col } from 'reactstrap';
import MostFrequentlyOccurringSongsWithGivenSongs from './song-most-frequent-songs-search/container';
import AdvancedSearchContainer from './advanced-search/container';
import MostFrequentlyOccurringSongsWithGivenArtists from './artist-most-frequent-songs-search/container';

export default class BrowseContainer extends React.Component<any, any> {
    public constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <Container>
                <Row>
                    <Col md={6}>
                        <AdvancedSearchContainer />
                    </Col>
                    <Col md={6}>
                        <MostFrequentlyOccurringSongsWithGivenSongs />
                        <MostFrequentlyOccurringSongsWithGivenArtists />
                    </Col>
                </Row>
            </Container>
        )
    }
}