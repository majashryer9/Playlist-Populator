import * as React from 'react';
import { connect } from 'react-redux';
import * as Autosuggest from 'react-autosuggest';
import { Row, Col } from 'reactstrap';
import { debounce } from 'debounce';
import { IPlaylistState, IState } from 'src/reducers';
import { environment } from 'src/environment';
import * as playlistActions from 'src/actions/playlist/playlist-actions';
import { Song } from 'src/models/Song';
import CircularButton from 'src/components/reusable-components/circular-button/circular-button';
import { FaPlus } from 'react-icons/fa';
import { MdDeleteForever, MdSave } from 'react-icons/md';
import { Alert } from 'reactstrap';
import SavedPopup from './saved-popup';
import CreateNewPlaylistButton from './create-new-playlist-button';

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
    errorMessage: string;
    selectedSong: Song;
    showPopup: boolean;
    suggestions: Song[];
    value: string;
}

export class SongInput extends React.Component<IProps, ISongInputState> {

    public onSuggestionsFetchRequested = debounce(({ value }: any) => {
        const url = `${environment.context}song/song-search`;
        if (this.props.newPlaylist.songs.length < 5) {
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
        }
        else if (this.props.newPlaylist.songs.length >= 5 && this.state.value.length > 0) {
            this.setState({
                errorMessage: 'You cannot enter more than 5 songs. Please generate your playlist.'
            })
        }
    }, 300);

    public constructor(props: any) {
        super(props);
        this.state = {
            errorMessage: '',
            selectedSong: new Song(),
            showPopup: false,
            suggestions: [],
            value: ''
        }
    }

    public add = () => {
        const numSongsAlreadyAdded = this.props.newPlaylist.songs.length;
        const { selectedSong } = this.state;
        // only add another song if there are fewer than 5 songs
        if (numSongsAlreadyAdded < 5 && selectedSong.name) {
            this.props.addSelectedSong(this.state.selectedSong);
            this.props.setMostRecentlyAddedSong(this.state.selectedSong);
            this.setState({ value: '' });
        }
    }

    public discard = () => {
        this.props.clearPlaylistSongs();
        this.props.clearSuggestedSongs();
        this.props.setPopulated(false);
        this.props.clearMostRecentlyAddedSong();
        this.setState({
            errorMessage: ''
        });
    }

    public save = () => {
        this.props.savePlaylist(true);
        this.setState({
            showPopup: true
        });
        setTimeout(() => {
            this.setState({
                showPopup: false
            });
        }, 1500);
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
        const { errorMessage, showPopup, suggestions, value } = this.state;
        const { populated } = this.props;
        const inputProps = {
            onChange: this.onChange,
            placeholder: 'Add a song...',
            value
        };
        return (
            <>
                <Row>
                    <Col sm={12}>
                        <div className='add-song-wrapper'>
                            <Row>
                                <Col className='no-right-padding-mobile' xs={9} sm={10}>
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
                                <Col className='no-left-right-padding-mobile' xs={3} sm={2}>
                                    <div className='center-button'>
                                        <CircularButton
                                            icon={<FaPlus />}
                                            onClick={this.add}
                                            height={38}
                                            width={38}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        {
                            (errorMessage && !populated) ?
                                <Alert color="danger">
                                    {errorMessage}
                                </Alert>
                                :
                                null
                        }
                    </Col>
                </Row>
                {
                    (populated && !this.props.newPlaylist.saved) ?
                        <Row className='save-discard-button-row'>
                            <Col xs={6}>
                                <div className='center-button'>
                                    <CircularButton
                                        icon={<MdSave />}
                                        onClick={this.save}
                                        height={38}
                                        width={38}
                                    />
                                </div>
                            </Col>
                            <Col xs={6}>
                                <div className='center-button'>
                                    <CircularButton
                                        icon={<MdDeleteForever />}
                                        onClick={this.discard}
                                        height={38}
                                        width={38}
                                    />
                                </div>
                            </Col>
                        </Row>
                        :
                        null
                }
                {
                    (showPopup) ?
                        <SavedPopup showPopup={showPopup} />
                        :
                        null
                }
                {
                    (this.props.newPlaylist.saved) ?
                        <CreateNewPlaylistButton />
                        :
                        null
                }
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