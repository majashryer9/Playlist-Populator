import * as React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Category } from 'src/models/Category';
import { IPlaylistState, IState } from 'src/reducers';
import * as playlistActions from 'src/actions/playlist/playlist-actions';
import CategoryChipSlider from './category-chip-slider';

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
        this.setState({ selectedCategory: new Category() });
    }

    public render() {
        /* tslint:disable */
        const options = this.props.categories.map((category: Category) => { return { value: category, label: category.name } })
        const playlistCategoryNames = this.props.newPlaylist.categories.map((category: Category) => category.name);
        return (
            <>
                <Row>
                    <Col sm={12}>
                        <CategoryChipSlider
                            arrayOfItems={this.props.newPlaylist.categories.map((category: Category) => category.name)}
                            spacing={28}
                            width={111}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col sm={10}>
                        <Select
                            onChange={(selectedOption: any) => {
                                this.setState({ selectedCategory: selectedOption.value });
                            }}
                            // filter out any categories that have already been selected
                            options={options.filter((option: any) => !playlistCategoryNames.some((playlistCategoryName: string) => playlistCategoryName === option.label))}
                            value={{ value: this.state.selectedCategory, label: this.state.selectedCategory.name }}
                        />
                    </Col>
                    <Col sm={2}>
                        <Button onClick={this.addCategory}> Add </Button>
                    </Col>
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