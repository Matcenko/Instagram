import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import changePostInfo from '../../../../../actions/changePostInfo';
import {connect} from 'react-redux';
import style from './AddComment.css';

const INPUT_LENGTH = 100;

class AddComment extends Component {
    static defaultProps = {
        postsOrTagged: [],
        postPopUpIndex: null
    };

    static propTypes = {
        postsOrTagged: PropTypes.array,
        postPopUpIndex: PropTypes.oneOfType([PropTypes.object, PropTypes.number]) // потому что null объект
    };

    state = {
        comment: ``
    };
    handleAddCommentClick = (postsOrTagged) => {
        if (this.state.comment) {
            const commentaries = postsOrTagged.map((post, index) => {
                if (index === this.props.postPopUpIndex) {
                    const {comments} = post;
                    const date = new Date();
                    comments.push({
                        comment: this.state.comment,
                        date: {
                            year: date.getFullYear(),
                            month: date.getMonth(),
                            day: date.getDate(),
                            hours: date.getHours(),
                            minutes: date.getMinutes(),
                            seconds: date.getSeconds()
                        }
                    });
                    return {...post, comments};
                } else return post;
            });
            this.props.changePostInfo(commentaries);
        }
    };
    handleInputChange = (e) => {
        if (e.target.value.length < INPUT_LENGTH) {
            this.setState({comment: e.target.value});
        }
    };
    handleClearInputClick = () => {
        this.setState({comment: ``});
    };

    render() {
        return (
            <div className={style.comment}>
                <input
                    className={style.addComment}
                    value={this.state.comment}
                    onChange={this.handleInputChange}
                    type='text'
                    placeholder='Add a comment...'/>
                <button
                    className={classNames(style.post, {[style.postIfInputIsEmpty]: !this.state.comment})}
                    onClick={() => {
                        this.handleAddCommentClick(this.props.postsOrTagged);
                        this.handleClearInputClick();
                    }}
                >Post
                </button>
            </div>
        );
    }
}

const mapStateToProps = ({postsInfo}) => ({
    postPopUpIndex: postsInfo.postPopUpIndex
});
const mapDispatchToProps = dispatch => ({
    changePostInfo: (changed) => dispatch(changePostInfo(changed))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddComment);
