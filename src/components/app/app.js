import React from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import {CharacterPage, BookPage, HousePage, BookItem} from '../pages';
import GotService from '../../services/gotService';
import {BrowserRouter as Router, Route} from 'react-router-dom';

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
            <Router>
                <div className="app"> 
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
                        <Route path='/' exact component={() => <h1>Welcome to GOT DB</h1>}/>
                        <Route path='/characters/' component={CharacterPage}/>
                        <Route path='/books/' exact component={BookPage}/>
                        <Route path='/houses/' component={HousePage}/>
                        <Route path='/books/:id' render={
                            ({match}) => {
                                const {id} = match.params;
                                return <BookItem bookId={id}/>
                            }
                        } />
                    </Container>
                </div >
            </Router>
        );
    }
};

export default App;