import * as React from 'react';
import { Modal, ModalBody, Form, FormGroup, Input } from 'reactstrap';

interface IProps {
    modalOpen: boolean;
    toggle: () => void;
}

export default class RegisterContainer extends React.Component<IProps, any> {
    public constructor(props: IProps) {
        super(props);
        this.state = {
            showPasswordCriteria: false
        }
    }

    public passwordCriteria = (showPasswordCriteria: boolean) => {
        this.setState({
            showPasswordCriteria
        })
    }

    public render() {
        return (
            <Modal className='registration-modal' isOpen={this.props.modalOpen} toggle={this.props.toggle}>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <FormGroup>
                                <Input
                                    type='text'
                                    placeholder='Enter first name...'
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    type='text'
                                    placeholder='Enter last name...'
                                />
                            </FormGroup>
                            <Input
                                type='text'
                                placeholder='Enter username...'
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input
                                type='password'
                                placeholder='Enter password...'
                                onFocus={() => this.passwordCriteria(true)}
                                onBlur={() => this.passwordCriteria(false)}
                            />
                            {
                                (this.state.showPasswordCriteria) ?
                                    <div>
                                        Password Criteria
                                    </div>
                                    :
                                    null
                            }
                        </FormGroup>
                    </Form>
                    <div className='button-container'>
                        <button className='button'> Register </button>
                        <button className='button' onClick={this.props.toggle}> Cancel </button>
                    </div>
                </ModalBody>
            </Modal>
        )
    }
}