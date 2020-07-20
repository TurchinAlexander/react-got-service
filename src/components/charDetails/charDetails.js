import React, {Component} from 'react';
import './charDetails.css';

const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    );
}

export {Field};

class CharDetails extends Component {
    state = {
        item: null
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId === prevProps.itemId) {
            return;
        }

        this.updateItem();
    }

    updateItem() {
        const {itemId, getData} = this.props;
        if (!itemId) {
            return;
        }

        getData(itemId)
            .then((item) => {
                this.setState({
                    item
                });
            });
    }

    render() {
        
        const {item} = this.state
        const {askMessage} = this.props;

        if (!item) {
            return <span className="select-error">{askMessage}</span>
        }

        const {name} = item;
        
        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item});
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default CharDetails;