import PropTypes from 'prop-types';

const Button = ({ color, handleClick, children, variant }) => {
    return (
        <button
            onClick={handleClick}
            className={`${
                variant === 'text'
                    ? `bg-white text-${color}-500 hover:bg-${color}-50  hover:text-${color}-700`
                    : variant === 'outline'
                    ? `border border-${color}-500 hover:border-${color}-700 text-${color}-500 hover:text-${color}-700`
                    : `bg-${color}-500 hover:bg-${color}-700 text-white`
            } font-bold py-2 px-4 rounded`}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.string.isRequired,
    handleClick: PropTypes.func,
    color: PropTypes.oneOf(['blue', 'green', 'red', 'yellow', 'purple']),
    variant: PropTypes.oneOf(['filled', 'outline', 'text']),
};

Button.defaultProps = {
    color: 'blue',
    handleClick: () => {},
    varianr: 'filled',
};

export default Button;
