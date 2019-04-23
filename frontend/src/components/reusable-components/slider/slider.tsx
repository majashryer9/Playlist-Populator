import * as React from 'react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { Swipeable } from 'react-swipeable';
import * as reusableFunctions from '../../../util/reusable-functions';

interface IProps {
    arrayOfItems: any[],
    fontSize: number,
    height: number,
    mobileFontSize?: number,
    mobileHeight?: number,
    mobileSpacing?: number,
    mobileWidth?: number,
    spacing: number,
    width: number,
    wrapperPadding: number
}

interface IState {
    arrowSize: number,
    curIndex: number,
    heightOfItem: number,
    spaceBetweenItems: number,
    widthOfItem: number
}

export default class Slider extends React.Component<IProps, IState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            arrowSize: (reusableFunctions.isMobile() && props.mobileFontSize) ? props.mobileFontSize : props.fontSize,
            curIndex: 0,
            heightOfItem: (reusableFunctions.isMobile() && props.mobileHeight) ? props.mobileHeight : props.height,
            spaceBetweenItems: (reusableFunctions.isMobile() && props.mobileSpacing) ? props.mobileSpacing : props.spacing,
            widthOfItem: (reusableFunctions.isMobile() && props.mobileWidth) ? props.mobileWidth : props.width
        }
    }

    public componentDidMount() {
        window.addEventListener('resize', this.detectForMobile);
    }

    public componentWillUnmount() {
        window.removeEventListener('resize', this.detectForMobile);
    }

    public detectForMobile = () => {
        const { mobileFontSize, mobileHeight, mobileSpacing, mobileWidth, fontSize, height, spacing, width } = this.props;
        if (mobileFontSize || mobileHeight || mobileSpacing || mobileWidth) {
            if (reusableFunctions.isMobile()) {
                this.setState({
                    arrowSize: mobileFontSize ? mobileFontSize : fontSize,
                    heightOfItem: mobileHeight ? mobileHeight : height,
                    spaceBetweenItems: mobileSpacing ? mobileSpacing : spacing,
                    widthOfItem: mobileWidth ? mobileWidth : width
                })
            }
            else {
                this.setState({
                    arrowSize: fontSize,
                    heightOfItem: height,
                    spaceBetweenItems: spacing,
                    widthOfItem: width
                })
            }
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
        const { arrayOfItems, wrapperPadding } = this.props;
        const { arrowSize, curIndex, heightOfItem, spaceBetweenItems, widthOfItem } = this.state;
        return (
            <div className='outer-slider-wrapper'>
                <Swipeable
                    onSwipedLeft={this.nextSlide}
                    onSwipedRight={this.prevSlide}
                >
                    <div
                        className='slider-wrapper'
                        style={{ padding: `${wrapperPadding}px 0` }}
                    >
                        <div className='position-relative'>
                            <div
                                className={(curIndex === 0) ? 'hide-arrow' : 'arrow-wrapper left-arrow'}
                                style={{ fontSize: `${arrowSize}px` }}
                            >
                                <FaChevronLeft onClick={this.prevSlide} />
                            </div>
                        </div>
                        <div
                            className='highlighted-item-wrapper'
                            style={{
                                height: `${heightOfItem}px`,
                                width: `${widthOfItem}px`
                            }}
                        >
                            <div className='items-wrapper'
                                style={{ transform: this.transform() }}
                            >
                                {arrayOfItems.map((item: any, index: number) => {
                                    return (
                                        <div
                                            className={(index === curIndex) ? 'item-active' : 'item-not-active'}
                                            key={index}
                                            style={{
                                                height: `${heightOfItem}px`,
                                                marginRight: spaceBetweenItems,
                                                width: `${widthOfItem}px`
                                            }}
                                        >
                                            {item}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className='position-relative'>
                            <div
                                className={(curIndex === arrayOfItems.length - 1) ? 'hide-arrow' : 'arrow-wrapper right-arrow'}
                                style={{ fontSize: `${arrowSize}px` }}
                            >
                                <FaChevronRight onClick={this.nextSlide} />
                            </div>
                        </div>
                    </div>
                </Swipeable>
            </div>
        )
    }
}