import React from "react";
import {type LucideIcon } from "lucide-react";

export interface TabItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  disabled?: boolean;
  completed?: boolean;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className = "",
}) => {
  return (
    <div
      className={`tabs tabs-boxed bg-base-200/50 p-1 gap-1 overflow-x-auto flex-nowrap justify-start ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => !tab.disabled && onChange(tab.id)}
            disabled={tab.disabled}
            className={`
              tab tab-lg h-12 px-6 rounded-lg transition-all duration-200 flex-nowrap whitespace-nowrap gap-2
              ${
                isActive
                  ? "tab-active bg-base-100 shadow-sm text-primary font-bold border border-base-200"
                  : "hover:bg-base-200"
              }
              ${!isActive && tab.completed ? "text-success" : ""}
              ${
                tab.disabled
                  ? "opacity-50 cursor-not-allowed bg-transparent hover:bg-transparent"
                  : ""
              }
            `}
          >
            {Icon && <Icon size={18} />}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
