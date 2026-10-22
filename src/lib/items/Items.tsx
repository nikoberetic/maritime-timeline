import { Component } from "react";
import Item, { ItemProps } from "./Item";
import { _get, arraysEqual, keyBy } from "../utility/generic";
import { getGroupOrders, getVisibleItems } from "../utility/calendar";
import {
  Id,
  TimelineGroupBase,
  TimelineItemBase,
  TimelineKeys,
} from "../types/main";
import { ItemDimension } from "../types/dimension";
import {
  PlusIcon,
  RotatePersonIcon,
  CalendarRedIcon,
  DeleteSlotIcon,
  SignOffIcon,
  EditIcon,
  PlanSignOffActivitiesIcon,
  SignOnIcon,
  CompleteIcon,
  CancelIcon,
  AlertTriangleIcon,
  SquareXIcon,
} from "maritime-ui";
import { getInitials } from "@/utils/getInitials";
import clsx from "clsx";

export type CanResize = true | false | "left" | "right" | "both";
type ItemsProps<CustomItem extends TimelineItemBase<number>> = {
  groups: TimelineGroupBase[];
  items: CustomItem[];
  dimensionItems: ItemDimension[];
  selected?: Id[] | undefined;

  canvasTimeStart: number;
  canvasTimeEnd: number;
  canvasWidth: number;

  dragSnap?: number | undefined;
  minResizeWidth?: number | undefined;
  selectedItem?: Id | undefined;

  canChangeGroup?: boolean | undefined;
  canMove?: boolean | undefined;
  canResize?: CanResize | undefined;
  canSelect?: boolean | undefined;
  keys: TimelineKeys;
  moveResizeValidator?: ItemProps<CustomItem>["moveResizeValidator"];
  itemSelect: ItemProps<CustomItem>["onSelect"];
  itemDrag: ItemProps<CustomItem>["onDrag"];
  itemDrop: ItemProps<CustomItem>["onDrop"];
  itemResizing: ItemProps<CustomItem>["onResizing"];
  itemResized: ItemProps<CustomItem>["onResized"];
  onItemDoubleClick: ItemProps<CustomItem>["onItemDoubleClick"];
  onItemContextMenu?: ItemProps<CustomItem>["onContextMenu"];
  itemRenderer?: ItemProps<CustomItem>["itemRenderer"];
  groupTops: number[];
  useResizeHandle?: boolean | undefined;
  scrollRef: HTMLElement | null;
  // Add more props if needed
};

type ItemsState = object;

function canResizeLeft<CustomItem extends TimelineItemBase<number>>(
  item: CustomItem,
  canResize?: CanResize,
) {
  const value =
    _get(item, "canResize") !== undefined ? _get(item, "canResize") : canResize;
  return value === "left" || value === "both";
}

function canResizeRight<CustomItem extends TimelineItemBase<number>>(
  item: CustomItem,
  canResize?: CanResize,
) {
  const value =
    _get(item, "canResize") !== undefined ? _get(item, "canResize") : canResize;
  return value === "right" || value === "both" || value === true;
}

export default class Items<
  CustomItem extends TimelineItemBase<number>,
