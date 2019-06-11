import * as React from 'react';
import { Redirect } from 'react-router';
import { IUserState, IState } from 'src/reducers';
import { connect } from 'react-redux';
import * as userActions from '../../../../../actions/user/user-actions';

interface IProps extends IUserState {
    setLoggingInToSave: (loggingIn: boolean) => void;
}

interface ILoginToSaveButtonState {
    redirect: boolean;
}

export class LoginToSaveButton extends React.Component<IProps, ILoginToSaveButtonState> {
    public constructor(props: IProps) {
        super(props);
        this.state = {
            redirect: false
        };
    }

    public login = () => {
        this.props.setLoggingInToSave(true);
        this.setState({
            redirect: true
        });
    }

    public render() {
        if (this.state.redirect) {
            return <Redirect to='/login' />;
        }
        return (
            <div className='new-playlist-button-container'>
                <button
                    className='new-playlist-button'
                    onClick={this.login}
                >
                    LOG IN TO SAVE PLAYLIST
                </button>
            </div>
        )
    }
}

const mapStateToProps = (state: IState) => (state.user);
const mapDispatchToProps = {
    setLoggingInToSave: userActions.setLoggingInToSave
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginToSaveButton);