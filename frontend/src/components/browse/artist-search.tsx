import * as React from 'react';
import * as Autosuggest from 'react-autosuggest';
import { Artist } from 'src/models/Artist';
import { debounce } from 'debounce';
import { environment } from 'src/environment';
import CircularButton from 'src/components/reusable-components/circular-button/circular-button';
import { FaPlus } from 'react-icons/fa';
import { Row, Col } from 'reactstrap';

interface IProps {
    artistFunction: (artistForSearch: Artist) => void;
    artists: Artist[];
}

interface IArtistSearchState {
    artistSuggestions: Artist[];
    selectedArtist: Artist;
    artistValue: string;
}

export default class ArtistSearch extends React.Component<IProps, IArtistSearchState> {
    public onArtistSuggestionsFetchRequested = debounce(({ value }: any) => {
        const url = `${environment.context}artist/artist-search`;
        fetch(url, {
            body: JSON.stringify({
                artistName: value
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST'
        })
            .then(resp => resp.json())
            .then(artistSuggestions => {
                this.setState({ artistSuggestions });
            })
            .catch(error => console.log(error))
    }, 300);

    public constructor(props: any) {
        super(props);
        this.state = {
            artistSuggestions: [],
            artistValue: '',
            selectedArtist: new Artist()
        }
    }

    public add = () => {
        const { selectedArtist } = this.state;
        if (selectedArtist.artistName && !this.props.artists.some((artist: Artist) => artist.spotifyArtistId === selectedArtist.spotifyArtistId)) {
            this.props.artistFunction(selectedArtist);
            this.setState({
                artistValue: '',
                selectedArtist: new Artist()
            });
        }
    }

    public onArtistChange = (e: any, { newValue }: any) => {
        this.setState({
            artistValue: newValue
        });
    };

    public onArtistSuggestionsClearRequested = () => {
        this.setState({
            artistSuggestions: [],
        });
    };

    public render() {
        const { artistSuggestions, artistValue } = this.state;
        const inputArtistProps = {
            onChange: this.onArtistChange,
            placeholder: 'Add a artist...',
            value: artistValue
        };
        return (
            <Row className='margin-bottom-10'>
                <Col xs={9} sm={10} md={9} lg={10}>
                    <Autosuggest
                        suggestions={artistSuggestions}
                        onSuggestionsFetchRequested={this.onArtistSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onArtistSuggestionsClearRequested}
                        getSuggestionValue={(artistSuggestion: Artist) => {
                            this.setState({ selectedArtist: artistSuggestion });
                            return artistSuggestion.artistName;
                        }}
                        renderSuggestion={(suggestion: Artist) => <span> {suggestion.artistName} </span>}
                        inputProps={inputArtistProps}
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