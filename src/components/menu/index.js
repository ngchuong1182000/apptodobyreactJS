import React, { Component } from 'react';
import "./style.css"

class menu extends Component {
    render() {
        let className = "menu-item-child";
        let { item } = this.props;
        if (item.active) {
            className += " active"
        }
        return (
            <a className={className} href={item.href} >
                <div><img src="./home.png" alt={item.title} ></img> </div>
                <div>{item.title}</div>
            </a>
        )
    }
}

export default menu