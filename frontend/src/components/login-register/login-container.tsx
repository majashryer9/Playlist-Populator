import * as React from 'react';
import { Form, FormGroup, Input } from 'reactstrap';
import { IUserState, IState } from 'src/reducers';
import { connect } from 'react-redux';
import * as userActions from '../../actions/user/user-actions';
import { Redirect } from 'react-router-dom';

interface IProps extends IUserState {
    setPassword: (password: string) => void;
    setUsername: (username: string) => void;
    signIn: () => void;
}

interface ILoginContainerState {
    redirect: boolean;
}


export class LoginContainer extends React.Component<IProps, ILoginContainerState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            redirect: false
        }
    }

    public setPassword = (e: any) => {
        this.props.setPassword(e.target.value);
    }

    public setUsername = (e: any) => {
        this.props.setUsername(e.target.value);
    }

    public componentDidUpdate() {
        if (this.props.loggedInUser.id) {
            this.setState({
                redirect: true
            });
        }
    }

    public render() {
        if (this.state.redirect) {
            return <Redirect to='/my-profile' />;
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
                    <button onClick={this.props.signIn}> Sign In </button>
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