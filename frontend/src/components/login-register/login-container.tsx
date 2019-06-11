import * as React from 'react';
import { Form, FormGroup, Input } from 'reactstrap';
import { IUserState, IState } from 'src/reducers';
import { connect } from 'react-redux';
import * as userActions from '../../actions/user/user-actions';
import { Redirect } from 'react-router-dom';
import RegisterContainer from './register-container';

interface IProps extends IUserState {
    setPassword: (password: string) => void;
    setUsername: (username: string) => void;
    signIn: () => void;
}

interface ILoginContainerState {
    modalOpen: boolean;
    redirect: boolean;
}


export class LoginContainer extends React.Component<IProps, ILoginContainerState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            modalOpen: false,
            redirect: false
        }
    }

    public componentDidUpdate() {
        if (this.props.loggedInUser.id) {
            this.setState({
                redirect: true
            });
        }
    }

    public setPassword = (e: any) => {
        this.props.setPassword(e.target.value);
    }

    public setUsername = (e: any) => {
        this.props.setUsername(e.target.value);
    }

    public toggle = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    public render() {
        if (this.state.redirect) {
            const path = (this.props.loggingInToSave) ? '/create-playlist' : '/my-profile';
            return <Redirect to={path} />;
        }
        return (
            <div className='login-container'>
                <div className='form-wrapper'>
                    <Form>
                        <FormGroup>
                            <Input
                                onChange={this.setUsername}
                                type='text'
                                placeholder='Enter username...'
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input
                                onChange={this.setPassword}
                                type='password'
                                placeholder='Enter password...'
                            />
                        </FormGroup>
                    </Form>
                    <div className='button-container'>
                        <button className='button' onClick={this.props.signIn}> Sign In </button>
                        <button className='button' onClick={this.toggle}> Register </button>
                    </div>
                    <RegisterContainer
                        modalOpen={this.state.modalOpen}
                        toggle={this.toggle}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: IState) => (state.user);
const mapDispatchToProps = {
    setPassword: userActions.setPassword,
    setUsername: userActions.setUsername,
    signIn: userActions.signIn
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);