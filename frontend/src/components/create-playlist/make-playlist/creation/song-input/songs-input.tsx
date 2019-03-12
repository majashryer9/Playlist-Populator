import * as React from 'react';
import { connect } from 'react-redux';
import * as Autosuggest from 'react-autosuggest';
import { Button, Row, Col } from 'reactstrap';
import { debounce } from 'debounce';
import { IPlaylistState, IState } from 'src/reducers';
import { environment } from 'src/environment';
import * as playlistActions from 'src/actions/playlist/playlist-actions';
import { Song } from 'src/models/Song';
import { Playlist } from 'src/models/Playlist';

interface IProps extends IPlaylistState {
    addSelectedSong: (selectedSong: Song) => void;
    discardNewPlaylist: () => void;
    getSimilarSongs: (songs: Song[]) => void;
    getSpotifyRecommendations: (songs: Song[]) => void;
    savePlaylist: (playlist: Playlist) => void;
    setMostRecentlyAddedSong: (song: Song) => void;
}

interface ISongInputState {
    populated: boolean;
    selectedSong: Song;
    suggestions: Song[];
    value: string;
}

export class SongInput extends React.Component<IProps, ISongInputState> {

    public onSuggestionsFetchRequested = debounce(({ value }: any) => {
        const url = `${environment.context}song/song-search`;
        fetch(url, {
            body: JSON.stringify({
                name: value
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST'
        })
            .then(resp => resp.json())
            .then(suggestions => {
                console.log(suggestions);
                this.setState({ suggestions })
            })
            .catch(error => console.log(error))
    }, 300);

    public constructor(props: any) {
        super(props);
        this.state = {
            populated: false,
            selectedSong: new Song(),
            suggestions: [],
            value: ''
        }
    }

    public add = () => {
        this.props.addSelectedSong(this.state.selectedSong);
        this.props.setMostRecentlyAddedSong(this.state.selectedSong);
        this.setState({ value: '' });
    }

    public newPlaylistSongsLength = () => {
        const length = this.props.newPlaylist.songs.length;
        return 5 < length || length < 3;
    }

    public onChange = (e: any, { newValue }: any) => {
        this.setState({
            value: newValue
        });
    };

    public onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        });
    };

    public populate = () => {
        this.setState({ populated: true });
        this.props.savePlaylist(this.props.newPlaylist);
        this.props.getSimilarSongs(this.props.newPlaylist.songs);
        this.props.getSpotifyRecommendations(this.props.newPlaylist.songs);
    }

    public render() {
        const { populated, selectedSong, suggestions, value } = this.state;
        const inputProps = {
            onChange: this.onChange,
            placeholder: 'Add a song...',
            value
        };
        return (
            <>
                <Row>
                    <Col xs={9}>
                        <Autosuggest
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            getSuggestionValue={(suggestion: Song) => {
                                this.setState({ selectedSong: suggestion });
                                return `${suggestion.name} by ${suggestion.artistName}`;
                            }}
                            renderSuggestion={(suggestion: Song) => <span> {suggestion.name} by {suggestion.artistName} </span>}
                            inputProps={inputProps}
                        />
                    </Col>
                    <Col xs={3}>
                        <div className='center-button'>
                            <Button disabled={!selectedSong.name} onClick={this.add}> Add Song </Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        {
                            !populated && <div className='center-button'>
                                <Button disabled={this.newPlaylistSongsLength()} onClick={this.populate}> Populate Playlist </Button>
                            </div>
                        }
                        {
                            populated && <div className='center-button'>
                                <Button> Save Playlist </Button>
                            </div>
                        }
                    </Col>
                    <Col xs={6}>
                        <div className='center-button'>
                            <Button onClick={this.props.discardNewPlaylist}> Discard Playlist </Button>
                        </div>
                    </Col>
                </Row>
            </>
        )
    }
}

const mapStateToProps = (state: IState) => (state.playlist);
const mapDispatchToProps = {
    addSelectedSong: playlistActions.addSelectedSong,
    discardNewPlaylist: playlistActions.discardNewPlaylist,
    getSimilarSongs: playlistActions.getSimilarSongs,
    getSpotifyRecommendations: playlistActions.getSpotifyRecommendations,
    savePlaylist: playlistActions.savePlaylist,
    setMostRecentlyAddedSong: playlistActions.setMostRecentlyAddedSong
}
export default connect(mapStateToProps, mapDispatchToProps)(SongInput);