import React from 'react';

const Button = ({
    children,
    className = 'inline-flex items-center justify-center gap-2 bgPrimary text-white shadow-xs h-10 rounded-md text-lg px-8',
    icon,
    ...props
}) => {
    return (
        <button className={className} {...props}>
            {icon && <i className={`fas ${icon}`}></i>}
            {children}
        </button>
    );
};

export default Button;