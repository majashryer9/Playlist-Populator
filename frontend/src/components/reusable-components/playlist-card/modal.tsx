import * as React from 'react';
import { Modal, ModalBody, Table } from 'reactstrap';
import { Song } from 'src/models/Song';

interface IProps {
    imageSrc: string;
    modal: boolean;
    songs: Song[];
    toggle: () => void;
}

export default class PlaylistModal extends React.Component<IProps, any> {

    constructor(props: IProps) {
        super(props);
    }

    public render() {
        const { imageSrc, modal, songs, toggle } = this.props;
        return (
            <Modal isOpen={modal} toggle={toggle}>
                <ModalBody className='playlist-modal-body' style={{ backgroundImage: `url(${imageSrc})` }}>
                    <div className='table-responsive songs-table-wrapper'>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Song Name</th>
                                    <th>Artist Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {songs.map((song: Song) => {
                                    return (
                                        <tr key={song.spotifyTrackId}>
                                            <td>{song.name}</td>
                                            <td>{song.artistName}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </div>
                </ModalBody>
            </Modal>
        );
    }
}
