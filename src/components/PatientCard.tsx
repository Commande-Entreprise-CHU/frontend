import { type FC } from "react";
import { useNavigate } from "react-router-dom";
import { Hash, User, FileText } from "lucide-react";
import Card from "./Card";
import { formatDate } from "../utils/date";

export interface PatientCardProps {
  id: string;
  name: string;
  prenom: string;
  ipp?: string | null;
  sexe?: string;
  dob?: string;
  /** Optional badge to display (e.g., "Créé", "Consulté") */
  badge?: {
    label: string;
    variant: "success" | "info" | "warning" | "error" | "primary" | "secondary";
  };
  /** Optional: show date of birth info */
  showDob?: boolean;
  /** Optional: show sexe info */
  showSexe?: boolean;
}

const PatientCard: FC<PatientCardProps> = ({
  id,
  name,
  prenom,
  ipp,
  sexe,
  dob,
  badge,
  showDob = true,
  showSexe = true,
}) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/patient/${id}`)}
      className="shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
      bodyClassName="p-6 flex-row items-center justify-between gap-4"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg group-hover:bg-primary group-hover:text-primary-content transition-colors">
          {name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
            {name} {prenom}
          </h3>
          <div className="flex items-center gap-4 text-sm text-base-content/60 mt-1">
            <span className="flex items-center gap-1">
              <Hash size={14} /> {ipp || "N/A"}
            </span>
            {showSexe && sexe && (
              <span className="flex items-center gap-1">
                <User size={14} /> {sexe}
              </span>
            )}
            {showDob && dob && <span>Né(e) le {formatDate(dob)}</span>}
          </div>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-3">
        {badge && (
          <span className={`badge badge-${badge.variant} badge-sm`}>
            {badge.label}
          </span>
        )}
        <div className="text-base-content/40 group-hover:translate-x-1 transition-transform">
          <FileText size={24} />
        </div>
      </div>
    </Card>
  );
};

export default PatientCard;
