import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import style from './CommentsField.css';
import Avatar from '../../../Avatar/Avatar';

CommentsField.propTypes = {
    userNick: PropTypes.string,
    popUpInfo: PropTypes.object
};
CommentsField.defaultProps = {
    userNick: '',
    popUpInfo: {}
};

function CommentsField (props) {
    function commentDateHandler (date) {
        function yearIsLeap (year) {
            return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
        }
        function getDays (month, day, feb) {
            let days = -1;
            const monthsLength = [31, feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            for (let i = 0; i < month; i++) {
                days += monthsLength[i];
            }
            return days + day;
        }
        const now = new Date();
        let feb = yearIsLeap(now.getFullYear()) ? 29 : 28;
        let nowDay = getDays(now.getMonth(), now.getDate(), feb);
        feb = yearIsLeap(date.year) ? 29 : 28;
        let commentDay = getDays(date.month, date.day, feb);
        let dayDifference = nowDay - commentDay;

        if (date.year < now.getFullYear()) {
            for (let i = date.year; i < now.getFullYear(); i++) {
                commentDay += 355 + yearIsLeap(i);
            }
            dayDifference = commentDay - nowDay;
        }
        const nowSeconds = (dayDifference * 24 + now.getHours()) * 3600 + now.getMinutes() * 60 + now.getSeconds();
        const dateSeconds = date.hours * 3600 + date.minutes * 60 + date.seconds;
        const secondsDifference = nowSeconds - dateSeconds;
        if (dayDifference <= 1) { // 1, если комментарий был написал вчерашней датой, но 24 часа не прошло
            switch (true) {
            case secondsDifference === 0:
                return 'Now';
            case secondsDifference < 60:
                return `${secondsDifference}s`;
            case secondsDifference < 3600:
                return `${Math.floor(secondsDifference / 60)}m`;
            case secondsDifference < 86400:
                return `${Math.floor(secondsDifference / 3600)}h`;
            }
        }
        if (((dayDifference > 1) && (dayDifference < 7)) || ((dayDifference === 1) && (secondsDifference >= 86400))) { // включаем 1, если прошло 24 часа
            return ` ${dayDifference}d`;
        } else if (dayDifference >= 7) {
            return ` ${Math.floor(dayDifference / 7)}w`;
        }
    }

    const {
        userNick,
        popUpInfo
    } = props;

    return (
        <div className={style.commentsField}>
            <hr className={style.grayHr}/>
            <ul className={style.commentsUl}>
                {popUpInfo.comments.map((comment, index) => {
                    return (
                        <div key={comment.comment + index}>
                            <div className={style.avatarAndComment}>
                                <Avatar avatarIsSmall/>
                                <li className={style.nickNameMargin}>
                                    <span className={style.name}>{userNick}&nbsp;</span>
                                    <span>{comment.comment}</span>
                                </li>
                            </div>
                            <div className={style.commentTimeAndReply}>
                                <time>{commentDateHandler(comment.date)}</time>
                                <button className={style.reply}> Reply</button>
                            </div>
                        </div>
                    );
                })}
            </ul>
            <hr className={style.grayHr}/>
        </div>
    );
}

const mapStateToProps = ({ postsInfo }) => ({
    userNick: postsInfo.userInformation.nick
});

export default connect(mapStateToProps)(CommentsField);
