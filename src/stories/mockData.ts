import dayjs from 'dayjs';
import { TimelineGroupBase, TimelineItemBase } from '@/lib/types/main';

const now = dayjs();

const log = (action: string, ...args: unknown[]) =>
  console.log(`[Timeline] ${action}`, ...args);

// ─── VESSEL VIEW ────────────────────────────────────────────────

export const vesselGroups: TimelineGroupBase[] = [
  {
    id: 'v1_master',
    heading: 'MV Northern Star',
    vesselClientName: 'Nordic Shipping AS',
    vesselContractFromDate: '2025-01-15',
    vesselContractToDate: '2026-12-31',
    title: 'Master',
  },
  {
    id: 'v1_chief_officer',
    heading: '',
    title: 'Chief Officer',
  },
  {
    id: 'v1_2nd_officer',
    heading: '',
    title: '2nd Officer',
  },
  {
    id: 'v1_bosun',
    heading: '',
    title: 'Bosun',
  },
  {
    id: 'v2_master',
    heading: 'MV Ocean Breeze',
    vesselClientName: 'Atlantic Marine Ltd',
    vesselContractFromDate: '2024-06-01',
    vesselContractToDate: '2027-05-31',
    title: 'Master',
  },
  {
    id: 'v2_chief_engineer',
    heading: '',
    title: 'Chief Engineer',
  },
  {
    id: 'v2_2nd_engineer',
    heading: '',
    title: '2nd Engineer',
  },
];

export const vesselItems: TimelineItemBase<number>[] = [
  // ── Default slot (empty, add button) ──
  {
    id: 'slot_empty_1',
    group: 'v1_chief_officer',
    title: 'Add',
    className: 'default',
    start_time: now.subtract(5, 'day').valueOf(),
    end_time: now.add(25, 'day').valueOf(),
    isPersonView: false,
    deleteSlotFunc: () => log('deleteSlot', 'slot_empty_1'),
  },

  // ── Success: on board, can sign off ──
  {
    id: 'slot_success_1',
    group: 'v1_master',
    employeeId: 101,
    title: 'John Smith',
    img: '',
    className: 'success',
    status: 'on board',
    statusInt: 1,
    start_time: now.subtract(30, 'day').valueOf(),
    end_time: now.add(60, 'day').valueOf(),
    isPersonView: false,
    hasConflict: false,
    rotateFunc: () => log('rotate', 'John Smith'),
    signOffFunc: () => log('signOff', 'John Smith'),
    planSignOffFunc: () => log('planSignOff', 'John Smith'),
  },

  // ── Warning: planned, can sign on ──
  {
    id: 'slot_warning_1',
    group: 'v1_2nd_officer',
    employeeId: 102,
    title: 'Maria Garcia',
    img: '',
    className: 'warning',
    status: 'planned',
    statusInt: 2,
    start_time: now.add(5, 'day').valueOf(),
    end_time: now.add(95, 'day').valueOf(),
    isPersonView: false,
    rotateFunc: () => log('rotate', 'Maria Garcia'),
    signOnFunc: () => log('signOn', 'Maria Garcia'),
    resetDateFunc: () => log('resetDate', 'Maria Garcia'),
    warningTooltipText: 'Certificate expires in 14 days',
  },

  // ── Danger: issue ──
  {
    id: 'slot_danger_1',
    group: 'v1_bosun',
    employeeId: 103,
    title: 'Petar Jovanovic',
    img: '',
    className: 'danger',
    status: 'planned',
    statusInt: 3,
    start_time: now.subtract(2, 'day').valueOf(),
    end_time: now.add(88, 'day').valueOf(),
    isPersonView: false,
    rotateFunc: () => log('rotate', 'Petar Jovanovic'),
    signOnFunc: () => log('signOn', 'Petar Jovanovic'),
    dangerTooltipText: 'Missing medical certificate',
  },

  // ── Past: signed off ──
  {
    id: 'slot_past_1',
    group: 'v1_master',
    employeeId: 104,
    title: 'Erik Andersen',
    img: '',
    className: 'past',
    status: 'signed off',
    statusInt: 4,
    start_time: now.subtract(120, 'day').valueOf(),
    end_time: now.subtract(30, 'day').valueOf(),
    isPersonView: false,
  },

  // ── v2 items ──
  {
    id: 'slot_success_2',
    group: 'v2_master',
    employeeId: 105,
    title: 'Hans Mueller',
    img: '',
    className: 'success',
    status: 'on board',
    statusInt: 1,
    start_time: now.subtract(45, 'day').valueOf(),
    end_time: now.add(45, 'day').valueOf(),
    isPersonView: false,
    rotateFunc: () => log('rotate', 'Hans Mueller'),
    signOffFunc: () => log('signOff', 'Hans Mueller'),
    planSignOffFunc: () => log('planSignOff', 'Hans Mueller'),
  },
  {
    id: 'slot_empty_2',
    group: 'v2_chief_engineer',
    title: 'Add',
    className: 'default',
    start_time: now.subtract(10, 'day').valueOf(),
    end_time: now.add(80, 'day').valueOf(),
    isPersonView: false,
    deleteSlotFunc: () => log('deleteSlot', 'slot_empty_2'),
  },
  {
    id: 'slot_warning_2',
    group: 'v2_2nd_engineer',
    employeeId: 106,
    title: 'Li Wei',
    img: '',
    className: 'warning',
    status: 'planned',
    statusInt: 2,
    start_time: now.add(10, 'day').valueOf(),
    end_time: now.add(100, 'day').valueOf(),
    isPersonView: false,
    rotateFunc: () => log('rotate', 'Li Wei'),
    signOnFunc: () => log('signOn', 'Li Wei'),
  },

  // ── Overlapping items on same row (conflict demo) ──
  {
    id: 'slot_overlap_a',
    group: 'v1_bosun',
    employeeId: 107,
    title: 'Overlap Test A',
    img: '',
    className: 'success',
    status: 'on board',
    statusInt: 1,
    start_time: now.subtract(60, 'day').valueOf(),
    end_time: now.subtract(1, 'day').valueOf(),
    isPersonView: false,
    hasConflict: true,
    rotateFunc: () => log('rotate', 'Overlap Test A'),
  },
];

