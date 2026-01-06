
import React, { useState } from 'react';
import InteractiveMap from '../components/InteractiveMap';
import ReportForm from '../components/ReportForm';
import useGeolocation from '../hooks/useGeolocation';
import { LatLng } from '../types';
import { coordToThreeWords } from '../utils/threeWordAddress';
import { VISAKHAPATNAM_CENTER } from '../constants';

const CitizenPage: React.FC = () => {
  const { data: userLocation, loading, error } = useGeolocation();
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleMapClick = (latlng: LatLng) => {
    setSelectedLocation(latlng);
    setShowSuccess(false); // Hide success message on new selection
  };
  
  const handleSubmissionSuccess = () => {
      setShowSuccess(true);
      setSelectedLocation(null);
  }

  const mapCenter = userLocation || VISAKHAPATNAM_CENTER;
  const userLocationAddress = userLocation ? coordToThreeWords(userLocation) : '...';

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 h-full overflow-hidden">
      <div className="md:col-span-2 h-full w-full">
        {loading && <div className="flex items-center justify-center h-full bg-gray-200"><p>Fetching your location...</p></div>}
        {error && <div className="flex items-center justify-center h-full bg-red-100 text-red-700"><p>Error: {error.message}. Defaulting to city center.</p></div>}
        <InteractiveMap 
            center={mapCenter} 
            onMapClick={handleMapClick} 
            selectedLocation={selectedLocation} 
            userLocation={userLocation}
        />
      </div>
      <div className="md:col-span-1 h-full w-full bg-gray-50 overflow-y-auto p-4 md:p-6">
        {showSuccess && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded-md" role="alert">
                <p className="font-bold">Success</p>
                <p>Your grievance has been submitted successfully.</p>
            </div>
        )}
        
        <div className="p-4 bg-white rounded-lg shadow-lg mb-6">
            <h4 className="text-md font-semibold text-gray-700">Your Location Address</h4>
            <p className="mt-2 p-2 bg-gray-100 text-center rounded-md font-mono text-gray-800">
                {userLocationAddress}
            </p>
        </div>

        <ReportForm 
            selectedLocation={selectedLocation}
            threeWordAddress={selectedLocation ? coordToThreeWords(selectedLocation) : ''}
            onSubmissionSuccess={handleSubmissionSuccess}
        />
      </div>
    </div>
  );
};

export default CitizenPage;
