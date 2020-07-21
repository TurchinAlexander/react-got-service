import React from 'react';
import ItemList from '../../itemList';
import ErrorMessage from '../../errorMessage';
import GotService from '../../../services/gotService';
import {withRouter} from 'react-router-dom';

class BookPage extends React.Component {
    
    gotService = new GotService();
    state = {
        error: false
    }


    componentDidCatch() {
        this.setState({
            error: true
        });
    }

    render() {
        const {error} = this.state;

        if (error) {
            return (
                <ErrorMessage/>
            );
        }

        return (
            <ItemList 
                onItemSelected={(itemId) => {
                    const {history} = this.props;

                    history.push(itemId);
                }}
                getData={this.gotService.getAllBooks}
                renderItem={({name, gender}) => `${name}`}
            />
        );
    }
}

export default withRouter(BookPage);