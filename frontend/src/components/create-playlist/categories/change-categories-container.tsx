import * as React from 'react';
import CategoryChip from './category-chip';
import { Container, Row, Col, Button } from 'reactstrap';
import { Category } from '../../../models/Category';
import { IPlaylistState, IState } from '../../../reducers';
import { connect } from 'react-redux';
import { Typeahead } from 'react-bootstrap-typeahead';
import * as playlistActions from '../../actions/playlist/playlist-actions';

interface IProps extends IPlaylistState {
    addPlaylistCategory: (category: Category) => void;
}

interface IChangeCategoriesContainerState {
    reference: any;
    selectedCategory: Category;
}

export class ChangeCategoriesContainer extends React.Component<IProps, IChangeCategoriesContainerState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            reference: null,
            selectedCategory: new Category()
        }
    }

    public addCategory = () => {
        this.props.addPlaylistCategory(this.state.selectedCategory);
        this.state.reference.getInstance().clear();
    }

    public setRef = (reference: any) => {
        this.setState({
            ...this.state,
            reference
        })
    }

    public setSelectedCategory = (selectedCategory: Category) => {
        this.setState({
            ...this.state,
            selectedCategory
        })
    }

    public render() {
        const categoryNames = this.props.categories.map((category: Category) => category.name);
        const playlistCategoryNames = this.props.newPlaylist.categories.map((category: Category) => category.name);
        return (
            <Container>
                <Row>
                    <Col md={12}>
                        <Typeahead
                            multiple={false}
                            onChange={(selectedCategoryNameArray: string[]) => {
                                if (selectedCategoryNameArray.length && categoryNames.some((categoryName: string) => categoryName === selectedCategoryNameArray[0])) {
                                    this.setSelectedCategory(this.props.categories[categoryNames.indexOf(selectedCategoryNameArray[0])])
                                }
                            }}
                            options={categoryNames.filter((categoryName: string) => !playlistCategoryNames.some((playlistCategoryName: string) => playlistCategoryName === categoryName))}
                            placeholder='Add another category...'
                            ref={this.setRef}
                        />
                        <Button onClick={this.addCategory}> Add </Button>
                    </Col>
                </Row>
                <Row>
                    {this.props.newPlaylist.categories.map((category: Category) => {
                        return (
                            <Col md={6} key={category.id}>
                                <CategoryChip categoryName={category.name} />
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = (state: IState) => (state.playlist);
const mapDispatchToProps = {
    addPlaylistCategory: playlistActions.addPlaylistCategory
}
export default connect(mapStateToProps, mapDispatchToProps)(ChangeCategoriesContainer);