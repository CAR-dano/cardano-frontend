import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Dashboard Main Stats
export const getMainStats = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/dashboard/main-stats`, config);
  return response.data;
};

// Branch Distribution
export const getBranchDistribution = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${API_URL}/dashboard/branch-distribution`,
    config
  );
  return response.data;
};

// Inspector Performance
export const getInspectorPerformance = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${API_URL}/dashboard/inspector-performance`,
    config
  );
  return response.data;
};

// Overall Value Distribution
export const getOverallValueDistribution = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${API_URL}/dashboard/overall-value-distribution`,
    config
  );
  return response.data;
};

// Car Brand Distribution
export const getCarBrandDistribution = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${API_URL}/dashboard/car-brand-distribution`,
    config
  );
  return response.data;
};

// Production Year Distribution
export const getProductionYearDistribution = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${API_URL}/dashboard/production-year-distribution`,
    config
  );
  return response.data;
};

// Transmission Type Distribution
export const getTransmissionTypeDistribution = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${API_URL}/dashboard/transmission-type-distribution`,
    config
  );
  return response.data;
};

// Blockchain Status
export const getBlockchainStatus = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${API_URL}/dashboard/blockchain-status`,
    config
  );
  return response.data;
};

const dashboardService = {
  getMainStats,
  getBranchDistribution,
  getInspectorPerformance,
  getOverallValueDistribution,
  getCarBrandDistribution,
  getProductionYearDistribution,
  getTransmissionTypeDistribution,
  getBlockchainStatus,
};

export default dashboardService;
