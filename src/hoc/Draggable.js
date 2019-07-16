import React, { cloneElement } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

const DraggableElement = SortableElement(({ element, ...props }) => cloneElement(element, props));

const Draggable = SortableContainer(
  ({ children, className, columns, style, listProps, ...rest }) => (
    <section
      aria-colcount={columns}
      className={className}
      role={'grid'}
      style={style}
      {...listProps}
    >
      {children.map((child, index) => (
        <DraggableElement
          key={child.key}
          element={child}
          index={child.props.index || index}
          {...rest}
        />
      ))}
    </section>
  )
);

export const withDraggable = Component =>
  SortableContainer(({ children, columns, containerProps, ...rest }) => (
    <Component aria-colcount={columns} {...containerProps}>
      {children.map((child, index) => (
        <DraggableElement
          key={child.key}
          element={child}
          index={child.props.index || index}
          {...rest}
        />
      ))}
    </Component>
  ));

export default Draggable;
