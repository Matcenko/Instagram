import React, { Component } from 'react';
import style from './Avatar.css';


class Avatar extends Component {
    renderAvatar (size) {
        return (<img
            id={style.avatar}
            style={{
                minWidth: size,
                maxWidth: size,
                minHeight: size,
                maxHeight: size,
                backgroundSize: size + ' ' + size}}
        />);
    }

    render () {
        const size = this.props.size ? this.props.size : '150px';
        return (
            <div>
                {this.renderAvatar(size)}
            </div>
        );
    }
}
export default Avatar;
