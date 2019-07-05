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
          index={child.props.index || index}
          element={child}
          {...rest}
        />
      ))}
    </section>
  )
);

export default Draggable;
