import React, { HTMLAttributes, ReactNode } from "react";
import { getNextUnit, SelectUnits } from "../utility/calendar";
import { composeEvents } from "../utility/events";
import { Dayjs } from "dayjs";
import {
  IntervalRenderer,
  Interval as IntervalType,
  GetIntervalProps,
} from "../types/main";
import { GetIntervalPropsType } from "./types";

export type IntervalProps<Data> = {
  intervalRenderer: (p: IntervalRenderer<Data>) => ReactNode;
  unit: SelectUnits;
  interval: IntervalType;
  showPeriod: (startTime: Dayjs, endTime: Dayjs) => void;
  intervalText: string;
  primaryHeader: boolean;
  getIntervalProps: GetIntervalPropsType;

  headerData?: Data | undefined;
};

class Interval<Data> extends React.PureComponent<IntervalProps<Data>> {
  onIntervalClick = () => {
    const { primaryHeader, interval, unit, showPeriod } = this.props;
    if (primaryHeader) {
      const nextUnit = getNextUnit(unit);
      const newStartTime = interval.startTime.clone().startOf(nextUnit);
      const newEndTime = interval.startTime.clone().endOf(nextUnit);
      showPeriod(newStartTime, newEndTime);
    } else {
      showPeriod(interval.startTime, interval.endTime);
    }
  };

  getIntervalProps = (
    props: GetIntervalProps = {},
  ): HTMLAttributes<HTMLDivElement> & { key: string } => {
    return {
      ...this.props.getIntervalProps({
        ...props,
        interval: this.props.interval,
      }),
      onClick: composeEvents(this.onIntervalClick, props.onClick),
    };
  };

  override render() {
    const { intervalText, interval, intervalRenderer, headerData } = this.props;
    const Renderer = intervalRenderer;
    if (Renderer) {
      return Renderer({
        getIntervalProps: this.getIntervalProps,
        intervalContext: {
          interval,
          intervalText,
        },
        data: headerData,
      });
    }

    const { key, ...rest } = this.getIntervalProps();
    return (
      <div
        data-testid="dateHeaderInterval"
        {...rest}
        key={key}
        className={`rct-dateHeader ${
          this.props.primaryHeader ? "rct-dateHeader-primary" : ""
        } ${this.props.interval.startTime.date() === 1 ? "first" : ""}`}
      >
        <span>{intervalText}</span>
      </div>
    );
  }
}

export default Interval;
