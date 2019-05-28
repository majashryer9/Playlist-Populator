import * as React from 'react';
import * as Autosuggest from 'react-autosuggest';
import { Song } from 'src/models/Song';
import { debounce } from 'debounce';
import { environment } from 'src/environment';
import CircularButton from 'src/components/reusable-components/circular-button/circular-button';
import { FaPlus } from 'react-icons/fa';
import { Row, Col } from 'reactstrap';

interface IProps {
    songFunction: (song: Song) => void;
    songs: Song[];
}

interface ISongSearchState {
    selectedSong: Song;
    songSuggestions: Song[];
    songValue: string;
}

export default class SongSearch extends React.Component<IProps, ISongSearchState> {

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
        if (selectedSong.spotifyTrackId && !this.props.songs.some((song: Song) => song.spotifyTrackId === selectedSong.spotifyTrackId)) {
            this.props.songFunction(selectedSong);
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
                <Col xs={9} sm={10} md={9} lg={10}>
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
                <Col xs={3} sm={2} md={3} lg={2} className='center'>
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