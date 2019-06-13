import * as React from 'react';
import { Modal, ModalBody, Form, FormGroup, Input } from 'reactstrap';
import PasswordCriteriaCard from './password-criteria-card';
import { IUserState, IState } from 'src/reducers';
import { connect } from 'react-redux';
import * as userActions from '../../actions/user/user-actions';
import { debounce } from 'debounce';
import { environment } from 'src/environment';

interface IProps extends IUserState {
    modalOpen: boolean;
    setRegistrationPassword: (password: string) => void;
    setRegistrationUsername: (username: string) => void;
    toggle: () => void;
}

interface IRegisterContainerState {
    showPasswordCriteria: boolean;
    showUsernameUniqueness: boolean;
    usernameIsUnique: boolean;
}

export class RegisterContainer extends React.Component<IProps, IRegisterContainerState> {
    public setRegistrationUsernameAndCheckForUniqueness = debounce((username: string) => {
        const url = `${environment.context}user/username?username=${username}`;
        if (username) {
            console.log(username);
            fetch(url)
                .then(resp => resp.json())
                .then(usernameIsUnique => {
                    this.setState({
                        usernameIsUnique
                    });
                });
        }
        this.props.setRegistrationUsername(username);
    }, 300);

    public constructor(props: IProps) {
        super(props);
        this.state = {
            showPasswordCriteria: false,
            showUsernameUniqueness: false,
            usernameIsUnique: true
        }
    }

    public passwordCriteria = (showPasswordCriteria: boolean) => {
        this.setState({
            showPasswordCriteria
        })
    }

    public setRegistrationPassword = (e: any) => {
        this.props.setRegistrationPassword(e.target.value);
    }

    public usernameUniqueness = (showUsernameUniqueness: boolean) => {
        this.setState({
            showUsernameUniqueness
        });
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
                                onChange={(e: any) => this.setRegistrationUsernameAndCheckForUniqueness(e.target.value)}
                                onFocus={() => this.usernameUniqueness(true)}
                                onBlur={() => this.usernameUniqueness(false)}
                            />
                            {
                                (this.state.showUsernameUniqueness && this.props.registrationUsername) ?
                                    <div>
                                        {
                                            (this.state.usernameIsUnique) ?
                                                'Username is unique'
                                                :
                                                'Username is not unique'
                                        }
                                    </div>
                                    :
                                    null
                            }
                        </FormGroup>
                        <FormGroup>
                            <Input
                                type='password'
                                placeholder='Enter password...'
                                onChange={this.setRegistrationPassword}
                                onFocus={() => this.passwordCriteria(true)}
                                onBlur={() => this.passwordCriteria(false)}
                            />
                            {
                                (this.state.showPasswordCriteria) ?
                                    <div>
                                        <PasswordCriteriaCard />
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

const mapStateToProps = (state: IState) => (state.user);
const mapDispatchToProps = {
    setRegistrationPassword: userActions.setRegistrationPassword,
    setRegistrationUsername: userActions.setRegistrationUsername
};
export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);