import * as React from 'react';
import { Song } from 'src/models/Song';
import RowDropdown from './row-dropdown/container';
import { FaRegPlayCircle, FaRegPauseCircle } from 'react-icons/fa';
import { IPlaylistState, IState } from 'src/reducers';
import * as playlistActions from '../../../../actions/playlist/playlist-actions';
import { connect } from 'react-redux';

interface IProps extends IPlaylistState {
    buttonClick: (song: Song) => void;
    icon: any;
    setCurRef: (curRef: any) => void;
    setNewTimeout: (timeout: any) => void;
    setPlaying: (playing: boolean) => void;
    song: Song;
    timeout: any;
}

interface ITableRowState {
    clicked: boolean;
    ref: any;
}

export class TableRow extends React.Component<IProps, ITableRowState> {
    public constructor(props: IProps) {
        super(props);
        this.state = {
            clicked: false,
            ref: null
        }
    }

    public playOrPause = (newRef: any) => {
        const { curRef, playing, setCurRef, setNewTimeout, setPlaying, timeout } = this.props;
        if ((!curRef && newRef) || curRef.id === newRef.id) {
            if (!playing) {
                newRef.play();
                setCurRef(newRef);
                setPlaying(true);
                setNewTimeout(setTimeout(() => {
                    setPlaying(false)
                }, (newRef.duration - newRef.currentTime) * 1000));
            }
            else {
                newRef.pause();
                clearTimeout(timeout);
                setCurRef(newRef);
                setPlaying(false);
            }
        }
        else {
            curRef.pause();
            newRef.play();
            clearTimeout(timeout);
            setCurRef(newRef);
            setPlaying(true);
            setNewTimeout(setTimeout(() => {
                setPlaying(false)
            }, (newRef.duration - newRef.currentTime) * 1000));
        }
    }

    public setRef = (ref: any) => {
        this.setState({
            ref
        });
    }

    public toggle = () => {
        this.setState((prevState: ITableRowState) => ({
            clicked: !prevState.clicked
        }));
    }

    public render() {
        const { curRef, buttonClick, icon, playing, song } = this.props;
        const { clicked, ref } = this.state;
        return (
            <>
                <div className='table-row'>
                    <div onClick={this.toggle} className='song-info'>
                        <div className='album-art-wrapper'>
                            <img
                                alt='album art'
                                className='album-art'
                                src={song.albumArtUrl}
                            />
                        </div>
                        <div className='song-and-artist-name-wrapper'>
                            <div className='song-name'>
                                {song.name}
                            </div>
                            <div className='artist-name'>
                                {song.artistName}
                            </div>
                        </div>
                    </div>
                    <div className='tr-icons-wrapper'>
                        <div onClick={() => this.playOrPause(ref)}>
                            {
                                song.previewUrl &&
                                <>
                                    <audio
                                        id={song.spotifyTrackId}
                                        ref={this.setRef}
                                        src={song.previewUrl}
                                    />
                                    <div className='play-icon-wrapper'>
                                        <FaRegPlayCircle
                                            className={(!playing || !curRef || (ref && curRef && (curRef.id !== ref.id))) ? 'show-play' : 'hide'}
                                        />
                                        <FaRegPauseCircle
                                            className={(playing && (ref && curRef && (curRef.id === ref.id))) ? 'show-pause' : 'hide'}
                                        />
                                    </div>
                                </>
                            }
                        </div>
                        <div className='icon-wrapper' onClick={() => buttonClick(song)}>
                            {icon}
                        </div>
                    </div>
                </div>
                <RowDropdown clicked={clicked} spotifyArtistId={song.spotifyArtistId} />
            </>
        );
    }
}

const mapStateToProps = (state: IState) => (state.playlist);
const mapDispatchToProps = {
    setCurRef: playlistActions.setCurRef,
    setNewTimeout: playlistActions.setNewTimeout,
    setPlaying: playlistActions.setPlaying
}
export default connect(mapStateToProps, mapDispatchToProps)(TableRow);