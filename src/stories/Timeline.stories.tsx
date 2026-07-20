import React, { useState, useCallback, FC } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';
import { Button } from 'maritime-ui';
import Timeline from '../lib/Timeline';
import TodayMarker from '../lib/markers/public/TodayMarker';
import TimelineHeaders from '../lib/headers/TimelineHeaders';
import DateHeader from '../lib/headers/DateHeader';
import SidebarHeader from '../lib/headers/SidebarHeader';
import { defaultKeys, defaultTimeSteps } from '@/lib/default-config';
import {
  vesselGroups,
  vesselItems,
  employeeGroups,
  employeeItems,
} from './mockData';

const now = dayjs();

const ZoomInIcon: FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 3.5v9M3.5 8h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ZoomOutIcon: FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3.5 8h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

type TimelineWrapperProps = {
  groups: typeof vesselGroups;
  items: typeof vesselItems;
  stackItems: boolean;
  defaultDaysBack: number;
  defaultDaysForward: number;
  sidebarWidth: number;
};

const TimelineWrapper = ({
  groups,
  items,
  stackItems,
  defaultDaysBack,
  defaultDaysForward,
  sidebarWidth,
}: TimelineWrapperProps) => {
  const [visibleTimeStart, setVisibleTimeStart] = useState(
    now.subtract(defaultDaysBack, 'day').valueOf(),
  );
  const [visibleTimeEnd, setVisibleTimeEnd] = useState(
    now.add(defaultDaysForward, 'day').valueOf(),
  );

  const handleTimeChange = useCallback(
    (start: number, end: number, updateScrollCanvas: (s: number, e: number) => void) => {
      setVisibleTimeStart(start);
      setVisibleTimeEnd(end);
      updateScrollCanvas(start, end);
    },
    [],
  );

  const handleZoom = useCallback(
    (direction: 'in' | 'out') => {
      const center = (visibleTimeStart + visibleTimeEnd) / 2;
      const range = visibleTimeEnd - visibleTimeStart;
      const factor = direction === 'in' ? 0.5 : 2;
      const newRange = range * factor;
      setVisibleTimeStart(center - newRange / 2);
      setVisibleTimeEnd(center + newRange / 2);
    },
    [visibleTimeStart, visibleTimeEnd],
  );

  return (
    <div style={{ height: '100%', minHeight: 400 }}>
      <div style={{ display: 'flex', gap: 8, padding: '8px 12px' }}>
        <Button
          Icon={ZoomInIcon}
          buttonSize="medium"
          buttonColor="tertiary"
          onClickFunc={() => handleZoom('in')}
        />
        <Button
          Icon={ZoomOutIcon}
          buttonSize="medium"
          buttonColor="tertiary"
          onClickFunc={() => handleZoom('out')}
        />
      </div>
      <Timeline
        groups={groups}
        items={items}
        keys={defaultKeys}
        sidebarWidth={sidebarWidth}
        rightSidebarWidth={0}
        lineHeight={50}
        itemHeightRatio={0.88}
        stackItems={stackItems}
        canMove={false}
        canResize={false}
        canSelect={true}
        timeSteps={defaultTimeSteps}
        defaultTimeStart={visibleTimeStart}
        defaultTimeEnd={visibleTimeEnd}
        visibleTimeStart={visibleTimeStart}
        visibleTimeEnd={visibleTimeEnd}
        onTimeChange={handleTimeChange}
        onCanvasDoubleClick={(groupId, time) => {
          console.log('[Timeline] onCanvasDoubleClick', { groupId, time: dayjs(time).format('YYYY-MM-DD HH:mm') });
        }}
        onItemDoubleClick={(itemId) => {
          console.log('[Timeline] onItemDoubleClick', { itemId });
        }}
        onItemClick={(itemId) => {
          console.log('[Timeline] onItemClick', { itemId });
        }}
      >
        <TimelineHeaders>
          <SidebarHeader>
            {({ getRootProps }) => (
              <div {...getRootProps()} style={{ ...getRootProps().style, display: 'flex', alignItems: 'center', paddingLeft: 12, fontWeight: 600, fontSize: 13 }}>
                {stackItems ? 'Employee' : 'Vessel / Position'}
              </div>
            )}
          </SidebarHeader>
          <DateHeader unit="primaryHeader" />
          <DateHeader />
        </TimelineHeaders>
        <TodayMarker>
          {({ styles }) => (
            <div style={{ ...styles, backgroundColor: '#ff371c', width: 2 }} />
          )}
        </TodayMarker>
      </Timeline>
    </div>
  );
};

const meta: Meta<typeof TimelineWrapper> = {
  title: 'Timeline',
  component: TimelineWrapper,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof TimelineWrapper>;

export const VesselView: Story = {
  name: 'Vessel View',
  args: {
    groups: vesselGroups,
    items: vesselItems,
    stackItems: false,
    defaultDaysBack: 30,
    defaultDaysForward: 90,
    sidebarWidth: 200,
  },
};

export const EmployeeView: Story = {
  name: 'Employee View',
  args: {
    groups: employeeGroups,
    items: employeeItems,
    stackItems: true,
    defaultDaysBack: 10,
    defaultDaysForward: 30,
    sidebarWidth: 200,
  },
};
