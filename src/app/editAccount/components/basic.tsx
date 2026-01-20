import api from '@/app/api';
import React, { useEffect, useState } from 'react';


interface Country {
    id: string;
    name: string;
    flag: string;
}

interface Basic{
 business_name: string,
full_address: string,
country: Country,
}


interface BasicProps {
    data: Basic;
    setData: React.Dispatch<React.SetStateAction<Basic>>;
}

const Basic: React.FC<BasicProps> = ({ data, setData }) => {
    
    const [countries,setCountries] = useState<Country[]>([])
    const handleInputChange = (field: keyof Basic, value: string) => {
        setData(prev => ({
            ...prev,
            
                [field]: field==='country'?countries.find((c)=>c.id===value):value,
                
            
        }));
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
                    setCountries(res?.data.countries ? res?.data.countries : []);

                }
            } catch (err: any) {
                if (err.name !== 'CanceledError') {

                }
            }

        };

        fetchCountries();

        return () => controller.abort();
    }, []);




    return (
        <div className="w-full space-y-6">
            {/* Business business_name and Country Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Business business_name */}
                <div className="flex flex-col">
                    <label htmlFor="business-business_name" className="text-sm text-gray-700 mb-2">
                        Business business_name<span className="text-red-500">*</span>
                    </label>
                    <input
                        id="business-business_name"
                        type="text"
                        value={data.business_name}
                        onChange={(e) => handleInputChange('business_name', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        placeholder="Tech Solution Inc."
                    />
                </div>

                {/* Country */}
                <div className="flex flex-col">
                    <label htmlFor="country" className="text-sm text-gray-700 mb-2">
                        Country<span className="text-red-500">*</span>
                    </label>
                    <select
                        id="country"
                        value={data?.country.id}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 appearance-none bg-white cursor-pointer"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                            backgroundPosition: 'right 0.5rem center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: '1.5em 1.5em',
                            paddingRight: '2.5rem'
                        }}
                        
                        
                    >
                        {countries.map((country)=><option key={country.id} value={country.id}>{country.name}</option>)}
                        
                    </select>
                </div>
            </div>

            {/* Full Address */}
            <div className="flex flex-col">
                <label htmlFor="address" className="text-sm text-gray-700 mb-2">
                    Full Address<span className="text-red-500">*</span>
                </label>
                <input
                    id="address"
                    type="text"
                    value={data.full_address}
                    onChange={(e) => handleInputChange('full_address', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    placeholder="123 Tech street, san Francisco, CA 94105"
                />
            </div>
        </div>
    );
};

export default Basic;