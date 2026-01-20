import api from '@/app/api';
import React, { useEffect, useState, useCallback } from 'react';

interface Country {
  id: string;
  name: string;
  flag: string;
}

interface Branch {
  id: string;
  full_name: string;
  address: string;
  city: string;
  country: Country | null;
  phone_number: string;
}

interface AddBranchModalProps {
  isData: Branch | undefined;
  isOpen: boolean;
  onClose: () => void;
  data: Branch[];
  setData: React.Dispatch<React.SetStateAction<Branch[]>>;
  setOnSubmit: React.Dispatch<React.SetStateAction<boolean>>
}

const AddBranchModal: React.FC<AddBranchModalProps> = ({
  isOpen,
  onClose,
  isData,
  data,
  setData,
  setOnSubmit,
}) => {
  const [city, setCity] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [countriesLoading, setCountriesLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch updated business data including all branches
  const fetchBusinessData = useCallback(async () => {
    try {
      const response: any = await api.get('/business/my/');
      const businessData = response.data || response;

      if (businessData?.branches) {
        setData(businessData.branches);
      }
    } catch (err) {
      console.error('Error fetching business data:', err);
    }
  }, [setData]);

  // Handle branch add/update
  const handleAddBranch = async () => {
    // Validation
    if (!city.trim() || !selectedCountry) {
      setError('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const payload = {
        city: city.trim(),
        country: selectedCountry.id,
        full_name: '',
        address: city.trim() + ', ' + selectedCountry.name,
        phone_number: '',
      };

      if (isData) {
        // UPDATE EXISTING BRANCH
        await api.patch(
          `/business/branch-locations/${isData.id}/`,
          payload
        );

        // Since edit/delete responses have no valuable data, refetch all business data
        await fetchBusinessData();
        setOnSubmit(true)
      } else {
        // CREATE NEW BRANCH
        const response: any = await api.post(
          '/business/branch-locations/',
          payload
        );

        const newBranch = response.data || response;

        // Construct UI branch object with full country data
        const uiBranchObject: Branch = {
          ...newBranch,
          country: selectedCountry,
        };
        
        // Optimistically update UI
        //setData((prev) => [...prev, uiBranchObject]);
        setOnSubmit(true)
      }

      handleClose();
    } catch (err: any) {
      console.error('Error saving branch:', err);
      setError(
        err?.response?.data?.message ||
        err?.message ||
        'Failed to save branch. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Clean up and close modal
  const handleClose = () => {
    setCity('');
    setSelectedCountry(null);
    setError('');
    onClose();
  };

  // Fetch countries when modal opens
  useEffect(() => {
    const controller = new AbortController();

    const fetchCountries = async () => {
      setCountriesLoading(true);
      try {
        const response: any = await api.get('/core/countries/', {
          signal: controller.signal,
        });

        // Handle different possible response structures
        const countriesData = response?.countries || response?.results || response?.data || response || [];
        setCountries(Array.isArray(countriesData) ? countriesData : []);
      } catch (err: any) {
        if (err.name !== 'CanceledError' && err.name !== 'AbortError') {
          console.error('Error fetching countries:', err);
          setError('Failed to load countries');
        }
      } finally {
        setCountriesLoading(false);
      }
    };

    if (isOpen) {
      fetchCountries();
    }

    return () => controller.abort();
  }, [isOpen]);

  // Populate form when editing
  useEffect(() => {
    if (isOpen) {
      if (isData) {
        setCity(isData.city || '');
        setSelectedCountry(isData.country || null);
      } else {
        setCity('');
        setSelectedCountry(null);
      }
      setError('');
    }
  }, [isData, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {isData ? 'Edit Branch' : 'Add New Branch'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {isData
                ? 'Update existing branch location details'
                : 'Add a new branch location to your business'}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isLoading}
            aria-label="Close modal"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {/* City Input */}
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                City*
              </label>
              <input
                id="city"
                type="text"
                placeholder="City name"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  if (error) setError('');
                }}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
              />
            </div>

            {/* Country Select */}
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Country*
              </label>
              <select
                id="country"
                value={selectedCountry?.id || ''}
                onChange={(e) => {
                  const country = countries.find(
                    (c: Country) => c.id === e.target.value
                  );
                  setSelectedCountry(country || null);
                  if (error) setError('');
                }}
                disabled={isLoading || countriesLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white disabled:bg-gray-100 disabled:text-gray-500"
              >
                {countriesLoading ? (
                  <option value="">Loading countries...</option>
                ) : (
                  <>
                    <option value="">Select country</option>
                    {countries.map((country: Country) => (
                      <option key={country.id} value={country.id}>
                        {country.name}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-4 border-t bg-gray-50">
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center gap-2 disabled:bg-red-400"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Cancel
          </button>
          <button
            onClick={handleAddBranch}
            disabled={!city.trim() || !selectedCountry || isLoading || countriesLoading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {isLoading ? (
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            )}
            {isData ? 'Edit Branch' : 'Add Branch'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBranchModal;