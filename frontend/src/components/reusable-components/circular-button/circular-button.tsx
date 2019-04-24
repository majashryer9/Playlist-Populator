import * as React from 'react';

interface IProps {
    icon: any;
    onClick: any;
    height: number,
    width: number
}

export default class CircularButton extends React.Component<IProps, any> {
    public constructor(props: IProps) {
        super(props);
    }

    public render() {
        const { icon, onClick, height, width } = this.props;
        return (
            <div
                className='circular-button-container'
                onClick={onClick}
                style={{
                    'height': `${height}px`,
                    'width': `${width}px`
                }}
            >
                {icon}
            </div>
        );
    }
}