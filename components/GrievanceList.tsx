
import React from 'react';
import { Grievance, LatLng } from '../types';
import { useGrievances } from '../context/GrievancesContext';

interface GrievanceListProps {
  grievances: Grievance[];
  onGrievanceSelect: (location: LatLng) => void;
  onStartNavigation: (destination: LatLng) => void;
}

const GrievanceList: React.FC<GrievanceListProps> = ({ grievances, onGrievanceSelect, onStartNavigation }) => {
  const { updateGrievanceStatus } = useGrievances();

  if (grievances.length === 0) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-lg text-center h-full flex items-center justify-center">
        <p className="text-gray-500">No grievances reported yet.</p>
      </div>
    );
  }
  
  const handleMarkAsCompleted = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Prevent card click event
    updateGrievanceStatus(id, 'completed');
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg h-full flex flex-col">
      <h3 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b">Submitted Grievances</h3>
      <div className="overflow-y-auto flex-grow pr-2">
        <ul className="space-y-4">
          {grievances.map((g) => (
            <li
              key={g.id}
              onClick={() => onGrievanceSelect({ lat: g.lat, lng: g.lng })}
              className={`p-4 border rounded-lg cursor-pointer hover:shadow-md transition-all duration-200 ${g.status === 'completed' ? 'bg-gray-100 opacity-60' : 'bg-white hover:bg-gray-50'}`}
            >
              <div className="flex items-start space-x-4">
                <img src={g.photo} alt="Grievance" className="w-24 h-24 object-cover rounded-md flex-shrink-0 bg-gray-200" />
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <p className="font-bold text-lg text-blue-600 tracking-wide">{g.threeWordAddress}</p>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${g.status === 'completed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                      {g.category}
                    </span>
                  </div>
                  <p className="text-gray-700 mt-1">{g.description}</p>
                  <p className="text-xs text-gray-500 mt-2">{new Date(g.timestamp).toLocaleString()}</p>
                  
                   <div className="mt-3 flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onStartNavigation({ lat: g.lat, lng: g.lng });
                        }}
                        className="text-sm bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors"
                      >
                        Navigate
                      </button>
                      {g.status === 'pending' && (
                        <button
                          onClick={(e) => handleMarkAsCompleted(e, g.id)}
                          className="text-sm bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition-colors"
                        >
                          Mark as Completed
                        </button>
                      )}
                       {g.status === 'completed' && (
                          <span className="text-sm font-semibold text-green-700">Completed</span>
                      )}
                    </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GrievanceList;
