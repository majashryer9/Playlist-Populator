import * as React from 'react';
import { connect } from 'react-redux';
import Slider from '../../../reusable-components/slider/slider';
import { IPlaylistState, IState } from 'src/reducers';
import { environment } from 'src/environment';
import { Playlist } from 'src/models/Playlist';
import PlaylistCard from 'src/components/reusable-components/playlist-card/card';

interface IExploreContainerState {
    playlistCards: any[]
}

export class ExploreContainer extends React.Component<IPlaylistState, IExploreContainerState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            playlistCards: []
        }
    }

    public componentDidUpdate(prevProps: IPlaylistState) {
        const mostRecentlyAddedSong = this.props.mostRecentlyAddedSong;
        if (
            mostRecentlyAddedSong &&
            mostRecentlyAddedSong.spotifyTrackId &&
            mostRecentlyAddedSong.spotifyTrackId !== prevProps.mostRecentlyAddedSong.spotifyTrackId
        ) {
            const url = `${environment.context}playlist/playlists-containing-song`;
            fetch(url, {
                body: JSON.stringify(mostRecentlyAddedSong),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            })
                .then(resp => resp.json())
                .then(playlists => {
                    if (playlists && playlists.length) {
                        const playlistCards = playlists.map((playlist: Playlist) => <PlaylistCard key={playlist.id} playlist={playlist} />);
                        this.setState({
                            playlistCards
                        })
                    }
                })
                .catch(error => console.log(error));
        }
        else if (
            mostRecentlyAddedSong &&
            !mostRecentlyAddedSong.spotifyTrackId &&
            this.state.playlistCards.length
        ) {
            this.setState({
                playlistCards: []
            })
        }
    }

    public render() {
        return (
            <>
                {
                    (this.state.playlistCards.length) ?
                        <div>
                            <Slider
                                arrayOfItems={this.state.playlistCards}
                                fontSize={45}
                                height={300}
                                mobileFontSize={20}
                                mobileHeight={180}
                                mobileSpacing={20}
                                mobileWidth={180}
                                spacing={40}
                                width={300}
                                wrapperPadding={30}
                            />
                        </div> : null
                }
            </>
        )
    }
}

const mapStateToProps = (state: IState) => (state.playlist);
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(ExploreContainer);