import * as React from 'react';
import { Song } from '../../../models/Song';
import { Table, Button } from 'reactstrap';

interface IProps {
    buttonLabel: string,
    songs: Song[]
}

export default class SongsTable extends React.Component<IProps, any> {
    public constructor(props: any) {
        super(props);
    }

    public render() {
        const { songs, buttonLabel } = this.props;
        return (
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>Song Name</th>
                            <th>Artist Name</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {songs.map((song: Song) => {
                            return (
                                <tr key={song.spotifyTrackId}>
                                    <td>{song.name}</td>
                                    <td>{song.artistName}</td>
                                    <td><Button>{buttonLabel}</Button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        )
    }
}