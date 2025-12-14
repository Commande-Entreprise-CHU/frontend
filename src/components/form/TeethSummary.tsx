
import { useMemo, type FC } from "react";
import { type TeethData } from "../../types/teethTypes";
import type { ToothOption } from "./TeethSelector";

interface TeethSummaryProps {
  teethData: TeethData;
  options: ToothOption[];
  label?: string;
}

const TeethSummary: FC<TeethSummaryProps> = ({
  teethData,
  options,
  label = "Résumé du schéma dentaire",
}) => {
  const summary = useMemo(() => {
    const grouped: Record<string, string[]> = {};

    // Group teeth by their state
    options.forEach((option) => {
      grouped[option.value] = [];
    });

    // Populate the groups
    Object.entries(teethData).forEach(([toothId, state]) => {
      if (grouped[state]) {
        grouped[state].push(toothId);
      }
    });

    return grouped;
  }, [teethData, options]);

  // Filter out empty states and find the corresponding option
  const nonEmptyStates = options.filter(
    (opt) => summary[opt.value]?.length > 0 && opt.value !== "Normal"
  );

  if (nonEmptyStates.length === 0) {
    return null;
  }

  return (
    <div className="card bg-base-100 border border-base-300 shadow-sm">
      <div className="card-body p-2">
        <h3 className="card-title text-xs font-semibold text-primary mb-1">
          {label}
        </h3>

        <div className="space-y-0.5">
          {nonEmptyStates.map((option) => {
            const teeth = summary[option.value];
            if (teeth.length === 0) return null;

            return (
              <div key={option.value} className="flex items-center gap-1.5">
                <svg
                  className={`w-2.5 h-2.5 flex-shrink-0 ${option.color} stroke-base-content/20`}
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                </svg>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-base-content leading-none">
                    {option.label}:{" "}
                    <span className="font-normal text-base-content/70">
                      {teeth.join(", ")}
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TeethSummary;
