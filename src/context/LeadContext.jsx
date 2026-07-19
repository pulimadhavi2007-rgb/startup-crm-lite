import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import toast from "react-hot-toast";
import * as leadService from "../services/leadService";

const LeadContext = createContext();

export const LeadProvider = ({ children }) => {
  const [leads, setLeads] = useState([]);

  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 20,
    pages: 0,
    hasNext: false,
    hasPrev: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  // ==========================
  // Fetch All Leads
  // ==========================
  const fetchLeads = async (params = {}) => {
    setIsLoading(true);

    try {
      const response = await leadService.getLeads(params);

      setLeads(response.data || []);
      setPagination(
        response.pagination || {
          total: 0,
          page: 1,
          limit: 20,
          pages: 0,
          hasNext: false,
          hasPrev: false,
        }
      );

      return response;
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to fetch leads"
      );

      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // ==========================
  // Automatically Load Leads
  // ==========================
  useEffect(() => {
    const token = localStorage.getItem("crm-token");

    if (token) {
      fetchLeads();
    }
  }, []);

  // ==========================
  // Add Lead
  // ==========================
  const addLead = async (leadData) => {
    try {
      const response = await leadService.createLead(
        leadData
      );

      setLeads((prev) => [response.data, ...prev]);

      toast.success(
        response.message || "Lead created successfully"
      );

      return response;
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to create lead"
      );

      throw error;
    }
  };

  // ==========================
  // Update Lead
  // ==========================
  const updateLead = async (id, leadData) => {
    try {
      const response = await leadService.updateLead(
        id,
        leadData
      );

      setLeads((prev) =>
        prev.map((lead) =>
          lead._id === id ? response.data : lead
        )
      );

      toast.success(
        response.message || "Lead updated successfully"
      );

      return response;
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update lead"
      );

      throw error;
    }
  };

  // ==========================
  // Delete Lead
  // ==========================
  const deleteLead = async (id) => {
    try {
      const response = await leadService.deleteLead(id);

      setLeads((prev) =>
        prev.filter((lead) => lead._id !== id)
      );

      toast.success(
        response.message || "Lead deleted successfully"
      );

      return response;
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to delete lead"
      );

      throw error;
    }
  };

  return (
    <LeadContext.Provider
      value={{
        leads,
        setLeads,
        pagination,
        isLoading,
        fetchLeads,
        addLead,
        updateLead,
        deleteLead,
      }}
    >
      {children}
    </LeadContext.Provider>
  );
};

// ==========================
// Custom Hooks
// ==========================

export const useLeads = () => useContext(LeadContext);

export const useLead = () => useContext(LeadContext);

export default LeadContext;