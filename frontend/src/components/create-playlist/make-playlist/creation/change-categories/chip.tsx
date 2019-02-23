import * as React from 'react';
import { FaTimes } from 'react-icons/fa';
import { IState, IPlaylistState } from '../../../../../reducers';
import { connect } from 'react-redux';
import { Category } from '../../../../../models/Category';
import * as playlistActions from '../../../../actions/playlist/playlist-actions';

interface IProps extends IPlaylistState {
    categoryName: string;
    removePlaylistCategory: (category: Category) => void;
}

export class CategoryChip extends React.Component<IProps, any> {
    public constructor(props: any) {
        super(props);
    }

    public removeCategory = () => {
        const categoryToRemove = this.props.newPlaylist.categories.filter((category: Category) => category.name === this.props.categoryName)[0];
        this.props.removePlaylistCategory(categoryToRemove);
    }

    public render() {
        return (
            <div className='category-chip'>
                <div className='category-name'>{this.props.categoryName}</div>
                <div className='remove-icon' onClick={this.removeCategory}><FaTimes /></div>
            </div>
        )
    }
}

const mapStateToProps = (state: IState) => (state.playlist);
const mapDispatchToProps = {
    removePlaylistCategory: playlistActions.removePlaylistCategory
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoryChip);