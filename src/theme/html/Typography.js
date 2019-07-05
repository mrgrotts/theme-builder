import React from 'react';

export const Typography = ({ children, className, style, type, ...props }) => {
  switch (type) {
    case 'h1': {
      return (
        <h1 className={className} style={style} {...props}>
          {children}
        </h1>
      );
    }
    case 'h2': {
      return (
        <h2 className={className} style={style} {...props}>
          {children}
        </h2>
      );
    }
    case 'h3': {
      return (
        <h3 className={className} style={style} {...props}>
          {children}
        </h3>
      );
    }
    case 'h4': {
      return (
        <h4 className={className} style={style} {...props}>
          {children}
        </h4>
      );
    }
    case 'h5': {
      return (
        <h5 className={className} style={style} {...props}>
          {children}
        </h5>
      );
    }
    case 'h6': {
      return (
        <h6 className={className} style={style} {...props}>
          {children}
        </h6>
      );
    }
    default: {
      return (
        <h1 className={className} style={style} {...props}>
          {children}
        </h1>
      );
    }
  }
};