// ─── EMPLOYEE VIEW ──────────────────────────────────────────────

export const employeeGroups: TimelineGroupBase[] = [
  {
    id: 'emp_101',
    heading: 'John Smith',
    title: 'Master',
  },
  {
    id: 'emp_101_assignments',
    heading: '',
    title: '',
  },
  {
    id: 'emp_102',
    heading: 'Maria Garcia',
    title: 'Chief Officer',
  },
  {
    id: 'emp_102_assignments',
    heading: '',
    title: '',
  },
  {
    id: 'emp_103',
    heading: 'Petar Jovanovic',
    title: 'Bosun',
  },
  {
    id: 'emp_104',
    heading: 'Erik Andersen',
    title: 'Master',
  },
  {
    id: 'emp_104_assignments',
    heading: '',
    title: '',
  },
];

export const employeeItems: TimelineItemBase<number>[] = [
  // ── John Smith: activities ──
  {
    id: 'act_1',
    group: 'emp_101',
    title: 'Safety Training',
    className: 'primary',
    badge: 'training',
    img: '-1',
    start_time: now.subtract(3, 'day').valueOf(),
    end_time: now.add(4, 'day').valueOf(),
    isPersonView: true,
    editActivity: () => log('editActivity', 'act_1'),
    cancelActivity: () => log('cancelActivity', 'act_1'),
  },
  {
    id: 'act_2',
    group: 'emp_101',
    title: 'Medical Exam',
    className: 'azure',
    badge: 'medical',
    img: '-1',
    start_time: now.add(6, 'day').valueOf(),
    end_time: now.add(7, 'day').valueOf(),
    isPersonView: true,
    editActivity: () => log('editActivity', 'act_2'),
    cancelActivity: () => log('cancelActivity', 'act_2'),
    completeActivity: () => log('completeActivity', 'act_2'),
  },
  // ── John Smith: assignment (rotation sub-row) ──
  {
    id: 'assmt_101_1',
    group: 'emp_101_assignments',
    title: 'John Smith - MV Northern Star',
    img: '',
    className: 'assignment-slot success',
    badge: 'rotation',
    status: 'on board',
    start_time: now.subtract(30, 'day').valueOf(),
    end_time: now.add(60, 'day').valueOf(),
    isPersonView: true,
  },

  // ── Maria Garcia: activities ──
  {
    id: 'act_3',
    group: 'emp_102',
    title: 'On Leave',
    className: 'pink',
    badge: 'on leave',
    img: '-1',
    start_time: now.subtract(7, 'day').valueOf(),
    end_time: now.subtract(1, 'day').valueOf(),
    isPersonView: true,
    editActivity: () => log('editActivity', 'act_3'),
    cancelActivity: () => log('cancelActivity', 'act_3'),
  },
  {
    id: 'act_4',
    group: 'emp_102',
    title: 'Travel',
    className: 'purple',
    badge: 'travel',
    img: '-1',
    start_time: now.valueOf(),
    end_time: now.add(2, 'day').valueOf(),
    isPersonView: true,
    editActivity: () => log('editActivity', 'act_4'),
    cancelActivity: () => log('cancelActivity', 'act_4'),
  },
  {
    id: 'act_5',
    group: 'emp_102',
    title: 'Hotel Stay',
    className: 'warning',
    badge: 'hotel',
    img: '-1',
    start_time: now.add(2, 'day').valueOf(),
    end_time: now.add(5, 'day').valueOf(),
    isPersonView: true,
    editActivity: () => log('editActivity', 'act_5'),
    cancelActivity: () => log('cancelActivity', 'act_5'),
  },
  // ── Maria Garcia: assignment ──
  {
    id: 'assmt_102_1',
    group: 'emp_102_assignments',
    title: 'Maria Garcia - MV Ocean Breeze',
    img: '',
    className: 'assignment-slot warning',
    badge: 'rotation',
    status: 'planned',
    start_time: now.add(10, 'day').valueOf(),
    end_time: now.add(100, 'day').valueOf(),
    isPersonView: true,
  },

  // ── Petar Jovanovic: activity only (no assignments) ──
  {
    id: 'act_6',
    group: 'emp_103',
    title: 'Guest House',
    className: 'success',
    badge: 'guest house',
    img: '-1',
    start_time: now.subtract(2, 'day').valueOf(),
    end_time: now.add(8, 'day').valueOf(),
    isPersonView: true,
    editActivity: () => log('editActivity', 'act_6'),
    cancelActivity: () => log('cancelActivity', 'act_6'),
  },

  // ── Erik Andersen: past assignment ──
  {
    id: 'assmt_104_1',
    group: 'emp_104_assignments',
    title: 'Erik Andersen - MV Northern Star',
    img: '',
    className: 'assignment-slot past',
    badge: 'rotation',
    status: 'signed off',
    start_time: now.subtract(120, 'day').valueOf(),
    end_time: now.subtract(30, 'day').valueOf(),
    isPersonView: true,
  },
  {
    id: 'assmt_104_2',
    group: 'emp_104_assignments',
    title: 'Erik Andersen - MV Ocean Breeze',
    img: '',
    className: 'assignment-slot danger',
    badge: 'rotation',
    status: 'planned',
    start_time: now.add(5, 'day').valueOf(),
    end_time: now.add(95, 'day').valueOf(),
    isPersonView: true,
    dangerTooltipText: 'Missing visa documents',
  },
];
