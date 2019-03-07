import * as React from 'react';
import { Row, Col, Button, Container } from 'reactstrap';
import { connect } from 'react-redux';
import { Category } from 'src/models/Category';
import CategoryCard from './card';
import { environment } from 'src/environment';
import { IPlaylistState, IState } from 'src/reducers';
import * as playlistActions from 'src/actions/playlist/playlist-actions';

interface IProps extends IPlaylistState {
    setCategories: (categories: Category[]) => void;
    showSongs: () => void;
}

export class ChooseCategoriesContainer extends React.Component<IProps, any> {
    public constructor(props: any) {
        super(props);
        this.state = {
            categories: []
        }
    }

    public componentDidMount() {
        const url = `${environment.context}category/get-categories`;
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
export default connect(mapStateToProps, mapDispatchToProps)(ChooseCategoriesContainer);