import React, { useState } from "react";
import { Users, Building2, Shield } from "lucide-react";
import PageHeader from "../components/PageHeader";
import AdminUsers from "./AdminUsers";
import AdminChus from "./AdminChus";
import Tabs from "../components/Tabs";
const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"users" | "chus">("users");

  return (
    <div className="container mx-auto p-6 space-y-6">
      <PageHeader
        icon={Shield}
        title="Administration"
        subtitle="Gérez les utilisateurs et les établissements de santé"
      />

      <div className="flex flex-col space-y-6">
        <Tabs
          activeTab={activeTab}
          onChange={(id) => setActiveTab(id as "users" | "chus")}
          tabs={[
            { id: "users", label: "Utilisateurs", icon: Users },
            { id: "chus", label: "CHUs", icon: Building2 },
          ]}
          className="w-fit"
        />

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {activeTab === "users" && <AdminUsers isSubComponent />}
          {activeTab === "chus" && <AdminChus isSubComponent />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
