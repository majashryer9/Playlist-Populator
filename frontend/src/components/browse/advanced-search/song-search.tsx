import * as React from 'react';
import * as Autosuggest from 'react-autosuggest';
import { IPlaylistState, IState } from 'src/reducers';
import { connect } from 'react-redux';
import { Song } from 'src/models/Song';
import { debounce } from 'debounce';
import { environment } from 'src/environment';
import CircularButton from 'src/components/reusable-components/circular-button/circular-button';
import { FaPlus } from 'react-icons/fa';
import * as playlistActions from 'src/actions/playlist/playlist-actions';
import { Row, Col } from 'reactstrap';

interface IProps extends IPlaylistState {
    addSongForSearch: (songForSearch: Song) => void;
}

interface ISongSearchState {
    selectedSong: Song;
    songSuggestions: Song[];
    songValue: string;
}

export class SongSearch extends React.Component<IProps, ISongSearchState> {

    public onSongSuggestionsFetchRequested = debounce(({ value }: any) => {
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
            .then(songSuggestions => {
                this.setState({ songSuggestions })
            })
            .catch(error => console.log(error))
    }, 300);

    public constructor(props: any) {
        super(props);
        this.state = {
            selectedSong: new Song(),
            songSuggestions: [],
            songValue: ''
        }
    }

    public add = () => {
        const { selectedSong } = this.state;
        if (selectedSong.spotifyTrackId && !this.props.songsForSearch.some((songForSearch: Song) => songForSearch.spotifyTrackId === selectedSong.spotifyTrackId)) {
            this.props.addSongForSearch(selectedSong);
            this.setState({
                selectedSong: new Song(),
                songValue: ''
            });
        }
    }

    public onSongChange = (e: any, { newValue }: any) => {
        this.setState({
            songValue: newValue
        });
    };

    public onSongSuggestionsClearRequested = () => {
        this.setState({
            songSuggestions: [],
        });
    };

    public render() {
        const { songSuggestions, songValue } = this.state;
        const inputSongProps = {
            onChange: this.onSongChange,
            placeholder: 'Add a song...',
            value: songValue
        };
        return (
            <Row className='margin-bottom-10'>
                <Col xs={9} sm={10} lg={11}>
                    <Autosuggest
                        suggestions={songSuggestions}
                        onSuggestionsFetchRequested={this.onSongSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSongSuggestionsClearRequested}
                        getSuggestionValue={(songSuggestion: Song) => {
                            this.setState({ selectedSong: songSuggestion });
                            return `${songSuggestion.name} by ${songSuggestion.artistName}`;
                        }}
                        renderSuggestion={(songSuggestion: Song) => <span> {songSuggestion.name} by {songSuggestion.artistName} </span>}
                        inputProps={inputSongProps}
                    />
                </Col>
                <Col xs={3} sm={2} lg={1}>
                    <CircularButton
                        icon={<FaPlus />}
                        onClick={this.add}
                        height={38}
                        width={38}
                    />
                </Col>
            </Row>
        )
    }
}

const mapStateToProps = (state: IState) => (state.playlist);
const mapDispatchToProps = {
    addSongForSearch: playlistActions.addSongForSearch
}
export default connect(mapStateToProps, mapDispatchToProps)(SongSearch);