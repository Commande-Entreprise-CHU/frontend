import { type FC, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  iconColorClass?: string;
}

/**
 * PageHeader - Reusable page header component for consistency across pages.
 * 
 * Usage:
 * ```tsx
 * <PageHeader
 *   icon={UserCog}
 *   title="Gestion des Utilisateurs"
 *   subtitle="Gérez les accès et les affectations aux CHUs"
 *   actions={<Button>Action</Button>}
 * />
 * ```
 */
const PageHeader: FC<PageHeaderProps> = ({
  icon: Icon,
  title,
  subtitle,
  actions,
  iconColorClass = "text-primary",
}) => {
  return (
    <div className="flex items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-3">
        <div className={`p-3 bg-primary/10 rounded-xl ${iconColorClass}`}>
          <Icon size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          {subtitle && (
            <p className="text-base-content/60">{subtitle}</p>
          )}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
};

export default PageHeader;
