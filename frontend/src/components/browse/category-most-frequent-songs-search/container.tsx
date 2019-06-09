import * as React from 'react';
import { IState, IPlaylistState } from 'src/reducers';
import { connect } from 'react-redux';
import * as playlistActions from 'src/actions/playlist/playlist-actions';
import SearchChip from '../search-chip';
import { Row, Col } from 'reactstrap';
import SongsTable from 'src/components/create-playlist/make-playlist/tables/table';
import { Category } from 'src/models/Category';
import CategorySearch from '../category-search';

interface IProps extends IPlaylistState {
    addCategoryForMostFrequentSongsSearch: (category: Category) => void;
    getFrequentlyOccurringSongsWithGivenCategories: () => void;
    removeCategoryForMostFrequentSongsSearch: (categoryName: string) => void;
}

export class MostFrequentlyOccurringSongsWithGivenCategories extends React.Component<IProps, any> {
    public constructor(props: IProps) {
        super(props);
    }

    public search = () => {
        if (this.props.categoriesForMostFrequentSongsSearch.length) {
            this.props.getFrequentlyOccurringSongsWithGivenCategories();
        }
    }

    public render() {
        return (
            <div className='search-container'>
                <CategorySearch
                    categoryFunction={this.props.addCategoryForMostFrequentSongsSearch}
                />
                <Row>
                    {
                        this.props.categoriesForMostFrequentSongsSearch.map((category: Category) => {
                            return (
                                <Col lg={6} key={category.name}>
                                    <SearchChip
                                        dataToDisplay={category.name}
                                        removeFunction={this.props.removeCategoryForMostFrequentSongsSearch}
                                        uniqueIdentifier={category.name}
                                    />
                                </Col>
                            )
                        })
                    }
                </Row>
                <Row>
                    <Col xs={12} className='search-button-container margin-bottom-10'>
                        <button onClick={this.search}> Search </button>
                    </Col>
                </Row>
                {
                    (this.props.mostFrequentSongsWithGivenCategoriesSearchResults.length) ?
                        <SongsTable
                            songs={this.props.mostFrequentSongsWithGivenCategoriesSearchResults}
                        />
                        :
                        null
                }
            </div>
        );
    }
}

const mapStateToProps = (state: IState) => (state.playlist);
const mapDispatchToProps = {
    addCategoryForMostFrequentSongsSearch: playlistActions.addCategoryForMostFrequentSongsSearch,
    getFrequentlyOccurringSongsWithGivenCategories: playlistActions.getFrequentlyOccurringSongsWithGivenCategories,
    removeCategoryForMostFrequentSongsSearch: playlistActions.removeCategoryForMostFrequentSongsSearch
}
export default connect(mapStateToProps, mapDispatchToProps)(MostFrequentlyOccurringSongsWithGivenCategories);