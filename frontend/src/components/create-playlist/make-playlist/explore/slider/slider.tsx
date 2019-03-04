import * as React from 'react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

interface IProps {
    arrayOfItems: any[]
}

interface IState {
    curIndex: number
}

const SPACE_BETWEEN_ITEMS = 40;
const WIDTH_OF_ITEM = 300;
export default class Slider extends React.Component<IProps, IState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            curIndex: 0
        }
    }

    public nextSlide = () => {
        const { arrayOfItems } = this.props;
        const { curIndex } = this.state;
        if (curIndex !== arrayOfItems.length - 1) {
            this.setState((prevState: any) => ({
                curIndex: prevState.curIndex + 1
            }))
        }
    }

    public prevSlide = () => {
        const { curIndex } = this.state;
        if (curIndex !== 0) {
            this.setState((prevState: any) => ({
                curIndex: prevState.curIndex - 1
            }))
        }
    }

    public transform = () => {
        const { curIndex } = this.state;
        return `translateX(-${curIndex * (WIDTH_OF_ITEM + SPACE_BETWEEN_ITEMS)}px)`;
    }

    public render() {
        const { arrayOfItems } = this.props;
        const { curIndex } = this.state;
        return (
            <div className='slider-wrapper'>
                <div className='arrow-wrapper'>
                    {curIndex !== 0 && <FaChevronLeft onClick={this.prevSlide} />}
                </div>
                <div className='highlighted-item-wrapper'>
                    <div className='items-wrapper'
                        style={{ transform: this.transform() }}
                    >
                        {arrayOfItems.map((item: any, index: number) => {
                            return (
                                <div className={(index === curIndex) ? 'item-active' : 'item-not-active'}
                                    key={index}
                                >
                                    {item}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className='arrow-wrapper'>
                    {curIndex !== arrayOfItems.length - 1 && <FaChevronRight onClick={this.nextSlide} />}
                </div>
            </div>
        )
    }
}