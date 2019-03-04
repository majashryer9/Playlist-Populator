import * as React from 'react';
import { Input } from 'reactstrap';

export default class PlaylistInformation extends React.Component<any, any> {
    public constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <div className='playlist-information-wrapper'>
                <Input className='playlist-name-input' placeholder='Name your playlist...' type='text' />
                <Input placeholder='Describe your playlist...' type='textarea' />
            </div>
        )
    }
}