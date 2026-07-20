import { FC } from "react";

const CompleteIcon: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    fill="none"
    viewBox="0 0 32 32"
  >
    <rect width="32" height="32" fill="#0F860F" rx="4" />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m14 16 1.333 1.333L18 14.667M22 16a6 6 0 1 1-12 0 6 6 0 0 1 12 0"
    />
  </svg>
);

export default CompleteIcon;
