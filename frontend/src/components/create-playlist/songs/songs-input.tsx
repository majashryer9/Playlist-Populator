import * as React from 'react';
import { IPlaylistState, IState } from '../../../reducers';
import { connect } from 'react-redux';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { environment } from '../../../environment';
import * as playlistActions from '../../actions/playlist/playlist-actions';
import { Button, Card, CardBody, Row, Col } from 'reactstrap';
import ChangeCategoriesContainer from '../categories/change-categories-container';

interface IProps extends IPlaylistState {
    addSelectedSong: (selectedSong: string) => void
}

interface ISongsContainerState {
    inputtedSong: string,
    isLoading: boolean,
    reference: any,
    searchSuggestions: string[]
}

export class SongsInput extends React.Component<IProps, ISongsContainerState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            inputtedSong: '',
            isLoading: false,
            reference: null,
            searchSuggestions: []
        }
    }

    public chooseSong = () => {
        this.props.addSelectedSong(this.state.inputtedSong);
        this.state.reference.getInstance().clear();
    }

    public newPlaylistSongsLength = () => {
        const length = this.props.newPlaylist.songs.length;
        return 5 < length || length < 3;
    }

    public setRef = (reference: any) => {
        this.setState({
            ...this.state,
            reference
        })
    }

    public search = (query: string) => {
        this.setState({ isLoading: true });
        const url = `${environment.context}playlist/song-search`;
        fetch(url, {
            body: JSON.stringify({
                name: query
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST'
        })
            .then(resp => resp.json())
            .then(resp => {
                const songs = resp.map((song: any) => `${song.name} by ${(song.artists.length) ? song.artists[0].name : ''}`);
                this.setState({
                    ...this.state,
                    isLoading: false,
                    searchSuggestions: songs
                })
            })
            .catch(error => console.log(error))
    }

    public setInputtedSong = (song: string) => {
        this.setState({
            ...this.state,
            inputtedSong: song
        })
    }

    public populate = () => {
        const url = `${environment.context}playlist/populate`;
        fetch(url, {
            body: JSON.stringify(this.props.newPlaylist),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
        .then(resp => resp.json())
        .then(resp => {
            console.log(resp);
        })
    }

    public render() {
        return (
            <Card>
                <CardBody>
                    <Row>
                        <Col md={6}>
                            <AsyncTypeahead
                                isLoading={this.state.isLoading}
                                onChange={(selectedSong: any) => {
                                    if (selectedSong.length) {
                                        this.setInputtedSong(selectedSong[0]);
                                    }
                                }}
                                onSearch={(query: string) => {
                                    this.search(query);
                                    this.setInputtedSong(query);
                                }}
                                options={this.state.searchSuggestions}
                                placeholder='Add a song...'
                                ref={this.setRef}
                            />
                            <Button onClick={this.chooseSong}> Add Song </Button>
                            <Button disabled={this.newPlaylistSongsLength()} onClick={this.populate}> Populate Playlist </Button>
                        </Col>
                        <Col md={6}>
                            <ChangeCategoriesContainer />
                        </Col>
                    </Row>

                </CardBody>
            </Card>
        )
    }
}

const mapStateToProps = (state: IState) => (state.playlist);
const mapDispatchToProps = {
    addSelectedSong: playlistActions.addSelectedSong
}
export default connect(mapStateToProps, mapDispatchToProps)(SongsInput);