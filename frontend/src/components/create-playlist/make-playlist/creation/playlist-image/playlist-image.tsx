import * as React from 'react';
import { FaCamera } from 'react-icons/fa';
import { environment } from '../../../../../environment';
import { IPlaylistState, IState } from '../../../../../reducers';
import { connect } from 'react-redux';
import { Container, Row, Col, Modal, Input, Button } from 'reactstrap';

interface IPlaylistImageState {
    imageUrls: string[];
    inputRef: any;
    modal: boolean;
    photoSearchQuery: string;
    selectedImageUrl: any;
}

export class PlaylistImage extends React.Component<IPlaylistState, IPlaylistImageState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            imageUrls: [],
            inputRef: null,
            modal: false,
            photoSearchQuery: '',
            selectedImageUrl: ''
        }
    }

    public async componentDidMount() {
        const imageUrls = await this.getPlaylistImage();
        this.setState({
            imageUrls,
            selectedImageUrl: imageUrls[0]
        })
    }

    public clickInputRef = () => {
        if(this.state.inputRef) {
            this.state.inputRef.click();
        }
    }

    public getDifferentPhotos = async () => {
        const imageUrls = await this.getPlaylistImage(this.state.photoSearchQuery);
        this.setState({
            imageUrls,
            selectedImageUrl: imageUrls[0]
        })
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

    public readFile = (e: any) => {
        const file = e.target.files.length && e.target.files[0];
        if(file && file.type.includes('image')) {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                const selectedImageUrl = (fileReader.result)? fileReader.result : this.state.selectedImageUrl;
                this.setState({ selectedImageUrl });
            }
            fileReader.readAsDataURL(file);
        }
    }

    public setPhotoSearchQuery = (e: any) => {
        this.setState({
            photoSearchQuery: e.target.value
        });
    }

    public setInputRef = (inputRef: any) => {
        this.setState({ inputRef });
    }

    public setSelectedImageUrl = (selectedImageUrl: any) => {
        this.setState({ selectedImageUrl });
    } 

    public toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    public render() {
        return (
            <Container>
                <Row>
                    <Col sm={12}>
                        <div className='playlist-image-container'>
                            {this.state.selectedImageUrl && <img className='playlist-image' onClick={this.toggle} src={this.state.selectedImageUrl} alt='playlist image' />}
                        </div>
                        <Modal isOpen={this.state.modal} toggle={this.toggle}>
                            <Container>
                                <Row>
                                    <Col sm={6}>
                                        <div className='playlist-image-modal-container'>
                                            {this.state.selectedImageUrl && <img className='margin-left-25' onClick={this.toggle} src={this.state.selectedImageUrl} alt='playlist image' />}
                                        </div>
                                    </Col>
                                    <Col sm={6}>
                                        <div className='upload-own-image-container'>
                                            <div className='upload-own-image-text-icon-container'>
                                                <div className='upload-own-image-text'>
                                                    Click the camera to upload your own image
                                                </div>
                                                <div className='camera-icon-container' onClick={this.clickInputRef}>
                                                    <FaCamera />
                                                    <input className='file-input' onChange={this.readFile} type='file' accept='image/*' ref={this.setInputRef} />
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={9}>
                                        <div className='photo-search-input-container'>
                                            <Input onChange={this.setPhotoSearchQuery} type='text' placeholder='Search for a new photo...' alt='enter photo query' />
                                        </div>
                                    </Col>
                                    <Col sm={3}>
                                        <div className='photo-search-button-container'>
                                            <Button disabled={!this.state.photoSearchQuery} onClick={this.getDifferentPhotos}> Search </Button>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    {this.state.imageUrls.map((imageUrl: string, index: number) => {
                                        if (index > 0) {
                                            return (
                                                <Col key={imageUrl} sm={6}>
                                                    <div className='playlist-image-modal-container'>
                                                        <img onClick={() => this.setSelectedImageUrl(imageUrl)} className={(index % 2 === 0) ? 'margin-right-25' : 'margin-left-25'} src={imageUrl} alt='playlist image option' />
                                                    </div>
                                                </Col>
                                            )
                                        }
                                        return null;
                                    })}
                                </Row>
                            </Container>
                        </Modal>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        Search for another photo
                    </Col>
                </Row>

            </Container>
        )
    }
}

const mapStateToProps = (state: IState) => (state.playlist);
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(PlaylistImage);