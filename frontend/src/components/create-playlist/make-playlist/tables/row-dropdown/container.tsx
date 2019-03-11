import * as React from 'react';
import { Song } from 'src/models/Song';
import { environment } from 'src/environment';
import AudioItem from './audio-item';
import Slider from '../../../../reusable-components/slider/slider';

interface IProps {
    spotifyArtistId: string;
    clicked: boolean;
}

interface IState {
    playing: boolean;
    topSongs: Song[];
}

export default class RowDropdown extends React.Component<IProps, IState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            playing: false,
            topSongs: []
        }
    }

    public componentDidUpdate() {
        const { clicked, spotifyArtistId } = this.props;
        const topSongsLength = this.state.topSongs.length;
        if (clicked && !topSongsLength) {
            const url = `${environment.context}song/artists-top-songs/${spotifyArtistId}`;
            fetch(url)
                .then(resp => resp.json())
                .then(topSongs => {
                    this.setState({
                        topSongs
                    })
                })
                .catch(error => console.log(error));
        }
    }

    public render() {
        const { clicked } = this.props;
        const { topSongs } = this.state;
        return (
            <div className={(clicked && topSongs.length) ? 'row-dropdown-height' : 'row-dropdown-no-height'}>
                <Slider
                    arrayOfItems={
                        topSongs
                            .filter((song: Song) => song.previewUrl)
                            .map((song: Song) => <AudioItem key={song.spotifyTrackId} song={song} />)
                    }
                    fontSize={20}
                    height={60}
                    spacing={20}
                    width={180}
                    wrapperPadding={10}
                />
            </div>
        )
    }
}