import * as React from 'react';
import { FaCamera } from 'react-icons/fa';
import { connect } from 'react-redux';
import { Container, Row, Col, Modal, Input, Button } from 'reactstrap';
import { environment } from 'src/environment';
import { IPlaylistState, IState } from 'src/reducers';
import * as playlistActions from 'src/actions/playlist/playlist-actions';

interface IProps extends IPlaylistState {
    clearUnsplashImageUrl: () => void;
    clearUploadedImage: () => void;
    setUnsplashImageUrl: (unplashImageUrl: string) => void;
    setUploadedImage: (uploadedImage: File) => void;
}

interface IPlaylistImageState {
    imageUrls: string[];
    inputRef: any;
    modal: boolean;
    photoSearchQuery: string;
    savedImageUrl: any;
    unsavedImageUrl: any;
    unsplashImageUrlInState: string;
    uploadedImageInState: any;
}

export class PlaylistImage extends React.Component<IProps, IPlaylistImageState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            imageUrls: [],
            inputRef: null,
            modal: false,
            photoSearchQuery: '',
            savedImageUrl: '',
            unsavedImageUrl: '',
            unsplashImageUrlInState: '',
            uploadedImageInState: null
        }
    }

    public async componentDidMount() {
        const imageUrls = await this.getPlaylistImage();
        const firstImageUrl = imageUrls.length && imageUrls[0];
        this.props.setUnsplashImageUrl(firstImageUrl);
        this.setState({
            imageUrls,
            savedImageUrl: firstImageUrl,
            unsavedImageUrl: firstImageUrl,
            unsplashImageUrlInState: firstImageUrl
        })
    }

    public clickInputRef = () => {
        if (this.state.inputRef) {
            this.state.inputRef.click();
            this.state.inputRef.value = null;
        }
    }

    public getDifferentPhotos = async () => {
        const imageUrls = await this.getPlaylistImage(this.state.photoSearchQuery);
        this.setState({
            imageUrls
        });
    }

    public getPlaylistImage = (query: string = 'nature') => {
        const url = `${environment.context}playlist/photo?query=${query}`;
        return fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resp => resp.json())
            .catch(error => console.log(error));
    }

    public setPhotoSearchQuery = (e: any) => {
        this.setState({
            photoSearchQuery: e.target.value
        });
    }

    public setInputRef = (inputRef: any) => {
        this.setState({ inputRef });
    }

    public setSavedImageUrl = () => {
        this.setState({ savedImageUrl: this.state.unsavedImageUrl });
        if (this.props.uploadedImage) { this.props.clearUploadedImage() };
        if (this.props.newPlaylist.unsplashImageUrl) { this.props.clearUnsplashImageUrl() };
        if (this.state.uploadedImageInState) { this.props.setUploadedImage(this.state.uploadedImageInState) };
        if (this.state.unsplashImageUrlInState) { this.props.setUnsplashImageUrl(this.state.unsplashImageUrlInState) };
        this.toggle();
    }

    public toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    public unsplashImageUrl = (imageUrl: string) => {
        this.setState({
            unsavedImageUrl: imageUrl,
            unsplashImageUrlInState: imageUrl,
            uploadedImageInState: null
        })
    }

    public uploadImage = (e: any) => {
        const file = e.target.files.length && e.target.files[0];
        if (file && file.type.includes('image')) {
            this.setState({
                unsplashImageUrlInState: '',
                uploadedImageInState: file
            });
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                const unsavedImageUrl = (fileReader.result) ? fileReader.result : this.state.unsavedImageUrl;
                this.setState({ unsavedImageUrl });
            }
        }
    }

    public render() {
        return (
            <>
                <div className='playlist-image-container'>
                    <div className='playlist-image-text-container'>
                        <div>
                            We require that each playlist has an associated playlist image.
                            Click the image to choose a different photo or to upload your own.
                        </div>
                    </div>
                    <div>
                        {this.state.savedImageUrl && <img className='playlist-image picked-image' onClick={this.toggle} src={this.state.savedImageUrl} alt='playlist image' />}
                    </div>
                </div>
                <Modal className='playlist-image-modal' isOpen={this.state.modal} toggle={this.toggle}>
                    <Container>
                        <Row>
                            <Col xs={12} sm={4}>
                                <div className='left instructions-and-button-wrapper'>
                                    <div>
                                        To the right is your current playlist image.
                                        You may choose to keep this, pick a photo from
                                        one of the other options below, search for more photos,
                                        or upload your own image. Please save whatever image you choose.
                                            </div>
                                </div>
                            </Col>
                            <Col xs={8} sm={4}>
                                <div className='center'>
                                    <img
                                        alt='playlist image'
                                        className='playlist-image'
                                        onClick={this.toggle}
                                        src={this.state.unsavedImageUrl}
                                    />
                                </div>
                            </Col>
                            <Col xs={4} sm={4}>
                                <div className='right'>
                                    <div>
                                        <div>
                                            Click the camera to upload your own image
                                                </div>
                                        <div className='camera-icon-container' onClick={this.clickInputRef}>
                                            <FaCamera />
                                            <input className='file-input' onChange={this.uploadImage} type='file' accept='image/*' ref={this.setInputRef} />
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={8} sm={10}>
                                <div className='left'>
                                    <Input className='font-override' onChange={this.setPhotoSearchQuery} type='text' placeholder='Search for a new photo...' alt='enter photo query' />
                                </div>
                            </Col>
                            <Col xs={4} sm={2}>
                                <div className='right'>
                                    <Button className='font-override' disabled={!this.state.photoSearchQuery} onClick={this.getDifferentPhotos}> Search </Button>
                                </div>
                            </Col>
                        </Row>
                        <Row className='playlist-image-wrapper'>
                            {this.state.imageUrls.length &&
                                this.state.imageUrls
                                    .filter((imageUrl: string) => imageUrl !== this.state.unsavedImageUrl)
                                    .map((imageUrl: string, index: number) => {
                                        return (
                                            <Col key={imageUrl} sm={4}>
                                                <div className={(index % 3 === 0) ? 'left' : (index % 3 === 2) ? 'right' : 'center'}>
                                                    <img className='playlist-image' onClick={() => this.unsplashImageUrl(imageUrl)} src={imageUrl} alt='playlist image option' />
                                                </div>
                                            </Col>
                                        );
                                    })
                            }
                        </Row>
                        <Row className='save-and-cancel-buttons-wrapper'>
                            <Col sm={12}>
                                <div className='save-and-cancel-buttons'>
                                    <Button className='font-override' onClick={this.setSavedImageUrl}> Save </Button>
                                    <Button className='font-override' onClick={this.toggle}> Cancel </Button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Modal>
            </>
        )
    }
}

const mapStateToProps = (state: IState) => (state.playlist);
const mapDispatchToProps = {
    clearUnsplashImageUrl: playlistActions.clearUnsplashImageUrl,
    clearUploadedImage: playlistActions.clearUploadedImage,
    setUnsplashImageUrl: playlistActions.setUnsplashImageUrl,
    setUploadedImage: playlistActions.setUploadedImage
}
export default connect(mapStateToProps, mapDispatchToProps)(PlaylistImage);