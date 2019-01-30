import * as React from 'react';
import { FaRegTimesCircle } from 'react-icons/fa';

export default class CategoryChip extends React.Component<any, any> {
    public constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <div className='category-chip'>
                {this.props.categoryName} <FaRegTimesCircle />
            </div>
        )
    }
}