> extends Component<ItemsProps<CustomItem>, ItemsState> {
  override shouldComponentUpdate(nextProps: ItemsProps<CustomItem>) {
    return !(
      arraysEqual(nextProps.groups, this.props.groups) &&
      arraysEqual(nextProps.items, this.props.items) &&
      arraysEqual(nextProps.dimensionItems, this.props.dimensionItems) &&
      nextProps.keys === this.props.keys &&
      nextProps.canvasTimeStart === this.props.canvasTimeStart &&
      nextProps.canvasTimeEnd === this.props.canvasTimeEnd &&
      nextProps.canvasWidth === this.props.canvasWidth &&
      nextProps.selectedItem === this.props.selectedItem &&
      nextProps.selected === this.props.selected &&
      nextProps.dragSnap === this.props.dragSnap &&
      nextProps.minResizeWidth === this.props.minResizeWidth &&
      nextProps.canChangeGroup === this.props.canChangeGroup &&
      nextProps.canMove === this.props.canMove &&
      nextProps.canResize === this.props.canResize &&
      nextProps.canSelect === this.props.canSelect
    );
  }

  isSelected(item: CustomItem, itemIdKey: string) {
    if (!this.props.selected) {
      return this.props.selectedItem === _get(item, itemIdKey);
    } else {
      const target = _get(item, itemIdKey) as string | number;
      return this.props.selected.includes(target);
    }
  }

  getVisibleItems(canvasTimeStart: number, canvasTimeEnd: number) {
    const { keys, items } = this.props;

    return getVisibleItems(items, canvasTimeStart, canvasTimeEnd, keys);
  }

  override render() {
    const { canvasTimeStart, canvasTimeEnd, dimensionItems, keys, groups } =
      this.props;
    const { itemIdKey, itemGroupKey } = keys;

    const groupOrders = getGroupOrders(groups, keys);
    const visibleItems = this.getVisibleItems(canvasTimeStart, canvasTimeEnd);
    const sortedDimensionItems = keyBy(dimensionItems, "id");

    return (
      <div className="rct-items">
        {visibleItems
          .filter((item) => sortedDimensionItems[_get(item, itemIdKey)])
          .map((item) => {
            const dim = sortedDimensionItems[_get(item, itemIdKey)].dimensions;

            return (
              <Item
                itemProps={item.itemProps}
                key={_get(item, itemIdKey)}
                item={item}
                keys={this.props.keys}
                order={groupOrders[_get(item, itemGroupKey)]}
                // dimensions={sortedDimensionItems[_get(item, itemIdKey)].dimensions}
                dimensions={dim}
                selected={this.isSelected(item, itemIdKey)}
                canChangeGroup={
                  _get(item, "canChangeGroup") !== undefined
                    ? _get(item, "canChangeGroup")
                    : this.props.canChangeGroup
                }
                canMove={
                  _get(item, "canMove") !== undefined
                    ? _get(item, "canMove")
                    : this.props.canMove
                }
                canResizeLeft={canResizeLeft(item, this.props.canResize)}
                canResizeRight={canResizeRight(item, this.props.canResize)}
                canSelect={
                  _get(item, "canSelect") !== undefined
                    ? _get(item, "canSelect")
                    : this.props.canSelect
                }
                useResizeHandle={this.props.useResizeHandle}
                groupTops={this.props.groupTops}
                canvasTimeStart={this.props.canvasTimeStart}
                canvasTimeEnd={this.props.canvasTimeEnd}
                canvasWidth={this.props.canvasWidth}
                dragSnap={this.props.dragSnap}
                minResizeWidth={this.props.minResizeWidth}
                onResizing={this.props.itemResizing}
                onResized={this.props.itemResized}
                moveResizeValidator={this.props.moveResizeValidator}
                onDrag={this.props.itemDrag}
                onDrop={this.props.itemDrop}
                onItemDoubleClick={this.props.onItemDoubleClick}
                onContextMenu={this.props.onItemContextMenu}
                onSelect={this.props.itemSelect}
                // itemRenderer={this.props.itemRenderer}

                // itemRenderer={(props) => {
                //   const original = props.getItemProps({});
                //   return (
                //     <div
                //       {...original}
                //       style={{
                //         ...original.style,
                //         backgroundColor: isOverlapping
                //           ? 'rgba(255,0,0,0.5)'
                //           : // : original.style?.backgroundColor,
                //             'rgba(0,255,0,0.5)',
                //       }}
                //     >
                //       {props.item.title}
                //     </div>
                //   );
                // }}

                // itemRenderer={(props) => {
                //   const original = props.getItemProps({});
                //   const left = parseFloat(original.style.left as string);
                //   const width = parseFloat(original.style.width as string);
                //
                //   // find overlapping items in the same group
                //   const overlappingItems = visibleItems.filter((other) => {
                //     if (_get(other, itemIdKey) === _get(props.item, itemIdKey))
                //       return false;
                //     if (_get(other, itemGroupKey) !== _get(props.item, itemGroupKey))
                //       return false;
                //
                //     const otherProps = props.getItemProps({ item: other });
                //     const otherLeft = parseFloat(otherProps.style.left as string);
                //     const otherWidth = parseFloat(otherProps.style.width as string);
                //
                //     return left < otherLeft + otherWidth && left + width > otherLeft;
                //   });
                //
                //   const overlapRects = overlappingItems.map((other) => {
                //     const otherProps = props.getItemProps({ item: other });
                //     const otherLeft = parseFloat(otherProps.style.left as string);
                //     const otherWidth = parseFloat(otherProps.style.width as string);
                //
                //     console.log('1', overlappingItems, overlappingItems[0].title);
                //     const overlapLeft = Math.max(left, otherLeft);
                //     const overlapRight = Math.min(left + width, otherLeft + otherWidth);
                //
                //     return {
                //       left: overlapLeft - left,
                //       width: overlapRight - overlapLeft,
                //     };
                //   });
                //
                //   return (
                //     <div
                //       {...original}
                //       style={{ ...original.style, position: 'absolute' }}
                //     >
                //       <div>{props.item.title}</div>
                //       {overlapRects.map((rect, i) => (
                //         <span
                //           key={i}
                //           style={{
                //             position: 'absolute',
                //             top: 0,
                //             left: rect.left,
                //             width: rect.width,
                //             height: '100%',
                //             backgroundColor: 'rgba(255,0,0,0.5)',
                //             pointerEvents: 'none',
                //           }}
                //         />
                //       ))}
                //     </div>
                //   );
                // }}

                itemRenderer={(props) => {
                  const { item, getItemProps } = props;
                  const original = getItemProps({});
                  // console.log('original', original);

                  // get dimensions from sortedDimensionItems
                  const dim =
                    sortedDimensionItems[_get(item, keys.itemIdKey)]
                      ?.dimensions;
                  if (!dim) return null;

                  // Calculate overlaps
                  const overlapChunks: {
                    side: string;
                    left: number;
                    width: number;
                  }[] = [];

                  visibleItems.forEach((other) => {
                    if (
                      _get(other, keys.itemIdKey) === _get(item, keys.itemIdKey)
                    )
                      return;
                    if (
                      _get(other, keys.itemGroupKey) !==
                      _get(item, keys.itemGroupKey)
                    )
                      return;

                    const otherDim =
                      sortedDimensionItems[_get(other, keys.itemIdKey)]
                        ?.dimensions;
                    if (!otherDim) return;

                    const overlapLeft = Math.max(dim.left, otherDim.left);
                    const overlapRight = Math.min(
                      dim.left + dim.width,
                      otherDim.left + otherDim.width,
                    );

                    // if (overlapLeft < overlapRight) {
                    const itemCenter = dim.left + dim.width / 2;
                    const overlapCenter = (overlapLeft + overlapRight) / 2;

                    if (overlapRight - overlapLeft > 0)
                      overlapChunks.push({
                        // side: overlapLeft < dim.left + dim.width / 2 ? 'left' : 'right',
                        side: overlapCenter < itemCenter ? "left" : "right",
                        left: overlapLeft - dim.left, // relative to current item
                        width: overlapRight - overlapLeft,
                      });
                    // }
                  });

                  const lastChunk = overlapChunks[overlapChunks.length - 1];

                  const completelyOverlappedDefaultSlot =
                    item.className === "default" &&
                    lastChunk?.width > dim.width - 40;

                  return (
                    <div
                      {...original}
                      style={{
                        ...original.style,
                      }}
                      className={
                        original.className +
                        (item.hasConflict &&
                        overlapChunks.length > 0 &&
                        item.isPersonView
                          ? " overlapping"
                          : "")
                      }
                    >
                      <div
                        className="rct-item-content"
                        // style={{
                        //   paddingLeft: overlapChunks.reduce(
                        //     (acc, c) => acc + (c.side === 'left' ? c.width : 0),
                        //     0,
                        //   ),
                        //   paddingRight: overlapChunks.reduce(
                        //     (acc, c) => acc + (c.side === 'right' ? c.width : 0),
                        //     0,
                        //   ),
                        // }}
                        style={{
                          paddingLeft:
                            lastChunk?.side === "left" &&
                            !item.isPersonView &&
                            !completelyOverlappedDefaultSlot
                              ? lastChunk.width - 8
                              : 0,
                          paddingRight:
                            lastChunk?.side === "right" &&
                            !item.isPersonView &&
                            !completelyOverlappedDefaultSlot
                              ? lastChunk.width - 8
                              : 0,
                          // zIndex:
                          //   item.className === 'default' &&
                          //   lastChunk?.width + 1 > dim.width
                          //     ? 5555
                          //     : undefined,
                        }}
                        data-value={item.start_time.toString()}
                        data-value1={item.end_time.toString()}
                        data-value2={item.employeeId}
                        data-value3={item.id}
                      >
                        {item.className === "default" ? (
                          <div className="rct-item-default">
                            <div className="content">
                              <PlusIcon />
                              <span>{item.title}</span>
                              {!completelyOverlappedDefaultSlot &&
                                overlapChunks.map((chunk, idx) => (
                                  <div
                                    key={idx}
                                    className="rct-item-overlap"
                                    style={{
                                      left: chunk.left,
                                      width: chunk.width,
                                    }}
                                  />
                                ))}
                            </div>
                            <div
                              className={clsx("rct-item-button", {
                                "overlap-right":
                                  !item.isPersonView &&
                                  lastChunk?.side === "right",
                              })}
                              // style={{
                              //   transform: `translateX(${
                              //     lastChunk?.side === 'right'
                              //       ? (lastChunk.width - 4) * -1
                              //       : 0
                              //   }px)`,
                              // }}
                              onClick={item.deleteSlotFunc}
                              // onClick={() => console.log('deleteSlotFunc')}
                            >
                              <DeleteSlotIcon />
                            </div>
                          </div>
                        ) : (
                          <>
                            {item.img !== "-1" &&
                              (item.img ? (
                                <img
                                  src={item.img}
                                  alt={item.title?.toString() || ""}
                                />
                              ) : (
                                <span className="initials">
                                  {getInitials(item.title?.toString() || "")}
                                </span>
                              ))}
                            <div className="rct-item-text">
                              {item.title && (
                                <div className="rct-item-title">
                                  {item.title}
                                </div>
                              )}
                              {item.status && (
                                <div className="rct-item-status">
                                  {item.status}
                                </div>
                              )}
                            </div>
                            {(item.warningTooltipText ||
                              item.dangerTooltipText) && (
                              <div
                                className={clsx(
                                  "rct-item-alert",
                                  item.warningTooltipText
                                    ? "warning-alert"
                                    : "danger-alert",
                                )}
                                style={{
                                  transform: `translateX(${
                                    lastChunk?.side === "right" &&
                                    !item.isPersonView
                                      ? (lastChunk.width - 4) * -1
                                      : 0
                                  }px)`,
                                }}
                              >
                                {item.warningTooltipText ? (
                                  <AlertTriangleIcon />
                                ) : (
                                  <SquareXIcon />
                                )}
                                {item.warningTooltipText && (
                                  <div className="rct-item-tooltip">
                                    {item.warningTooltipText}
                                  </div>
                                )}
                                {item.dangerTooltipText && (
                                  <div className="rct-item-tooltip">
                                    {item.dangerTooltipText}
                                  </div>
                                )}
                              </div>
                            )}
                            {item.rotateFunc && (
                              <div
                                className={clsx("rct-item-button", {
                                  "overlap-right":
                                    !item.isPersonView &&
                                    lastChunk?.side === "right",
                                })}
                                // style={{
                                //   transform: `translateX(${
                                //     lastChunk?.side === 'right'
                                //       ? (lastChunk.width - 4) * -1
                                //       : 0
                                //   }px)`,
                                // }}
                                onClick={item.rotateFunc}
                              >
                                <RotatePersonIcon />
                              </div>
                            )}
                            {item.resetDateFunc && (
                              <div
                                className={clsx("rct-item-button", {
                                  "overlap-right":
                                    !item.isPersonView &&
                                    lastChunk?.side === "right",
                                })}
                                onClick={item.resetDateFunc}
                              >
                                <CalendarRedIcon />
                              </div>
                            )}
                            {item.signOnFunc && (
                              <div
                                className={clsx("rct-item-button", {
                                  "overlap-right":
                                    !item.isPersonView &&
                                    lastChunk?.side === "right",
                                })}
                                onClick={item.signOnFunc}
                              >
                                <SignOnIcon />
                              </div>
                            )}
                            {item.planSignOffFunc && (
                              <div
                                className={clsx("rct-item-button", {
                                  "overlap-right":
                                    !item.isPersonView &&
                                    lastChunk?.side === "right",
                                })}
                                onClick={item.planSignOffFunc}
                              >
                                <PlanSignOffActivitiesIcon />
                              </div>
                            )}
                            {item.signOffFunc && (
                              <div
                                className={clsx("rct-item-button", {
                                  "overlap-right":
                                    !item.isPersonView &&
                                    lastChunk?.side === "right",
                                })}
                                onClick={item.signOffFunc}
                              >
                                <SignOffIcon />
                              </div>
                            )}
                            {item.badge && (
                              <div
                                className={clsx("rct-item-badge", {
                                  "overlap-right":
                                    !item.isPersonView &&
                                    lastChunk?.side === "right",
                                })}
                              >
                                {item.badge}
                              </div>
                            )}
                            {item.tooltipComponent
                              ? item.tooltipComponent
                              : null}
                            {!item.isPersonView &&
                              overlapChunks.map((chunk, idx) => (
                                <div
                                  key={idx}
                                  className="rct-item-overlap"
                                  style={{
                                    left: chunk.left,
                                    width: chunk.width,
                                  }}
                                />
                              ))}
                            {item.editActivity && (
                              <div
                                className="rct-item-button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  item.editActivity?.();
                                }}
                                onDoubleClick={(e) => e.stopPropagation()}
                              >
                                <EditIcon />
                              </div>
                            )}
                            {item.cancelActivity && (
                              <div
                                className="rct-item-button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  item.cancelActivity?.();
                                }}
                                onDoubleClick={(e) => e.stopPropagation()}
                              >
                                <CancelIcon />
                              </div>
                            )}
                            {item.completeActivity && (
                              <div
                                className="rct-item-button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  item.completeActivity?.();
                                }}
                                onDoubleClick={(e) => e.stopPropagation()}
                              >
                                <CompleteIcon />
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  );
                }}
                scrollRef={this.props.scrollRef}
              />
            );
          })}
      </div>
    );
  }
}
