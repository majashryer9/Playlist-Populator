import * as React from 'react';
import { Input } from 'reactstrap';
import { IPlaylistState, IState } from 'src/reducers';
import { connect } from 'react-redux';
import * as playlistActions from '../../../../../actions/playlist/playlist-actions';

interface IProps extends IPlaylistState {
    setPlaylistDescription: (description: string) => void;
    setPlaylistName: (name: string) => void;
}

export class PlaylistInformation extends React.Component<IProps, any> {
    public constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <div className='playlist-information-wrapper'>
                <Input
                    className='playlist-name-input'
                    onChange={(e: any) => this.props.setPlaylistName(e.target.value)}
                    placeholder='Name your playlist...'
                    type='text'
                    value={this.props.newPlaylist.name}
                />
                <Input
                    onChange={(e: any) => this.props.setPlaylistDescription(e.target.value)}
                    placeholder='Describe your playlist...'
                    type='textarea'
                    value={this.props.newPlaylist.description}
                />
            </div>
        )
    }
}

const mapStateToProps = (state: IState) => (state.playlist);
const mapDispatchToProps = {
    setPlaylistDescription: playlistActions.setPlaylistDescription,
    setPlaylistName: playlistActions.setPlaylistName
}
export default connect(mapStateToProps, mapDispatchToProps)(PlaylistInformation);