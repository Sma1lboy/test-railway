import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react';

export interface SystemStatus {
  operational: boolean;
  message: string;
  lastUpdated: Date;
}

interface SystemStatusContextType {
  status: SystemStatus;
  refreshStatus: () => Promise<void>;
}

const defaultStatus: SystemStatus = {
  operational: false,
  message: 'System status not loaded.',
  lastUpdated: new Date(0),
};

const SystemStatusContext = createContext<SystemStatusContextType | undefined>(undefined);

interface SystemStatusProviderProps {
  children: ReactNode;
}

export const SystemStatusProvider = ({ children }: SystemStatusProviderProps) => {
  const [status, setStatus] = useState<SystemStatus>(defaultStatus);

  const refreshStatus = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:3000/api/system-status');
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      const data = await response.json();
      // Use mock data if API returns empty or undefined values.
      const newStatus: SystemStatus = {
        operational: data?.operational ?? true,
        message: data?.message ?? 'System is operational.',
        lastUpdated: data?.lastUpdated ? new Date(data.lastUpdated) : new Date(),
      };
      setStatus(newStatus);
    } catch (error) {
      console.error('Error fetching system status:', error);
      // Fallback mock response in case of error.
      setStatus({
        operational: false,
        message: 'Failed to fetch system status.',
        lastUpdated: new Date(),
      });
    }
  };

  useEffect(() => {
    // Refresh system status when the provider mounts.
    refreshStatus();
  }, []);

  return (
    <SystemStatusContext.Provider value={{ status, refreshStatus }}>
      {children}
    </SystemStatusContext.Provider>
  );
};

export const useSystemStatus = (): SystemStatusContextType => {
  const context = useContext(SystemStatusContext);
  if (context === undefined) {
    throw new Error('useSystemStatus must be used within a SystemStatusProvider');
  }
  return context;
};