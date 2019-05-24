import * as React from 'react';
import { FaTimes } from 'react-icons/fa';

interface IProps {
    dataToDisplay: string;
    removeFunction: (uniqueIdentifier: string) => void;
    uniqueIdentifier: string;
}

export default class SearchChip extends React.Component<IProps, any> {
    public constructor(props: any) {
        super(props);
    }

    public remove = () => {
        this.props.removeFunction(this.props.uniqueIdentifier);
    }

    public render() {
        return (
            <div className='search-chip-container'>
                <div className='data-to-display-container'>
                    <div className='text-wrapper'>
                        {this.props.dataToDisplay}
                    </div>
                </div>
                <div className='remove-search-chip-container'>
                    <FaTimes onClick={this.remove} />
                </div>
            </div>
        );
    }
}