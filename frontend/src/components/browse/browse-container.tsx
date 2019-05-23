import * as React from 'react'
import { Container, Row, Col } from 'reactstrap';
import AdvancedSearchContainer from './advanced-search/advanced-search-container';

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
                    </Col>
                </Row>
            </Container>
        )
    }
}