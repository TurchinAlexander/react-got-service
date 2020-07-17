import React, {Component} from 'react';
import './itemList.css';

import GotService from '../../services/gotService';
import Spinner from '../spinner';

class ItemList extends Component {

    gotService = new GotService();
    state = {
        charList: null
    }

    componentDidMount() {
        this.gotService.getAllCharacters()
            .then((charList) => {
                this.setState({
                    charList
                });
            });
    }

    renderItems(chars) {
        return chars.map((item, i) => {
            return (
                <li
                    key = {i}
                    className="list-group-item"
                    onClick={() => this.props.onCharSelected(41 + i)}
                >
                    {item.name}
                </li>
            );
        })
    }

    render() {

        const {charList} = this.state;

        if (!charList) {
            return <Spinner/>;
        }

        return (
            <ul className="item-list list-group">
                {this.renderItems(charList)}
            </ul>
        );
    }
}

export default ItemList;