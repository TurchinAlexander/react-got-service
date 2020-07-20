import React from 'react';
import ItemList from '../../itemList';
import CharDetails, {Field} from '../../charDetails';
import ErrorMessage from '../../errorMessage';
import GotService from '../../../services/gotService';
import RowBlock from '../../rowBlock';

class BookPage extends React.Component {
    
    gotService = new GotService();
    state = {
        selectedItem: null,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedItem: id
        });
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

        const itemList = (
            <ItemList 
                onItemSelected={(i) => this.onItemSelected(i + 1)}
                getData={this.gotService.getAllBooks}
                renderItem={({name, gender}) => `${name}`}
            />
        );

        const charDetails = (
            <CharDetails 
                itemId={this.state.selectedItem}
                getData={this.gotService.getBook}
                askMessage={`Please select a book`}
            >
                <Field field='numberOfPages' label='Number Of Pages'/>
                <Field field='publisher' label='Publisher' />
                <Field field='released' label='Released'/>
            </CharDetails>
        );

        return (
            <RowBlock left={itemList} right={charDetails}/>
        );
    }
}

export default BookPage;