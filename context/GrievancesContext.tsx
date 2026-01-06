
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Grievance } from '../types';

interface GrievancesContextType {
  grievances: Grievance[];
  addGrievance: (grievance: Omit<Grievance, 'id' | 'timestamp' | 'status'>) => void;
  updateGrievanceStatus: (id: string, status: 'completed') => void;
}

const GrievancesContext = createContext<GrievancesContextType | undefined>(undefined);

export const GrievancesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [grievances, setGrievances] = useState<Grievance[]>([]);

  const addGrievance = (grievance: Omit<Grievance, 'id' | 'timestamp' | 'status'>) => {
    const newGrievance: Grievance = {
      ...grievance,
      id: new Date().toISOString() + Math.random(),
      timestamp: Date.now(),
      status: 'pending',
    };
    setGrievances(prevGrievances => [newGrievance, ...prevGrievances]);
  };
  
  const updateGrievanceStatus = (id: string, status: 'completed') => {
    setGrievances(prevGrievances =>
      prevGrievances.map(g => (g.id === id ? { ...g, status } : g))
    );
  };

  return (
    <GrievancesContext.Provider value={{ grievances, addGrievance, updateGrievanceStatus }}>
      {children}
    </GrievancesContext.Provider>
  );
};

export const useGrievances = (): GrievancesContextType => {
  const context = useContext(GrievancesContext);
  if (!context) {
    throw new Error('useGrievances must be used within a GrievancesProvider');
  }
  return context;
};
