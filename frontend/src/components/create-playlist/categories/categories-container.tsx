import * as React from 'react';
import { Category } from '../../../models/Category';
import { Row, Col, Button, Container } from 'reactstrap';
import CategoryCard from './category-card';
import { environment } from '../../../environment';

interface IState {
    categories: Category[];
}

export default class CategoriesContainer extends React.Component<any, IState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            categories: []
        }
    }

    public componentDidMount() {
        const url = `${environment.context}playlist/categories`;
        fetch(url)
            .then(resp => resp.json())
            .then(categories => {
                this.setState({
                    ...this.state,
                    categories
                })
            })
            .catch(error => console.log(error));
    }

    public render() {
        const { categories } = this.state;
        return (
            <Container>
                <Row>
                    <Col>
                        <p> To improve song recommendations, please choose any number of categories to describe your playlist... </p>
                    </Col>
                    <Col>
                        <Button onClick={this.props.showSongs}>Create Playlist</Button>
                    </Col>
                </Row>
                <Row>
                    {
                        categories.map((category: Category) => {
                            return (
                                <Col key={category.id} sm={6} md={4} lg={3} className='category-card-col'>
                                    <CategoryCard category={category} />
                                </Col>
                            )
                        })
                    }
                </Row>
            </Container>
        );
    }
}