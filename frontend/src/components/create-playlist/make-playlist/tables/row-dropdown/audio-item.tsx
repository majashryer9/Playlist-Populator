import * as React from 'react';
import { Song } from 'src/models/Song';
import { FaRegPlayCircle, FaRegPauseCircle } from 'react-icons/fa';
import { IPlaylistState, IState } from 'src/reducers';
import { connect } from 'react-redux';
import * as playlistActions from '../../../../../actions/playlist/playlist-actions';

interface IProps extends IPlaylistState {
    setCurRef: (curRef: any) => void;
    setNewTimeout: (timeout: any) => void;
    setPlaying: (playing: boolean) => void;
    song: Song;
    timeout: any;
}

interface IAudioItemState {
    ref: any;
}

export class AudioItem extends React.Component<IProps, IAudioItemState> {
    public constructor(props: any) {
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
            <div
                className='top-ten-item-wrapper'
                onClick={() => this.playOrPause(ref)}
            >
                <div className='audio-and-image-wrapper'>
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
                    <img
                        alt='album art'
                        className={`album-art ${(playing && (ref && curRef && (curRef.id === ref.id))) ? 'half-opacity' : ''}`}
                        key={song.spotifyTrackId}
                        src={song.albumArtUrl}
                    />
                </div>
                <div className='song-info-wrapper'>
                    <div className='font-12-medium'>
                        {song.name}
                    </div>
                    <div className='font-12-regular'>
                        {song.artistName}
                    </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(AudioItem);