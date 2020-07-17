import React from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../characterPage';

class App extends React.Component {
    state = {
        showRandomChar: true,
        error: false
    };

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        });
    }

    onButtonClick = () => {
        this.setState(({showRandomChar}) => {
            return {
                showRandomChar: !showRandomChar
            };
        })
    }

    render() {
        const {showRandomChar, error} = this.state;

        if (error) {
            return (
                <ErrorMessage/>
            );
        }

        const randomCharSection = (showRandomChar) ? <RandomChar/> : null;

        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {randomCharSection}
                            <button onClick={this.onButtonClick}>
                                Toggle random character
                            </button>
                        </Col>
                    </Row>
                    <CharacterPage/>
                </Container>
            </>
        );
    }
};

export default App;