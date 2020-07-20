import React from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../characterPage';

import ItemList from '../itemList';
import CharDetails from '../charDetails';
import GotService from '../../services/gotService';

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
                    <CharacterPage/>
                    <Row>
                        <Col md='6'>
                            <ItemList 
                                onCharSelected={this.onCharSelected}
                                getData={this.gotService.getAllBooks}
                                renderItem={(item) => (<><span>{item.name}</span><button>Click me</button></>)}
                            />
                        </Col>
                        <Col md='6'>
                            <CharDetails 
                                charId={this.state.selectedChar}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList 
                                onCharSelected={this.onCharSelected}
                                getData={this.gotService.getAllHouses}
                                renderItem={(item) => `${item.name}`}
                            />
                        </Col>
                        <Col md='6'>
                            <CharDetails 
                                charId={this.state.selectedChar}
                            />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
};

export default App;