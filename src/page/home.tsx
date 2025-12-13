import React from "react";
import { Link } from "react-router-dom";
import { UserPlus, Search, ArrowRight, LayoutDashboard, Users, FileText } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import PatientCard from "../components/PatientCard";
import { useStats, useMyRecentPatients } from "../hooks/statsHooks";

const Home: React.FC = () => {
  const { data: stats, isLoading: loadingStats } = useStats();
  const { data: recentPatients, isLoading: loadingRecent } = useMyRecentPatients();

  return (
    <div className="container mx-auto p-6 space-y-8">
      <PageHeader
        icon={LayoutDashboard}
        title="Tableau de Bord"
        subtitle="Bienvenue sur le portail de Consultation Maxillo-Faciale"
        iconColorClass="text-primary"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Nouveau Patient Card */}
        <Link to="/patient/new" className="group h-full">
          <Card 
            className="h-full hover:shadow-lg transition-all duration-200 border-base-300 hover:border-primary/50 group-hover:-translate-y-1 block"
            bodyClassName="p-6 h-full flex flex-col"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <UserPlus size={24} />
              </div>
              <ArrowRight className="text-base-content/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">Nouveau Patient</h3>
            <p className="text-base-content/60">
              Créer un dossier pour une première consultation ou un suivi.
            </p>
          </Card>
        </Link>

        {/* Consultation Card */}
        <Link to="/search" className="group h-full">
          <Card 
            className="h-full hover:shadow-lg transition-all duration-200 border-base-300 hover:border-secondary/50 group-hover:-translate-y-1 block"
            bodyClassName="p-6 h-full flex flex-col"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-secondary/10 rounded-xl text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                <Search size={24} />
              </div>
              <ArrowRight className="text-base-content/30 group-hover:text-secondary group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="font-bold text-xl mb-2 group-hover:text-secondary transition-colors">Rechercher</h3>
            <p className="text-base-content/60">
              Retrouver un patient existant par nom, IPP ou date de naissance.
            </p>
          </Card>
        </Link>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <StatsCard
          title="Patients"
          value={stats?.patients || 0}
          icon={Users}
          color="primary"
          loading={loadingStats}
        />
        <StatsCard
          title="Consultations"
          value={stats?.consultations || 0}
          icon={FileText}
          color="secondary"
          loading={loadingStats}
        />
        {/* Placeholder or other stats could go here */}
      </div>

      {/* My Recent Patients */}
      <Card title="Mes Derniers Patients">
        {loadingRecent ? (
          <div className="flex justify-center p-8">
            <span className="loading loading-spinner text-primary"></span>
          </div>
        ) : recentPatients && recentPatients.length > 0 ? (
          <div className="grid grid-cols-1 gap-3">
            {recentPatients.map((patient) => (
              <PatientCard
                key={patient.id}
                id={patient.id}
                name={patient.name}
                prenom={patient.prenom}
                ipp={patient.ipp}
                dob={patient.date}
                showSexe={false}
                badge={{
                  label: patient.action === "created" ? "Créé" : "Consulté",
                  variant: patient.action === "created" ? "success" : "info",
                }}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-32 text-base-content/40">
            <Users size={24} className="mb-2 opacity-50" />
            <p>Aucun patient récent</p>
          </div>
        )}
      </Card>

      <div className="text-center text-xs text-base-content/30 font-mono mt-12">
        CHU Nantes • v0.1.0
      </div>
    </div>
  );
};

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  color: "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";
  loading?: boolean;
}

const StatsCard = ({ title, value, icon: Icon, color, loading }: StatsCardProps) => {
  return (
    <div className={`stat bg-base-100 shadow rounded-box border border-base-200`}>
      <div className={`stat-figure text-${color}`}>
        <Icon size={32} />
      </div>
      <div className="stat-title">{title}</div>
      <div className={`stat-value text-${color}`}>
        {loading ? <span className="loading loading-spinner loading-sm"></span> : value}
      </div>
    </div>
  );
};

export default Home;
