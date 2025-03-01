import * as React from "react";

const Paypal = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 11c.7-.7 1.5-1 2.5-1 2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4V3h15.5c1.4 0 2.5 1.1 2.5 2.5 0 3.5-2.9 6.5-6.5 6.5H7zm0 0c-.7-.7-1.5-1-2.5-1-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4V3" />
  </svg>
);

export default Paypal;
