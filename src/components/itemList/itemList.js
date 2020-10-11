import React from "react";
import "./itemList.css";

import Spinner from "../spinner";
import PropTypes from "prop-types";
import GotService from "../../services/gotService";

const ItemList = ({ data, renderItem, onItemSelected }) => {
    const renderItems = (chars) => {
        return chars.map((item, i) => {
            const label = renderItem(item);

            return (
                <li
                    key={i}
                    className="list-group-item"
                    onClick={() => onItemSelected(i + 1)}
                >
                    {label}
                </li>
            );
        });
    };

    return <ul className="item-list list-group">{renderItems(data)}</ul>;
};

ItemList.defaultProps = {
    onItemSelected: () => {
        console.log("Hello");
    },
};

ItemList.propTypes = {
    onItemSelected: PropTypes.func,
};

const f = () => {
    return class extends React.Component {
        state = {
            data: null,
        };

        componentDidMount() {
            const { getData } = this.props;

            getData().then((data) => {
                this.setState({
                    data,
                });
            });
        }

        render() {
            const { data } = this.state;

            if (!data) {
                return <Spinner />;
            }

            return <ItemList {...this.props} data={data} />;
        }
    };
};

export default f();
