import * as React from 'react';
import { Song } from 'src/models/Song';
import TableRow from './table-row';
import { connect } from 'react-redux';
import * as playlistActions from '../../../../actions/playlist/playlist-actions';
import { IState, IPlaylistState } from 'src/reducers';
import CircularButton from 'src/components/reusable-components/circular-button/circular-button';
import { FaMusic } from 'react-icons/fa';

interface IProps extends IPlaylistState {
    buttonClick: (song: Song) => void;
    getSimilarSongs: () => void;
    getSpotifyRecommendations: () => void;
    icon: any;
    includePopulateButton?: boolean;
    savePlaylist: (saved: boolean) => void;
    setPopulated: (populated: boolean) => void;
    songs: Song[];
}

export class SongsTable extends React.Component<IProps, any> {
    public constructor(props: any) {
        super(props);
    }

    public populate = () => {
        this.props.setPopulated(true);
        this.props.savePlaylist(false);
        this.props.getSimilarSongs();
        this.props.getSpotifyRecommendations();
    }

    public render() {
        const { buttonClick, icon, includePopulateButton, populated, songs } = this.props;
        return (
            <div className='table-rows-wrapper'>
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