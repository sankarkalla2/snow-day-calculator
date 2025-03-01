"use client";

import * as React from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface UpgradeBannerProps {
  buttonText?: string;
  description?: string;
  onClose?: () => void;
  onClick?: () => void;
  className?: string;
}

const SettingsFilled = ({ className }: { className?: string }) => (
  <svg
    className={className}
    data-testid="geist-icon"
    height="16"
    strokeLinejoin="round"
    viewBox="0 0 16 16"
    width="16"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.49999 0H6.49999L6.22628 1.45975C6.1916 1.64472 6.05544 1.79299 5.87755 1.85441C5.6298 1.93996 5.38883 2.04007 5.15568 2.15371C4.98644 2.2362 4.78522 2.22767 4.62984 2.12136L3.40379 1.28249L1.28247 3.40381L2.12135 4.62986C2.22766 4.78524 2.23619 4.98646 2.1537 5.15569C2.04005 5.38885 1.93995 5.62981 1.8544 5.87756C1.79297 6.05545 1.6447 6.19162 1.45973 6.2263L0 6.5V9.5L1.45973 9.7737C1.6447 9.80838 1.79297 9.94455 1.8544 10.1224C1.93995 10.3702 2.04006 10.6112 2.1537 10.8443C2.23619 11.0136 2.22767 11.2148 2.12136 11.3702L1.28249 12.5962L3.40381 14.7175L4.62985 13.8786C4.78523 13.7723 4.98645 13.7638 5.15569 13.8463C5.38884 13.9599 5.6298 14.06 5.87755 14.1456C6.05544 14.207 6.1916 14.3553 6.22628 14.5403L6.49999 16H9.49999L9.77369 14.5403C9.80837 14.3553 9.94454 14.207 10.1224 14.1456C10.3702 14.06 10.6111 13.9599 10.8443 13.8463C11.0135 13.7638 11.2147 13.7723 11.3701 13.8786L12.5962 14.7175L14.7175 12.5962L13.8786 11.3701C13.7723 11.2148 13.7638 11.0135 13.8463 10.8443C13.9599 10.6112 14.06 10.3702 14.1456 10.1224C14.207 9.94455 14.3553 9.80839 14.5402 9.7737L16 9.5V6.5L14.5402 6.2263C14.3553 6.19161 14.207 6.05545 14.1456 5.87756C14.06 5.62981 13.9599 5.38885 13.8463 5.1557C13.7638 4.98647 13.7723 4.78525 13.8786 4.62987L14.7175 3.40381L12.5962 1.28249L11.3701 2.12137C11.2148 2.22768 11.0135 2.2362 10.8443 2.15371C10.6111 2.04007 10.3702 1.93996 10.1224 1.85441C9.94454 1.79299 9.80837 1.64472 9.77369 1.45974L9.49999 0ZM8 11C9.65685 11 11 9.65685 11 8C11 6.34315 9.65685 5 8 5C6.34315 5 5 6.34315 5 8C5 9.65685 6.34315 11 8 11Z"
      fill="currentColor"
    ></path>
  </svg>
);

export function UpgradeBanner({
  buttonText = "Upgrade to Pro",
  description = "for 2x more CPUs and faster builds",
  onClose,
  onClick,
  className,
}: UpgradeBannerProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  const iconVariants = {
    hidden: { x: 0, y: 0, opacity: 0, rotate: 0 },
    visible: (custom: { x: number; y: number }) => ({
      x: custom.x,
      y: custom.y,
      opacity: 1,
      rotate: 360,
      transition: {
        x: { duration: 0.3, ease: "easeOut" },
        y: { duration: 0.3, ease: "easeOut" },
        opacity: { duration: 0.3 },
        rotate: {
          duration: 1,
          type: "spring",
          stiffness: 100,
          damping: 10,
        },
      },
    }),
  };

  return (
    <div className={cn("mx-auto flex items-center justify-center", className)}>
      <AnimatePresence>
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            initial="hidden"
            animate={isHovered ? "visible" : "hidden"}
            variants={iconVariants}
            custom={{ x: -10, y: -10 }}
            className="pointer-events-none absolute left-[4px] top-[2px]"
          >
            <SettingsFilled className="text-[#005FF2] dark:text-[#006EFE]" />
          </motion.div>
          <motion.div
            initial="hidden"
            animate={isHovered ? "visible" : "hidden"}
            variants={iconVariants}
            custom={{ x: 10, y: 10 }}
            className="pointer-events-none absolute bottom-[2px] left-[6rem]"
          >
            <SettingsFilled className="text-[#005FF2] dark:text-[#006EFE]" />
          </motion.div>
          <div className="relative flex h-[35px] items-center gap-1 rounded-[6px] border border-[#CBE7FF] bg-[#F0F7FF] pl-2.5 pr-1 text-sm dark:border-[#003674] dark:bg-[#06193A]">
            <button
              className="focus-visible:shadow-focus-ring rounded-xs my-[-1px] cursor-pointer border-none bg-transparent px-0 py-1 font-sans text-[13px] font-medium text-[#002359] underline decoration-[#CAE7FF] underline-offset-[5px] outline-none hover:text-[#005FF2] hover:decoration-[#94CCFF] focus-visible:!shadow-[#008FFF] dark:text-[#EAF5FF] dark:decoration-[#003674] dark:hover:text-[#44A7FF] dark:hover:decoration-[#00408A]"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={onClick}
            >
              {buttonText}
            </button>
            <span className="text-[0.8125rem] text-[#005FF2] dark:text-[#44A7FF]">
              {description}
            </span>
            {onClose && (
              <button
                onClick={onClose}
                className="m-0 flex h-6 !w-6 shrink-0 cursor-pointer items-center justify-center rounded-[4px] border-0 bg-transparent p-0 text-[#005FF2] hover:bg-[#CAE7FF] dark:hover:bg-[#012F61]"
              >
                <X size={16} className="text-[#005FF2] dark:text-[#47A8FF]" />
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
