import * as React from 'react';
import Select from 'react-select';
import { IPlaylistState, IState } from 'src/reducers';
import { connect } from 'react-redux';
import { Category } from 'src/models/Category';
import { environment } from 'src/environment';
import * as playlistActions from 'src/actions/playlist/playlist-actions';
import CircularButton from 'src/components/reusable-components/circular-button/circular-button';
import { FaPlus } from 'react-icons/fa';

interface IProps extends IPlaylistState {
    addCategoryForSearch: (categoryForSearch: Category) => void;
    setCategories: (categories: Category[]) => void;
}

interface ICategorySearchState {
    selectedCategory: Category;
}

export class CategorySearch extends React.Component<IProps, ICategorySearchState> {
    public constructor(props: IProps) {
        super(props);
        this.state = {
            selectedCategory: new Category()
        }
    }

    public componentDidMount() {
        if (!this.props.categories.length) {
            const url = `${environment.context}category/get-categories`;
            fetch(url)
                .then(resp => resp.json())
                .then(categories => {
                    this.props.setCategories(categories);
                })
                .catch(error => console.log(error));
        }
    }

    public add = () => {
        const { selectedCategory } = this.state;
        if (selectedCategory.name) {
            this.props.addCategoryForSearch(selectedCategory)
            this.setState({ selectedCategory: new Category() });
        }
    }

    public render() {
        /* tslint:disable */
        const options = this.props.categories.map((category: Category) => { return { value: category, label: category.name } })
        return (
            <div>
                <Select
                    onChange={(selectedOption: any) => {
                        this.setState({ selectedCategory: selectedOption.value });
                    }}
                    // filter out any categories that have already been selected
                    options={options.filter((option: any) => !this.props.categoriesForSearch.some((categoryForSearch: Category) => categoryForSearch.name === option.label))}
                    placeholder='Add category...'
                    value={(this.state.selectedCategory.name) ? { value: this.state.selectedCategory, label: this.state.selectedCategory.name } : null}
                />
                <CircularButton
                    icon={<FaPlus />}
                    onClick={this.add}
                    height={38}
                    width={38}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: IState) => (state.playlist);
const mapDispatchToProps = {
    addCategoryForSearch: playlistActions.addCategoryForSearch,
    setCategories: playlistActions.setCategories
}
export default connect(mapStateToProps, mapDispatchToProps)(CategorySearch);