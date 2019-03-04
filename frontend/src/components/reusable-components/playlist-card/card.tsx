import * as React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';
import PlaylistModal from './modal';
import { Playlist } from 'src/models/Playlist';

interface IState {
    modal: boolean
}

interface IProps {
    playlist: Playlist
}

export default class PlaylistCard extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            modal: false
        }
    }

    public toggle = () => {
        this.setState((prevState: IState) => ({
            modal: !prevState.modal
        }))
    }

    public render() {
        const { playlist } = this.props;
        return (
            <>
                <Card className='playlist-card-wrapper' onClick={this.toggle} inverse>
                    <CardImg width='100%' height='100%' src={playlist.unsplashImageUrl} alt='playlist image' />
                    <CardImgOverlay>
                        {playlist.name && <CardTitle>Playlist Name</CardTitle>}
                    </CardImgOverlay>
                </Card>
                <PlaylistModal imageSrc={playlist.unsplashImageUrl} modal={this.state.modal} songs={playlist.songs} toggle={this.toggle} />
            </>
        );
    }
}
