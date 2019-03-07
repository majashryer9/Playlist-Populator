import * as React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { connect } from 'react-redux';
import Select from 'react-select';
import CategoryChip from './chip';
import { Category } from 'src/models/Category';
import { IPlaylistState, IState } from 'src/reducers';
import * as playlistActions from 'src/actions/playlist/playlist-actions';

interface IProps extends IPlaylistState {
    addPlaylistCategory: (category: Category) => void;
}

interface IChangeCategoriesState {
    selectedCategory: Category;
}

export class ChangeCategories extends React.Component<IProps, IChangeCategoriesState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            selectedCategory: new Category()
        }
    }

    public addCategory = () => {
        this.props.addPlaylistCategory(this.state.selectedCategory);
        this.setState({ selectedCategory: new Category() })
    }

    public render() {
        /* tslint:disable */
        const options = this.props.categories.map((category: Category) => { return { value: category, label: category.name } })
        const playlistCategoryNames = this.props.newPlaylist.categories.map((category: Category) => category.name);
        return (
            <>
                <Row>
                    <Col md={12}>
                        <Select
                            onChange={(selectedOption: any) => {
                                this.setState({ selectedCategory: selectedOption.value });
                            }}
                            // filter out any categories that have already been selected
                            options={options.filter((option: any) => !playlistCategoryNames.some((playlistCategoryName: string) => playlistCategoryName === option.label))}
                            value={{ value: this.state.selectedCategory, label: this.state.selectedCategory.name }}
                        />
                        <Button onClick={this.addCategory}> Add </Button>
                    </Col>
                </Row>
                <Row>
                    {this.props.newPlaylist.categories.map((category: Category) => {
                        return (
                            <Col md={12} lg={6} key={category.id}>
                                <CategoryChip categoryName={category.name} />
                            </Col>
                        )
                    })}
                </Row>
            </>
        )
    }
}

const mapStateToProps = (state: IState) => (state.playlist);
const mapDispatchToProps = {
    addPlaylistCategory: playlistActions.addPlaylistCategory
}
export default connect(mapStateToProps, mapDispatchToProps)(ChangeCategories);