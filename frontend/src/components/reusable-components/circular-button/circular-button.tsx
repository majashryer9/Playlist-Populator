import * as React from 'react';

interface IProps {
    icon: any;
    onClick: any;
}

export default class CircularButton extends React.Component<IProps, any> {
    public constructor(props: IProps) {
        super(props);
    }

    public render() {
        const { icon, onClick } = this.props;
        return (
            <div className='circular-button-container' onClick={onClick}>
                {icon}
            </div>
        );
    }
}