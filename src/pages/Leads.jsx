import { useMemo, useState, useCallback } from "react";
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

  const handleSubmit = useCallback(
    (data) => {
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
    },
    [selectedLead, addLead, updateLead]
  );

  const handleEdit = useCallback((lead) => {
    setSelectedLead(lead);
    setShowForm(true);
  }, []);

  const handleDelete = useCallback(
    (id) => {
      if (window.confirm("Are you sure you want to delete this lead?")) {
        deleteLead(id);
      }
    },
    [deleteLead]
  );

  const handleAddLead = () => {
    setSelectedLead(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setSelectedLead(null);
    setShowForm(false);
  };

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        lead.name.toLowerCase().includes(search) ||
        lead.company.toLowerCase().includes(search) ||
        lead.email.toLowerCase().includes(search);

      const matchesFilter =
        activeFilter === "All" ||
        lead.status === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [leads, searchTerm, activeFilter]);

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Lead Management
          </h1>

          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Manage and organize your leads
          </p>

        </div>

        <button
          onClick={handleAddLead}
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-blue-600
            px-5
            py-3
            text-white
            transition
            hover:bg-blue-700
            min-h-[44px]
          "
        >
          <Plus size={18} />
          Add Lead
        </button>

      </div>

      {/* Search */}

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
      />

      {/* Filter */}

      <FilterBar
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {/* Lead Form */}

      {showForm && (
        <div
          className="
            fixed
            inset-0
            z-50
            bg-black/40
            flex
            items-center
            justify-center
            p-0
            md:p-6
          "
        >
          <div
            className="
              h-full
              w-full
              overflow-y-auto
              bg-white
              dark:bg-gray-800
              md:h-auto
              md:max-w-2xl
              md:rounded-2xl
              md:shadow-xl
              p-6
            "
          >
            <LeadForm
              initialData={selectedLead}
              onSubmit={handleSubmit}
              onCancel={handleCloseForm}
            />
          </div>
        </div>
      )}

      {/* Leads */}

      {filteredLeads.length === 0 ? (
        <EmptyState onAction={handleAddLead} />
      ) : (
        <>
          {/* Mobile */}

          <div className="grid gap-5 lg:hidden">
            {filteredLeads.map((lead) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {/* Desktop */}

          <div className="hidden lg:block">
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