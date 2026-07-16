import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import LeadForm from "../components/leads/LeadForm";
import LeadCard from "../components/leads/LeadCard";
import LeadTable from "../components/leads/LeadTable";

import SearchBar from "../components/common/SearchBar";
import FilterBar from "../components/common/FilterBar";
import EmptyState from "../components/common/EmptyState";

import { useLeads } from "../context/LeadContext";

export default function Leads() {
  const {
    leads,
    addLead,
    updateLead,
    deleteLead,
  } = useLeads();

  const [showForm, setShowForm] = useState(false);

  const [selectedLead, setSelectedLead] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [activeFilter, setActiveFilter] = useState("All");

  function handleSubmit(data) {
    if (selectedLead) {
      updateLead({
        ...selectedLead,
        ...data,
      });
    } else {
      addLead(data);
    }

    setShowForm(false);
    setSelectedLead(null);
  }

  function handleEdit(lead) {
    setSelectedLead(lead);
    setShowForm(true);
  }

  function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this lead?"
    );

    if (confirmed) {
      deleteLead(id);
    }
  }

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        lead.company
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        lead.email
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesFilter =
        activeFilter === "All" ||
        lead.status === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [leads, searchTerm, activeFilter]);

  return (
    <div className="min-h-screen bg-slate-50 p-8">

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Lead Management
          </h1>

          <p className="mt-2 text-gray-500">
            Manage and organize your leads
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedLead(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Lead
        </button>

      </div>

      {/* Search + Filter */}

      <div className="mb-8 space-y-5">

        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
        />

        <FilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

      </div>

      {/* Form */}

      {showForm && (
        <div className="mb-8 rounded-xl border bg-white p-6 shadow">

          <LeadForm
            initialData={selectedLead}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setSelectedLead(null);
            }}
          />

        </div>
      )}

      {/* Empty State */}

      {filteredLeads.length === 0 ? (
        <EmptyState
          onAction={() => {
            setSelectedLead(null);
            setShowForm(true);
          }}
        />
      ) : (
        <>
          {/* Mobile Cards */}

          <div className="grid gap-5 md:hidden">

            {filteredLeads.map((lead) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}

          </div>

          {/* Desktop Table */}

          <div className="hidden md:block">

            <LeadTable
              leads={filteredLeads}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

          </div>
        </>
      )}

    </div>
  );
}