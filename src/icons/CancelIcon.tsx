import { FC } from "react";

const CancelIcon: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    fill="none"
    viewBox="0 0 32 32"
  >
    <rect width="32" height="32" fill="#FF371C" rx="4" />
    <g clipPath="url(#clip0_2478_9431)">
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m16 16-2-2m2 2 2 2m-2-2 2-2m-2 2-2 2m8.667-2a6.667 6.667 0 1 1-13.334 0 6.667 6.667 0 0 1 13.334 0"
      />
    </g>
    <defs>
      <clipPath id="clip0_2478_9431">
        <path fill="#fff" d="M8 8h16v16H8z" />
      </clipPath>
    </defs>
  </svg>
);

export default CancelIcon;
