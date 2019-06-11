import * as React from 'react';
import { IPlaylistState, IState } from 'src/reducers';
import { connect } from 'react-redux';
import { environment } from 'src/environment';
import { Playlist } from 'src/models/Playlist';
import PlaylistCard from '../reusable-components/playlist-card/card';

export class MyProfileContainer extends React.Component<IPlaylistState, any> {
    public constructor(props: any) {
        super(props);
        this.state = {
            playlists: []
        }
    }

    public componentDidUpdate(prevProps: IPlaylistState) {
        console.log(this.props.userId);
        if (!prevProps.userId && this.props.userId) {
            const url = `${environment.context}playlist/user-playlists?userId=${this.props.userId}`;
            fetch(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then(resp => resp.json())
                .then(resp => this.setState({
                    playlists: resp
                }))
                .catch(err => console.log(err));
        }
    }

    public render() {
        return (
            <div>
                {
                    this.state.playlists.map((playlist: Playlist) => {
                        return (
                            <PlaylistCard
                                key={playlist.id}
                                playlist={playlist}
                            />
                        )
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = (state: IState) => (state.playlist);
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(MyProfileContainer);