export const overridableStyles = {
  // fontSize: 12,
  // color: 'white',
  // cursor: 'pointer',
  // background: 'rgba(245, 245, 246, 1)',
  // borderTopWidth: '1px',
  // borderBottomWidth: '1px',
  // borderLeftWidth: '1px',
  // borderRightWidth: '1px',
  // borderStyle: 'solid',
  // borderColor: '#DEDEE1',
  // zIndex: 80,
};
export const selectedStyle = {
  background: "var(--yellow-500)",
  borderTopWidth: "1px",
  borderLeftWidth: "1px",
  borderRightWidth: "1px",
  borderBottomWidth: "1px",
  borderStyle: "solid",
  borderColor: "var(--yellow-600)",
  zIndex: 82,
};
export const selectedAndCanMove = {
  willChange: "left, top, width",
  cursor: "move",
};
export const selectedAndCanResizeLeft = {
  borderLeftWidth: 3,
};
export const selectedAndCanResizeLeftAndDragLeft = {
  cursor: "w-resize",
};
export const selectedAndCanResizeRight = {
  borderRightWidth: "3px",
};
export const selectedAndCanResizeRightAndDragRight = {
  cursor: "e-resize",
};

export const leftResizeStyle = {
  position: "absolute",
  width: 24,
  maxWidth: "20%",
  minWidth: 2,
  height: "100%",
  top: 0,
  left: 0,
  cursor: "pointer",
  zIndex: 88,
};

export const rightResizeStyle = {
  position: "absolute",
  width: 24,
  maxWidth: "20%",
  minWidth: 2,
  height: "100%",
  top: 0,
  right: 0,
  cursor: "pointer",
  zIndex: 88,
};
