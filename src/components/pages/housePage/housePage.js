import React from 'react';
import ItemList from '../../itemList';
import CharDetails, {Field} from '../../charDetails';
import ErrorMessage from '../../errorMessage';
import GotService from '../../../services/gotService';
import RowBlock from '../../rowBlock';

class HousePage extends React.Component {
    
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
                getData={this.gotService.getAllHouses}
                renderItem={({name, gender}) => `${name}`}
            />
        );

        const charDetails = (
            <CharDetails 
                itemId={this.state.selectedItem}
                getData={this.gotService.getHouse}
                askMessage={`Please select a house`}
            >
                <Field field='region' label='Region'/>
                <Field field='words' label='Words'/>
                <Field field='titles' label='Titles'/>
                <Field field='seats' label='Seats'/>
                <Field field='overlord' label='Current Lord'/>
                <Field field='ancestraWeapons' label='Ancestra Weapons'/>
            </CharDetails>
        );

        return (
            <RowBlock left={itemList} right={charDetails}/>
        );
    }
}

export default HousePage;