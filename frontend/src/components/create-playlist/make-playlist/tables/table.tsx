import * as React from 'react';
import { Song } from 'src/models/Song';
import TableRow from './table-row';

interface IProps {
    buttonClick: (song: Song) => void;
    icon: any;
    songs: Song[];
}

export default class SongsTable extends React.Component<IProps, any> {
    public constructor(props: any) {
        super(props);
    }

    public render() {
        const { buttonClick, icon, songs } = this.props;
        return (
            <div className='table-rows-wrapper'>
                {songs.map((song: Song) => {
                    return (
                        <TableRow
                            buttonClick={buttonClick}
                            icon={icon}
                            key={song.spotifyTrackId}
                            song={song}
                        />
                    );
                })}
            </div>
        )
    }
}