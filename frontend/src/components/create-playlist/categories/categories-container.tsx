import * as React from 'react';
import { Category } from '../../../models/Category';
import { Row, Col, Button, Container } from 'reactstrap';
import CategoryCard from './category-card';
import { environment } from '../../../environment';
import { IPlaylistState, IState } from '../../../reducers';
import { connect } from 'react-redux';
import * as playlistActions from '../../actions/playlist/playlist-actions';

interface IProps extends IPlaylistState {
    setCategories: (categories: Category[]) => void;
    showSongs: () => void;
}

export class CategoriesContainer extends React.Component<IProps, any> {
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
                this.props.setCategories(categories);
            })
            .catch(error => console.log(error));
    }

    public render() {
        const { categories } = this.props;
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

const mapStateToProps = (state: IState) => (state.playlist);
const mapDispatchToProps = {
    setCategories: playlistActions.setCategories
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoriesContainer);