import React from 'react';

const Rating = ({ value, text, color }) => {
    return (
        <div className="rating">
            <span>
                <i
                    style={{ color, fontSize: '15px' }}
                    className={
                        value >= 1
                            ? 'fas fa-star'
                            : value >= 0.5
                              ? 'fas fa-star-half-alt'
                              : 'far fa-star'
                    }
                ></i>
            </span>
            <span>
                <i
                    style={{ color, fontSize: '15px' }}
                    className={
                        value >= 2
                            ? 'fas fa-star'
                            : value >= 1.5
                              ? 'fas fa-star-half-alt'
                              : 'far fa-star'
                    }
                ></i>
            </span>
            <span>
                <i
                    style={{ color, fontSize: '15px' }}
                    className={
                        value >= 3
                            ? 'fas fa-star'
                            : value >= 2.5
                              ? 'fas fa-star-half-alt'
                              : 'far fa-star'
                    }
                ></i>
            </span>
            <span>
                <i
                    style={{ color, fontSize: '15px' }}
                    className={
                        value >= 4
                            ? 'fas fa-star'
                            : value >= 3.5
                              ? 'fas fa-star-half-alt'
                              : 'far fa-star'
                    }
                ></i>
            </span>
            <span>
                <i
                    style={{ color, fontSize: '15px' }}
                    className={
                        value >= 5
                            ? 'fas fa-star'
                            : value >= 4.5
                              ? 'fas fa-star-half-alt'
                              : 'far fa-star'
                    }
                ></i>
            </span>
            <span className="text-gray-400 ml-2">{text && text}</span>
        </div>
    );
};

Rating.defaultProps = {
    color: '#FF8A00',
};
export default Rating;
