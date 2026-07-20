import React, { ReactNode } from "react";

export enum TimelineMarkerType {
  Today = "Today",
  Custom = "Custom",
  Cursor = "Cursor",
}

export type MarkerType = {
  date?: number | undefined;
  type: TimelineMarkerType;
  renderer?: MarkerRendererType | undefined;
  interval?: number | undefined;
  id?: number | undefined;
};

export type MarkerRendererTypeProps = {
  styles: React.CSSProperties;
  date: number;
};
export type MarkerRendererType = ({
  styles,
  date,
}: MarkerRendererTypeProps) => ReactNode;
