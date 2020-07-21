import React from 'react';
import GotService from '../../services/gotService';

import ItemDetails, {Field} from '../itemDetails';

export default class BookItem extends React.Component {
    gotService = new GotService();
    
    render() {
        return (
            <ItemDetails 
                itemId={this.props.bookId}
                getData={this.gotService.getBook}
                askMessage={`Please select a book`}
            >
                <Field field='numberOfPages' label='Number Of Pages'/>
                <Field field='publisher' label='Publisher' />
                <Field field='released' label='Released'/>
            </ItemDetails>
        );
    }
}