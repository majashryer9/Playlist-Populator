import * as React from 'react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { Swipeable } from 'react-swipeable';
import * as reusableFunctions from '../../../../../util/reusable-functions';

interface IProps {
    arrayOfItems: any[]
}

interface IState {
    curIndex: number,
    spaceBetweenItems: number,
    widthOfItem: number
}

export default class Slider extends React.Component<IProps, IState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            curIndex: 0,
            spaceBetweenItems: reusableFunctions.isMobile() ? 20 : 40,
            widthOfItem: reusableFunctions.isMobile() ? 180 : 300
        }
    }

    public componentDidMount() {
        window.addEventListener('resize', this.detectForMobile);
    }

    public componentWillUnmount() {
        window.removeEventListener('resize', this.detectForMobile);
    }

    public detectForMobile = () => {
        if (reusableFunctions.isMobile()) {
            this.setState({
                spaceBetweenItems: 20,
                widthOfItem: 180
            })
        }
        else {
            this.setState({
                spaceBetweenItems: 40,
                widthOfItem: 300
            })
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
        const { curIndex, spaceBetweenItems, widthOfItem } = this.state;
        return `translateX(-${curIndex * (widthOfItem + spaceBetweenItems)}px)`;
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
                    <div className={(curIndex === 0) ? 'hide-arrow' : 'arrow-wrapper'}>
                        <FaChevronLeft onClick={this.prevSlide} />
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
                    <div className={(curIndex === arrayOfItems.length - 1) ? 'hide-arrow' : 'arrow-wrapper'}>
                        <FaChevronRight onClick={this.nextSlide} />
                    </div>
                </div>
            </Swipeable>
        )
    }
}