import * as React from 'react';
import * as Autosuggest from 'react-autosuggest';
import { IPlaylistState, IState } from 'src/reducers';
import { Artist } from 'src/models/Artist';
import { connect } from 'react-redux';
import { debounce } from 'debounce';
import { environment } from 'src/environment';
import CircularButton from 'src/components/reusable-components/circular-button/circular-button';
import { FaPlus } from 'react-icons/fa';
import * as playlistActions from 'src/actions/playlist/playlist-actions';
import { Row, Col } from 'reactstrap';

interface IProps extends IPlaylistState {
    addArtistForSearch: (artistForSearch: Artist) => void;
}

interface IArtistSearchState {
    artistSuggestions: Artist[];
    selectedArtist: Artist;
    artistValue: string;
}

export class ArtistSearch extends React.Component<IProps, IArtistSearchState> {
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
        if (!this.props.artistsForSearch.some((artistForSearch: Artist) => artistForSearch.spotifyArtistId === selectedArtist.spotifyArtistId)) {
            this.props.addArtistForSearch(selectedArtist);
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
            <Row>
                <Col sm={10}>
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
                <Col sm={2}>
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
    addArtistForSearch: playlistActions.addArtistForSearch
}
export default connect(mapStateToProps, mapDispatchToProps)(ArtistSearch);