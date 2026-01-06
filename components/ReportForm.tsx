import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { LatLng } from '../types';
import CameraCapture from './CameraCapture';

interface ReportFormProps {
  selectedLocation: LatLng | null;
  threeWordAddress: string;
  onSubmissionSuccess: () => void;
}

const GRIEVANCE_CATEGORIES = [
  'Potholes',
  'Garbage',
  'Water Logging',
  'Fallen Trees',
  'Open Manholes',
  'Streetlight Outage',
  'Other'
];

const ReportForm: React.FC<ReportFormProps> = ({
  selectedLocation,
  threeWordAddress,
  onSubmissionSuccess
}) => {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  useEffect(() => {
    setDescription('');
    setCategory('');
    setPhoto(null);
    setPhotoPreview(null);
  }, [threeWordAddress]);

  // 📁 File upload
  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setPhoto(base64);
      setPhotoPreview(base64);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  // 📷 Camera capture
  const handleCapture = (imageDataUrl: string) => {
    setPhoto(imageDataUrl);
    setPhotoPreview(imageDataUrl);
    setShowCamera(false);
  };

  // 🚀 Backend submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedLocation || !description || !category || !photo) {
      alert('Please complete all fields and add a photo.');
      return;
    }

    setIsSubmitting(true);

    const grievance = {
      description,
      category,
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
      threeWords: threeWordAddress,
      image: photo
    };

    try {
      const res = await fetch('http://127.0.0.1:5000/grievances', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(grievance)
      });

      if (!res.ok) throw new Error('Failed');

      onSubmissionSuccess();
    } catch (err) {
      alert('Failed to submit grievance');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!selectedLocation) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-lg text-center">
        <h3 className="text-xl font-semibold text-gray-700">Report a Civic Issue</h3>
        <p className="mt-4 text-gray-500">
          Click on the map to select the issue location.
        </p>
      </div>
    );
  }

  return (
    <>
      {showCamera && (
        <CameraCapture
          onCapture={handleCapture}
          onClose={() => setShowCamera(false)}
        />
      )}

      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Report Issue at:</h3>

        <div className="mb-4 p-3 bg-blue-50 border rounded-md text-center">
          <p className="text-xl font-bold text-blue-600">{threeWordAddress}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-md border-gray-300 bg-gray-50"
            required
          >
            <option value="" disabled>Select a category</option>
            {GRIEVANCE_CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full rounded-md border-gray-300 bg-gray-50"
            placeholder="Describe the issue"
            required
          />

          {/* 🖼 Preview */}
          <div className="h-40 border-2 border-dashed flex items-center justify-center">
            {photoPreview ? (
              <img src={photoPreview} className="max-h-full rounded" />
            ) : (
              <span className="text-gray-400">No photo yet</span>
            )}
          </div>

          {/* 📁 + 📷 Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <input type="file" accept="image/*" onChange={handlePhotoChange} />
            <button
              type="button"
              onClick={() => setShowCamera(true)}
              className="border rounded-md py-2"
            >
              Open Camera
            </button>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded-md"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Grievance'}
          </button>
        </form>
      </div>
    </>
  );
};

export default ReportForm;
