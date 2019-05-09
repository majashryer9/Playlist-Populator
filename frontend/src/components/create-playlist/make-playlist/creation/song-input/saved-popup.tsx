import * as React from 'react';
import { MdCheckCircle } from 'react-icons/md';
import { Modal, ModalBody } from 'reactstrap';

interface IProps {
    showPopup: boolean;
}

export default class SavedPopup extends React.Component<IProps, any> {
    public constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <Modal className='saved-pop-up' isOpen={this.props.showPopup}>
                <ModalBody>
                    <div>
                        Playlist Successfully Saved!
                    </div>
                    <div className='success-icon-container'>
                        <MdCheckCircle />
                    </div>
                </ModalBody>
            </Modal>
        )
    }
}