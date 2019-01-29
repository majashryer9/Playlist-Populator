import * as React from 'react';
import { Category } from '../../../models/Category';
import { Card, CardText, CardImg, CardImgOverlay } from 'reactstrap';
import { IPlaylistState, IState } from '../../../reducers';
import { connect } from 'react-redux';
import * as playlistActions from '../../actions/playlist/playlist-actions';

interface IProps extends IPlaylistState {
    addCategory: (category: Category) => void,
    category: Category,
    removeCategory: (category: Category) => void
}

interface ICategoryCardState {
    clicked: boolean
}

export class CategoryCard extends React.Component<IProps, ICategoryCardState> {

    public constructor(props: any) {
        super(props);
        this.state = {
            clicked: false
        }
    }

    public setClicked = () => {
        (!this.state.clicked)? this.props.addCategory(this.props.category) : this.props.removeCategory(this.props.category);
        this.setState({
            ...this.state,
            clicked: !this.state.clicked
        })
    }

    public render() {
        const { category } = this.props;
        const { clicked } = this.state;
        return (
            <div>
                <Card className={`category-card ${clicked ? 'clicked' : 'not-clicked'}`} onClick={this.setClicked}>
                    <CardImg className='category-card-img' width="100%" src={category.imageUrl} alt="Card image cap" />
                    <CardImgOverlay>
                        <CardText className='category-card-text'>{category.name}</CardText>
                    </CardImgOverlay>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state: IState) => (state.playlist);
const mapDispatchToProps = {
    addCategory: playlistActions.addCategory,
    removeCategory: playlistActions.removeCategory
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoryCard);

