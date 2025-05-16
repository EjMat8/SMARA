import { createContext, useState } from "react";
import { useAsyncFn } from "react-use";
import { toaster } from "@/components/ui/toaster";
import axios from "axios";

const URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const AppContext = createContext({
  appResults: [],
  setAppResults: () => {},
  selectedApp: null,
  setSelectedApp: () => {},
  fetchAppResults: () => {},
  fetchAIInsights: () => {},
  insightStatus: { loading: false, error: null },
  appStatus: { loading: false, error: null },
  insightsValue: "",
  fetchDataSafety: () => {},
  dataSafetyStatus: { loading: false, error: null },
  dataSafetyResults: new Map(),
});

export const AppContextProvider = ({ children }) => {
  const [appResults, setAppResults] = useState([]);
  const [dataSafetyResults, setDataSafetyResults] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [insightsValue, setInsightsValue] = useState("");
  const [appStatus, setAppStatus] = useState({ loading: false, error: null });
  const [insightStatus, setInsightStatus] = useState({
    loading: false,
    error: null,
  });
  const [dataSafetyStatus, setDataSafetyStatus] = useState({
    loading: false,
    error: null,
  });

  const [, fetchAppResults] = useAsyncFn(async (body) => {
    // console.log(body);
    // console.log("getting data...");
    try {
      setAppStatus({ loading: true, error: null });
      const response = await axios.get(`${URL}/api/apps/search`, {
        params: body,
      });

      // console.log("Got it: ", response.data);
      setAppStatus({ loading: false, error: null });
      setAppResults(response.data);
      return response.data;
    } catch (err) {
      setAppStatus({ loading: false, error: err.message });
      toaster.create({
        description: "Error fetching data. Please try again. " + err.message,
        type: "error",
      });
    }
  }, []);

  const [, fetchAIInsights] = useAsyncFn(async (body) => {
    // console.log("getting insights data...");
    try {
      setInsightStatus({ loading: true, error: null });
      const response = await axios.post(`${URL}/api/apps/insights`, body);
      setInsightStatus({ loading: false, error: null });
      setInsightsValue(response.data.summary);
      // console.log("Got insights: ", response.data.summary);
      return response.data;
    } catch (err) {
      setInsightStatus({ loading: false, error: err.message });
      toaster.create({
        description:
          "Error fetching insights. Please try again. " + err.message,
        type: "error",
      });
    }
  }, []);

  const [, fetchDataSafety] = useAsyncFn(async (appIds) => {
    // console.log("Fetching data safety...", appIds);
    try {
      setDataSafetyStatus({ loading: true, error: null });
      const response = await axios.post(`${URL}/api/apps/datasafety`, {
        appIds,
      });
      setDataSafetyStatus({ loading: false, error: null });

      const dataSafetyMap = new Map(
        response.data.dataSafety.map((ds) => [ds.appId, ds.dataSafety])
      );

      setDataSafetyResults(dataSafetyMap);
      return response.data.dataSafety;
    } catch (err) {
      setDataSafetyStatus({ loading: false, error: err.message });
      toaster.create({
        description:
          "Error fetching data safety. Please try again. " + err.message,
        type: "error",
      });
      throw err;
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        appResults,
        setAppResults,
        selectedApp,
        setSelectedApp,
        fetchAppResults,
        appStatus,
        insightStatus,
        fetchAIInsights,
        insightsValue,
        fetchDataSafety,
        dataSafetyStatus,
        dataSafetyResults,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;
