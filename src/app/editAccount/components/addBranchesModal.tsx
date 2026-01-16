import api from '@/app/api';
import React, { useEffect, useState } from 'react';

interface Country {
  id: string;
  name: string;
  flag: string;
}

interface Branch {
  id:string;
  city: string;
  country: Country;
}

interface AddBranchModalProps {
  isData:Branch | undefined,
  isOpen: boolean;
  onClose: () => void;
  data: Branch[];
  setData: React.Dispatch<React.SetStateAction<Branch[]>>;
}

// Sample countries data - replace with your actual countries list
const COUNTRIES: Country[] = [
  { id: '1', name: 'United States', flag: '🇺🇸' },
  { id: '2', name: 'United Kingdom', flag: '🇬🇧' },
  { id: '3', name: 'Canada', flag: '🇨🇦' },
  { id: '4', name: 'Australia', flag: '🇦🇺' },
  { id: '5', name: 'Germany', flag: '🇩🇪' },
  // Add more countries as needed
];

const AddBranchModal: React.FC<AddBranchModalProps> = ({
  isOpen,
  onClose,
  isData,
  data,
  setData,
}) => {
  const [city, setCity] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [countries, setCountries]=useState([])

  const handleAddBranch = () => {
    if (!city.trim() || !selectedCountry) {
      return;
    }

    const newBranch: Branch = {
      id: new Date().toISOString(),
      city: city.trim(),
      country: selectedCountry,
    };

    isData ? setData(data.map((item: Branch) => {
      if (item.country.id === isData.country.id) {
        // Return a NEW object with updated city and country
        return {
          ...item,
          city: city.trim(),
          country: selectedCountry
        };
      }
      // Return unchanged item for others
      return item;
    })):setData([...data, newBranch]);
    handleClose();
  };



  const handleClose = () => {
    setCity('');
    setSelectedCountry(null);
    onClose();
  };

  


  useEffect(() => {
    const controller = new AbortController();

    const fetchCountries = async () => {
      
      try {
        // Using your api template
        const res: any = await api.get('/core/countries/', {
          signal: controller.signal
        });

        // Adjust based on your API response structure 
        // Usually res.data or res if your interceptor handles it
        if (res) {
          setCountries(res.countries);
          console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^',res.countries)
        }
      } catch (err: any) {
        if (err.name !== 'CanceledError') {
         
        }
      } 
      
    };

    fetchCountries();

    return () => controller.abort();
  }, []);


  

  useEffect(() => {
  if (isData){
    setSelectedCountry(isData.country)
    setCity(isData.city)
  }
  }, [isData])

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white  shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Add New Branch
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Add a new branch location to your business
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
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
                value={ city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                value={(selectedCountry?.id) || ''}
                onChange={(e) => {
                  const country = countries.find(
                    (c:Country) => c.id === e.target.value
                  );
                  setSelectedCountry(country || null);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="">Select country</option>
                {countries.map((country:Country) => (
                  <option key={country.id} value={country.id}>
                     {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-4 border-t bg-gray-50">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium bg-red-600 text-white  rounded-md hover: glr transition-colors flex items-center gap-2"
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
            disabled={!city.trim() || !selectedCountry}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            {isData ?'Edit Branch':'Add Branch'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBranchModal;