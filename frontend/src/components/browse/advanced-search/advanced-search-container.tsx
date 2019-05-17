import * as React from 'react';
import * as Autosuggest from 'react-autosuggest';
import Select from 'react-select';
import { debounce } from 'debounce';
import { environment } from 'src/environment';
import { Song } from 'src/models/Song';
import { Category } from 'src/models/Category';
import { IState, IPlaylistState } from 'src/reducers';
import { connect } from 'react-redux';
import { Artist } from 'src/models/Artist';

interface IAdvancedSearchContainerState {
    artistSuggestions: Artist[];
    selectedArtist: Artist;
    selectedSong: Song;
    selectedCategory: Category;
    songSuggestions: Song[];
    artistValue: string;
    songValue: string;
}

export class AdvancedSearchContainer extends React.Component<IPlaylistState, IAdvancedSearchContainerState> {
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
            artistSuggestions: [],
            artistValue: '',
            selectedArtist: new Artist(),
            selectedCategory: new Category(),
            selectedSong: new Song(),
            songSuggestions: [],
            songValue: ''
        }
    }

    public onArtistChange = (e: any, { newValue }: any) => {
        this.setState({
            artistValue: newValue
        });
    };

    public onSongChange = (e: any, { newValue }: any) => {
        this.setState({
            songValue: newValue
        });
    };

    public onArtistSuggestionsClearRequested = () => {
        this.setState({
            artistSuggestions: [],
        });
    };

    public onSongSuggestionsClearRequested = () => {
        this.setState({
            songSuggestions: [],
        });
    };

    public render() {
        const { artistSuggestions, songSuggestions, artistValue, songValue } = this.state;
        const inputArtistProps = {
            onChange: this.onArtistChange,
            placeholder: 'Add a artist...',
            value: artistValue
        };
        const inputSongProps = {
            onChange: this.onSongChange,
            placeholder: 'Add a song...',
            value: songValue
        };
        /* tslint:disable */
        const options = this.props.categories.map((category: Category) => { return { value: category, label: category.name } })
        const playlistCategoryNames = this.props.newPlaylist.categories.map((category: Category) => category.name);
        return (
            <div>
                <Select
                    onChange={(selectedOption: any) => {
                        this.setState({ selectedCategory: selectedOption.value });
                    }}
                    // filter out any categories that have already been selected
                    options={options.filter((option: any) => !playlistCategoryNames.some((playlistCategoryName: string) => playlistCategoryName === option.label))}
                    placeholder='Add category...'
                    value={(this.state.selectedCategory.name) ? { value: this.state.selectedCategory, label: this.state.selectedCategory.name } : null}
                />
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
            </div>
        );
    }
}

const mapStateToProps = (state: IState) => (state.playlist);
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(AdvancedSearchContainer);