import React from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../pages/characterPage';

import ItemList from '../itemList';
import CharDetails from '../charDetails';
import GotService from '../../services/gotService';
import BookPage from '../pages/bookPage';
import HousePage from '../pages/housePage/housePage';

class App extends React.Component {
    gotService = new GotService();
    
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
                    {/* <CharacterPage/> */}
                    {/* <BookPage/> */}
                    <HousePage/>
                </Container>
            </>
        );
    }
};

export default App;