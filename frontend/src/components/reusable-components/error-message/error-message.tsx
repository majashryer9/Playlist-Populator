import * as React from 'react';
import { MdError } from 'react-icons/md';

interface IProps {
    errorMessage: string;
}

export default class ErrorMessage extends React.Component<IProps, any> {
    public constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <div className='error-message-container'>
                <div className='error-icon-container'>
                    <MdError />
                </div>
                <div>
                    {this.props.errorMessage}
                </div>
            </div>
        );
    }
}