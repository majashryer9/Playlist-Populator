import * as React from 'react';
import { MdCheck, MdClose } from 'react-icons/md';
import { IUserState, IState } from 'src/reducers';
import { connect } from 'react-redux';

export class PasswordCriteriaCard extends React.Component<IUserState, any> {
    public constructor(props: IUserState) {
        super(props);
    }

    public alert = (truthCondition: boolean, messageToDisplay: string) => {
        const successOrFail = (truthCondition) ? 'success' : 'fail';
        return (
            <div className={`password-criteria-message ${successOrFail}`}>
                <div>
                    {messageToDisplay}
                </div>
                <div>
                    {
                        (truthCondition) ?
                            <MdCheck />
                            :
                            <MdClose />
                    }
                </div>
            </div>
        );
    }

    public hasMinEightCharacters = () => {
        return this.alert(this.props.registrationPassword.length >= 8, 'Has a minimum of 8 characters');
    }

    public hasUppercaseChar = () => {
        return this.alert(/[A-Z]/.test(this.props.registrationPassword), 'Has an uppercase character (A-Z)');
    }

    public hasLowercaseChar = () => {
        return this.alert(/[a-z]/.test(this.props.registrationPassword), 'Has a lowercase character (a-z)');
    }

    public hasDigit = () => {
        return this.alert(/[0-9]/.test(this.props.registrationPassword), 'Has a digit (0-9)');
    }

    public hasSpecialCharacter = () => {
        return this.alert(/[~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(this.props.registrationPassword), 'Has a special character (~`!@#$%^&*+=-[]\\\';,/{}|\":<>?)');
    }

    public render() {
        return (
            <div className='password-criteria-card'>
                <div>
                    {this.hasMinEightCharacters()}
                </div>
                <div>
                    {this.hasUppercaseChar()}
                </div>
                <div>
                    {this.hasLowercaseChar()}
                </div>
                <div>
                    {this.hasDigit()}
                </div>
                <div>
                    {this.hasSpecialCharacter()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: IState) => (state.user);
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(PasswordCriteriaCard);