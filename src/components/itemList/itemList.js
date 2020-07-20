import React, {Component} from 'react';
import './itemList.css';

import Spinner from '../spinner';

class ItemList extends Component {

    state = {
        itemList: null
    }

    componentDidMount() {
        const {getData} = this.props;
        
        getData()
            .then((itemList) => {
                this.setState({
                    itemList
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

        const {itemList} = this.state;

        if (!itemList) {
            return <Spinner/>;
        }

        return (
            <ul className="item-list list-group">
                {this.renderItems(itemList)}
            </ul>
        );
    }
}

export default ItemList;