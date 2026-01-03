import React from 'react';
interface BasicProps {
    data: { name: string, address: string, country: string };
    setData: React.Dispatch<React.SetStateAction<Data>>;
}

const Basic: React.FC<BasicProps> = ({ data, setData }) => {
    const handleInputChange = (field: keyof Data['basic'], value: string) => {
        setData(prev => ({
            ...prev,
            basic: {
                ...prev.basic,
                [field]: value
            }
        }));
    };
    const countries = ['United States', 'Canada', 'Singapore', 'France', 'Dubai', 'Argentina', 'Germany', 'Nepal', 'Finland']
    return (
        <div className="w-full space-y-6">
            {/* Business Name and Country Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Business Name */}
                <div className="flex flex-col">
                    <label htmlFor="business-name" className="text-sm text-gray-700 mb-2">
                        Business Name<span className="text-red-500">*</span>
                    </label>
                    <input
                        id="business-name"
                        type="text"
                        value={data.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
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
                        value={data.country}
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
                        {countries.map((country,index)=><option key={index} value="United States">{country}</option>)}
                        
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
                    value={data.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    placeholder="123 Tech street, san Francisco, CA 94105"
                />
            </div>
        </div>
    );
};

export default Basic;