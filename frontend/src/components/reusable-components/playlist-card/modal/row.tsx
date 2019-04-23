import * as React from 'react';
import { Song } from 'src/models/Song';
import { FaRegPlayCircle, FaRegPauseCircle } from 'react-icons/fa';
import { IState, IPlaylistState } from 'src/reducers';
import * as playlistActions from '../../../../actions/playlist/playlist-actions';
import { connect } from 'react-redux';

interface IProps extends IPlaylistState {
    curRef: any;
    playing: boolean;
    song: Song;
    setCurRef: (curRef: any) => void;
    setNewTimeout: (timeout: any) => void;
    setPlaying: (playing: boolean) => void;
    timeout: any;
}

interface IPlaylistModalState {
    ref: any;
}

export class ModalRow extends React.Component<IProps, IPlaylistModalState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
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

    public render() {
        const { curRef, playing, song } = this.props;
        const { ref } = this.state;
        return (
            <div className='modal-table-row' key={song.spotifyTrackId}>
                <div className='album-art-song-info-wrapper'>
                    <div className='album-art-wrapper'>
                        <img className='album-art' src={song.albumArtUrl} alt='album art' />
                    </div>
                    <div className='song-info'>
                        <div className='font-16-medium song-name'>{song.name}</div>
                        <div className='font-14-medium artist-name'>{song.artistName}</div>
                    </div>
                </div>
                <div className='play-pause-wrapper'>
                    {
                        song.previewUrl &&
                        <div onClick={() => this.playOrPause(ref)}>
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
                        </div>
                    }
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state: IState) => (state.playlist);
const mapDispatchToProps = {
    setCurRef: playlistActions.setCurRef,
    setNewTimeout: playlistActions.setNewTimeout,
    setPlaying: playlistActions.setPlaying
}
export default connect(mapStateToProps, mapDispatchToProps)(ModalRow);