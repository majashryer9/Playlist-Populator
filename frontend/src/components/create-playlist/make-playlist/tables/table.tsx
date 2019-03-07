import * as React from 'react';
import { Table } from 'reactstrap';
import { Song } from 'src/models/Song';

interface IProps {
    buttonClick: (song: Song) => void;
    buttonLabel: string;
    className: string;
    icon: any;
    songs: Song[];
}

export default class SongsTable extends React.Component<IProps, any> {
    public constructor(props: any) {
        super(props);
    }

    public render() {
        const { buttonClick, buttonLabel, className, icon, songs } = this.props;
        return (
            <div className={`${className} table-responsive songs-table-wrapper`}>
                <Table>
                    <thead>
                        <tr>
                            <th className='song-album-art-table-elements'></th>
                            <th>Song Name</th>
                            <th>Artist Name</th>
                            <th>{buttonLabel}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {songs.map((song: Song) => {
                            return (
                                <tr key={song.spotifyTrackId}>
                                    <td className='song-album-art-table-elements'>
                                        <img
                                            alt='album art'
                                            className='song-album-art'
                                            src={song.albumArtUrl}
                                        />
                                    </td>
                                    <td>{song.name}</td>
                                    <td>{song.artistName}</td>
                                    <td>
                                        <div onClick={() => buttonClick(song)}>
                                            {icon}
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        )
    }
}