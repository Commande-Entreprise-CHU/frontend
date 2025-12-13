import React, { useState, useMemo } from "react";
import { Users, Building2, Shield } from "lucide-react";
import PageHeader from "../components/PageHeader";
import AdminUsers from "./AdminUsers";
import AdminChus from "./AdminChus";
import Tabs from "../components/Tabs";
import { useAuth } from "../context/AuthContext";

const AdminDashboard: React.FC = () => {
  const { isMasterAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<"users" | "chus">("users");

  const tabs = useMemo(() => {
    const baseTabs = [{ id: "users", label: "Utilisateurs", icon: Users }];
    
    // Only Master Admin can see CHUs tab
    if (isMasterAdmin) {
      baseTabs.push({ id: "chus", label: "CHUs", icon: Building2 });
    }
    
    return baseTabs;
  }, [isMasterAdmin]);

  const subtitle = isMasterAdmin 
    ? "Gérez les utilisateurs et les établissements de santé"
    : "Gérez les utilisateurs de votre CHU";

  return (
    <div className="container mx-auto p-6 space-y-6">
      <PageHeader
        icon={Shield}
        title="Administration"
        subtitle={subtitle}
      />

      <div className="flex flex-col space-y-6">
        {/* Only show tabs if there are multiple tabs */}
        {tabs.length > 1 && (
          <Tabs
            activeTab={activeTab}
            onChange={(id) => setActiveTab(id as "users" | "chus")}
            tabs={tabs}
            className="w-fit"
          />
        )}

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {activeTab === "users" && <AdminUsers isSubComponent />}
          {activeTab === "chus" && isMasterAdmin && <AdminChus isSubComponent />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

