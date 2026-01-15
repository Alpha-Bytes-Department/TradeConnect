import React, { useEffect, useState } from 'react';

import api from '@/app/api';
import { Award } from 'lucide-react';

interface Certification {
    id: string;
    name: string;
}

interface BusinessCertificationsProps {
    data: Certification[];
    setData: React.Dispatch<React.SetStateAction<Certification[]>>;
}

const availableCertifications: Certification[] = [
    { id: 'ata', name: 'ATA' },
    { id: 'fiata', name: 'FIATA' },
    { id: 'nvocc', name: 'NVOCC' },
    { id: 'customs-broker', name: 'Customs Broker License' },
    { id: 'local-freight', name: 'Local Freight Association' },
    { id: 'iso-9001', name: 'ISO 9001:2015' },
    { id: 'iso-9002', name: 'ISO 9002' },
    { id: 'fmc', name: 'FMC Registration' },
];




const Certifications: React.FC<BusinessCertificationsProps> = ({
    data,
    setData,
}) => {

    const [certifications,setCertifications]=useState<Certification[]>([])

    const handleToggle = (certification: Certification) => {
        const isSelected = data.some((cert) => cert.id === certification.id);

        if (isSelected) {
            setData(data.filter((cert) => cert.id !== certification.id));
        } else {
            setData([...data, certification]);
        }
    };

    const isSelected = (id: string) => {
        return data.some((cert) => cert.id === id);
    };


    useEffect(() => {
        
        const controller = new AbortController();

        const fetchCertifications = async () => {
            
            try {
                
                const res: any = await api.get('/core/certifications/', {
                    signal: controller.signal
                });

                
                if (res && res.certifications) {
                    setCertifications(res.certifications);
                } 

            } catch (err: any) {
                
                if (err.name !== 'CanceledError') {
                
                }
            }
        };

        fetchCertifications();

        return () => controller.abort();
    }, []);

    return (
        <div className="w-full ">
            <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                    Business Certifications
                </h2>
                <p className="text-sm text-gray-600">
                    Select all data that apply to your business
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {certifications.map((cert) => {
                    const selected = isSelected(cert.id);
                    return (
                        <div
                            key={cert.id}
                            onClick={() => handleToggle(cert)}
                            className={`
                                flex items-center px-4 py-3 border rounded-lg cursor-pointer transition-colors
                                ${selected
                                    ? 'bg-blue-50 border-blue-300'
                                    : 'bg-white border-gray-300 hover:border-gray-400'
                                }
                            `}
                        >
                            <div className="flex items-center h-5">
                                <input
                                    type="checkbox"
                                    checked={selected}
                                    onChange={() => handleToggle(cert)}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                            <label className="ml-3 text-sm text-gray-900 cursor-pointer select-none">
                                {cert.name}
                            </label>
                        </div>
                    );
                })}
            </div>

            {data.length > 0 && (
                <div className="px-4 py-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-700">
                        {data.length} certification{data.length !== 1 ? 's' : ''} selected
                    </p>
                </div>
            )}
        </div>
    );
};

export default Certifications;