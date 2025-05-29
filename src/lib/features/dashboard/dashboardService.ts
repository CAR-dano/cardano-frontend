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

// Combined Dashboard Data
export const getCombinedDashboardData = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [branchDistribution, inspectorPerformance, blockchainStatus] =
    await Promise.all([
      axios.get(`${API_URL}/dashboard/branch-distribution`, config),
      axios.get(`${API_URL}/dashboard/inspector-performance`, config),
      axios.get(`${API_URL}/dashboard/blockchain-status`, config),
    ]);

  return {
    branchDistribution: branchDistribution.data,
    inspectorPerformance: inspectorPerformance.data,
    blockchainStatus: blockchainStatus.data,
  };
};

const dashboardService = {
  getMainStats,
  getCombinedDashboardData,
};

export default dashboardService;
