import * as React from 'react';
import { connect } from 'react-redux';
import { IState, IPlaylistState } from '../../reducers';
import ChooseCategoriesContainer from './choose-categories/container';
import MakePlaylistContainer from './make-playlist/container';

interface ICreatePlaylistContainerState {
    showCategories: boolean
}


export class CreatePlaylistContainer extends React.Component<IPlaylistState, ICreatePlaylistContainerState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            showCategories: true
        }
    }

    public showSongs = () => {
        this.setState({
            ...this.state,
            showCategories: false
        })
    }

    public render() {
        return (
            <div>
                {
                    (this.state.showCategories) ?
                        <ChooseCategoriesContainer showSongs={this.showSongs} /> : <MakePlaylistContainer />
                }
            </div>
        )
    }
}

const mapStateToProps = (state: IState) => (state.playlist);
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(CreatePlaylistContainer);