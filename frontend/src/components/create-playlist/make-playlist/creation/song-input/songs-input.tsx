import * as React from 'react';
import { connect } from 'react-redux';
import * as Autosuggest from 'react-autosuggest';
import { Button, Row, Col } from 'reactstrap';
import { debounce } from 'debounce';
import { IPlaylistState, IState } from 'src/reducers';
import { environment } from 'src/environment';
import * as playlistActions from 'src/actions/playlist/playlist-actions';
import { Song } from 'src/models/Song';

interface IProps extends IPlaylistState {
    addSelectedSong: (selectedSong: Song) => void;
    clearMostRecentlyAddedSong: () => void;
    clearPlaylistSongs: () => void;
    clearSuggestedSongs: () => void;
    populated: boolean;
    savePlaylist: (saved: boolean) => void;
    setMostRecentlyAddedSong: (song: Song) => void;
    setPopulated: (populated: boolean) => void;
}

interface ISongInputState {
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
            selectedSong: new Song(),
            suggestions: [],
            value: ''
        }
    }

    public add = () => {
        const numSongsAlreadyAdded = this.props.newPlaylist.songs.length;
        // only add another song if there are fewer than 5 songs
        if (numSongsAlreadyAdded < 5) {
            this.props.addSelectedSong(this.state.selectedSong);
            this.props.setMostRecentlyAddedSong(this.state.selectedSong);
            this.setState({ value: '' });
        }
        else {
            // set an error message
        }
    }

    public discard = () => {
        this.props.clearPlaylistSongs();
        this.props.clearSuggestedSongs();
        this.props.setPopulated(false);
        this.props.clearMostRecentlyAddedSong();
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

    public render() {
        const { selectedSong, suggestions, value } = this.state;
        const { populated, savePlaylist } = this.props;
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
                            populated &&
                            <div className='center-button'>
                                <Button onClick={() => savePlaylist(true)}> Save Playlist </Button>
                            </div>
                        }
                    </Col>
                    <Col xs={6}>
                        {
                            populated &&
                            <div className='center-button'>
                                <Button onClick={this.discard}> Discard Playlist </Button>
                            </div>
                        }
                    </Col>
                </Row>
            </>
        )
    }
}

const mapStateToProps = (state: IState) => (state.playlist);
const mapDispatchToProps = {
    addSelectedSong: playlistActions.addSelectedSong,
    clearMostRecentlyAddedSong: playlistActions.clearMostRecentlyAddedSong,
    clearPlaylistSongs: playlistActions.clearPlaylistSongs,
    clearSuggestedSongs: playlistActions.clearSuggestedSongs,
    savePlaylist: playlistActions.savePlaylist,
    setMostRecentlyAddedSong: playlistActions.setMostRecentlyAddedSong,
    setPopulated: playlistActions.setPopulated
}
export default connect(mapStateToProps, mapDispatchToProps)(SongInput);