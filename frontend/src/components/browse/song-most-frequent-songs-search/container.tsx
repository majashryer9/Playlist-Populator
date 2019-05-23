import * as React from 'react';
import { IState, IPlaylistState } from 'src/reducers';
import { connect } from 'react-redux';
import { Song } from 'src/models/Song';
import SongSearch from './song-search';
import { environment } from 'src/environment';

interface IMostFrequentlyOccurringSongsWithGivenSongsState {
    resp: Song[]
}

export class MostFrequentlyOccurringSongsWithGivenSongs extends React.Component<IPlaylistState, IMostFrequentlyOccurringSongsWithGivenSongsState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            resp: []
        }
    }

    public search = () => {
        const url = `${environment.context}song//frequently-occurring-songs`;
        fetch(url, {
            body: JSON.stringify({
                songs: this.props.songsForMostFrequentSongsSearch
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
            .then(resp => resp.json())
            .then(resp => this.setState({ resp }));
    }

    public render() {
        return (
            <div>
                {
                    this.props.songsForMostFrequentSongsSearch.map((song: Song) => {
                        return (
                            <div key={song.spotifyTrackId}>
                                {song.name}
                            </div>
                        )
                    })
                }
                <SongSearch />
                <button onClick={this.search}> Search </button>
                {
                    this.state.resp.map((song: Song) => {
                        return (
                            <div key={song.spotifyTrackId}>
                                {song.name}
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = (state: IState) => (state.playlist);
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(MostFrequentlyOccurringSongsWithGivenSongs);