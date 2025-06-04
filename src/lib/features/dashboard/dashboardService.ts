import axios from "axios";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Dashboard Main Stats
interface DateParams {
  startDate?: string;
  endDate?: string;
}

export const getMainStats = async (token: string, dateRange?: DateRange) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {} as DateParams,
  };

  if (dateRange?.from) {
    config.params.startDate = format(dateRange.from, "yyyy-MM-dd");
  }
  if (dateRange?.to) {
    config.params.endDate = format(dateRange.to, "yyyy-MM-dd");
  }

  const response = await axios.get(`${API_URL}/dashboard/main-stats`, config);
  return response.data;
};

// Combined Dashboard Data
export const getCombinedDashboardData = async (
  token: string,
  dateRange?: DateRange
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {} as DateParams,
  };

  if (dateRange?.from) {
    config.params.startDate = format(dateRange.from, "yyyy-MM-dd");
  }
  if (dateRange?.to) {
    config.params.endDate = format(dateRange.to, "yyyy-MM-dd");
  }

  const configOrder = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {} as any,
  };

  if (dateRange?.from) {
    configOrder.params.start_date = format(dateRange.from, "yyyy-MM-dd");
  }
  if (dateRange?.to) {
    configOrder.params.end_date = format(dateRange.to, "yyyy-MM-dd");
  }
  configOrder.params.range_type = "custom";

  const [trendData, branchDistribution, inspectorPerformance] =
    await Promise.all([
      axios.get(`${API_URL}/dashboard/order-trend`, configOrder),
      axios.get(`${API_URL}/dashboard/branch-distribution`, config),
      axios.get(`${API_URL}/dashboard/inspector-performance`, config),
    ]);

  return {
    trendData: trendData.data,
    branchDistribution: branchDistribution.data,
    inspectorPerformance: inspectorPerformance.data,
  };
};

const dashboardService = {
  getMainStats,
  getCombinedDashboardData,
};

export default dashboardService;
