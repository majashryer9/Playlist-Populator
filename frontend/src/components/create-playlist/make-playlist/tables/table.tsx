import * as React from 'react';
import { Song } from '../../../../models/Song';
import { Table, Button } from 'reactstrap';

interface IProps {
    buttonClick: (song: Song) => void,
    buttonDisabled?: boolean,
    buttonLabel: string,
    songs: Song[],
}

export default class SongsTable extends React.Component<IProps, any> {
    public constructor(props: any) {
        super(props);
    }

    public render() {
        const { songs, buttonLabel } = this.props;
        return (
            <div className='table-responsive songs-table-wrapper'>
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
                                    <td><Button onClick={() => this.props.buttonClick(song)} disabled={(this.props.buttonDisabled)? this.props.buttonDisabled : false}>{buttonLabel}</Button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        )
    }
}