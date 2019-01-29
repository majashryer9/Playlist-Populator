import * as React from 'react';
import { IHomeState, IState } from '../reducers';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import CreatePlaylistContainer from './create-playlist/create-playlist-container';

interface IProps extends IHomeState {
    otherVariablePlaceholder: string;
}

class HomeComponent extends React.Component<IProps, {}> {

    constructor(props: any) {
        super(props);
    }

    public render() {

        return (
            <Container>
                <CreatePlaylistContainer />
            </Container>
        );
    }
}

const mapStateToProps = (state: IState) => (state.home);
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
