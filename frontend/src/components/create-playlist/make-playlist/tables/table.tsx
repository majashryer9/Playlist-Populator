import * as React from 'react';
import { Song } from 'src/models/Song';
import TableRow from './table-row';
import { connect } from 'react-redux';
import * as playlistActions from '../../../../actions/playlist/playlist-actions';
import { IState, IPlaylistState } from 'src/reducers';
import CircularButton from 'src/components/reusable-components/circular-button/circular-button';
import { FaMusic } from 'react-icons/fa';
import { Alert } from 'reactstrap';

interface IProps extends IPlaylistState {
    buttonClick: (song: Song) => void;
    getSimilarSongs: () => void;
    getSpotifyRecommendations: () => void;
    icon: any;
    includePopulateButton?: boolean;
    savePlaylist: (saved: boolean) => void;
    setPopulated: (populated: boolean) => void;
    songs: Song[];
    tableLabel: string;
}

interface ISongsTableState {
    ref: any;
}

export class SongsTable extends React.Component<IProps, ISongsTableState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            ref: null
        }
    }

    public alertMessage = () => {
        switch (this.props.songs.length) {
            case 3:
                return (
                    <Alert color="success">
                        Click the button to generate your playlist or add up to two more songs!
                    </Alert>
                );
            case 4:
                return (
                    <Alert color="success">
                        Click the button to generate your playlist or add another song!
                    </Alert>
                );
        }
        return (
            <Alert color="success">
                You have reached the maximum number of songs you can enter before generating your playlist.
                Click the button to generate your playlist!
            </Alert>
        );
    }

    public populate = () => {
        this.props.setPopulated(true);
        this.props.savePlaylist(false);
        this.props.getSimilarSongs();
        this.props.getSpotifyRecommendations();
    }

    public setRef = (ref: any) => {
        this.setState({
            ref
        });
    }

    public componentDidUpdate(prevProps: IProps) {
        const { ref } = this.state;
        const { populated, includePopulateButton } = this.props;
        if (includePopulateButton && !populated && prevProps.songs.length !== this.props.songs.length) {
            ref.scrollTop = ref.scrollHeight - ref.clientHeight;
        }
        else if (populated) {
            ref.scrollTop = 0;
        }
    }

    public render() {
        const { buttonClick, icon, includePopulateButton, populated, songs } = this.props;
        return (
            <>
                <div
                    className='table-rows-wrapper'
                    ref={this.setRef}
                >
                    <div className='table-label'> {this.props.tableLabel} </div>
                    {
                        songs.map((song: Song) => {
                            return (
                                <TableRow
                                    buttonClick={buttonClick}
                                    icon={icon}
                                    key={song.spotifyTrackId}
                                    song={song}
                                />
                            )
                        })
                    }
                    {
                        (includePopulateButton && !populated && songs.length >= 3) ?
                            <div className='populate-button-container'>
                                {this.alertMessage()}
                                <CircularButton
                                    onClick={this.populate}
                                    icon={<FaMusic />}
                                    height={50}
                                    width={50}
                                />
                            </div>
                            : null
                    }
                </div>
            </>
        )
    }
}

const mapStateToProps = (state: IState) => (state.playlist);
const mapDispatchToProps = {
    getSimilarSongs: playlistActions.getSimilarSongs,
    getSpotifyRecommendations: playlistActions.getSpotifyRecommendations,
    savePlaylist: playlistActions.savePlaylist,
    setPopulated: playlistActions.setPopulated
}
export default connect(mapStateToProps, mapDispatchToProps)(SongsTable);