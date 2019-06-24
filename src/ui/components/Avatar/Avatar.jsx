import React, {Component} from 'react';
import style from './Avatar.css';
import PropTypes from 'prop-types';

class Avatar extends Component {
    renderAvatar(size) {
        return (<img
            className={style.avatar}
            style={{
                width: size,
                height: size,
                backgroundSize: size + ' ' + size
            }}
        />);
    }

    render() {
        return (
            <div>
                {this.renderAvatar(this.props.size)}
            </div>
        );
    }
}

Avatar.defaultProps = {
    size: '150px'
};

Avatar.propTypes = {
    size: PropTypes.string
};

export default Avatar;
