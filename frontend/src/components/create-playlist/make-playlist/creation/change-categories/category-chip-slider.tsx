import * as React from 'react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { Swipeable } from 'react-swipeable';
import CategoryChip from './chip';

interface IProps {
    arrayOfItems: any[],
    spacing: number,
    width: number
}

interface IState {
    curIndex: number
}

export default class CategoryChipSlider extends React.Component<IProps, IState> {
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
        const { spacing, width } = this.props;
        return `translateX(-${curIndex * (width + spacing)}px)`;
    }

    public render() {
        const { arrayOfItems } = this.props;
        const { curIndex } = this.state;
        return (
            <Swipeable
                onSwipedLeft={this.nextSlide}
                onSwipedRight={this.prevSlide}
            >
                <div className='slider-wrapper'>
                    <div
                        className={(curIndex === 0) ? 'hide-arrow left-arrow' : 'arrow-wrapper left-arrow'}
                    >
                        <FaChevronLeft onClick={this.prevSlide} />
                    </div>
                    <div
                        className='items-wrapper'
                        style={{ transform: this.transform() }}
                    >
                        {
                            arrayOfItems.map((item: any, index: number) => {
                                return (
                                    <div key={item}>
                                        <CategoryChip categoryName={item} />
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div
                        className={(curIndex === arrayOfItems.length - 1) ? 'hide-arrow right-arrow' : 'arrow-wrapper right-arrow'}
                    >
                        <FaChevronRight onClick={this.nextSlide} />
                    </div>
                </div>
            </Swipeable>
        )
    }
}