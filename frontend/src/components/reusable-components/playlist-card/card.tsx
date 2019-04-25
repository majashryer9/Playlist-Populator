import * as React from 'react';
import { Card, CardImg, CardImgOverlay, CardText } from 'reactstrap';
import PlaylistModal from './modal/modal';
import { Playlist } from 'src/models/Playlist';

interface IState {
    cardText: string,
    modal: boolean
}

interface IProps {
    playlist: Playlist
}

export default class PlaylistCard extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            cardText: '',
            modal: false
        }
    }

    public setCardText = (notEmptyString?: boolean) => {
        const { playlist } = this.props;
        let cardText = '';
        if (notEmptyString) {
            (playlist.name) ? cardText = playlist.name :
                cardText = (playlist.categories.length) ? playlist.categories[0].name : 'Playlist';
        };
        this.setState({
            cardText
        });
    }

    public toggle = () => {
        this.setState((prevState: IState) => ({
            modal: !prevState.modal
        }))
    }

    public render() {
        const { playlist } = this.props;
        const { cardText, modal } = this.state;
        return (
            <>
                <Card
                    className='playlist-card-wrapper'
                    onClick={this.toggle}
                    onMouseEnter={() => this.setCardText(true)}
                    onMouseLeave={() => this.setCardText()}
                    inverse
                >
                    <CardImg width='100%' height='100%' src={playlist.unsplashImageUrl} alt='playlist image' />
                    <CardImgOverlay>
                        <CardText className='font-24-bold'>{cardText}</CardText>
                    </CardImgOverlay>
                </Card>
                <PlaylistModal imageSrc={playlist.unsplashImageUrl} modal={modal} songs={playlist.songs} toggle={this.toggle} />
            </>
        );
    }
}
