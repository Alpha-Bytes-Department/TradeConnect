import React,{useState} from 'react';
import { EditData } from '../page';
import AddContactModal from './contactsModal';

interface ContactsProps {
    editData: EditData;
    setEditData: React.Dispatch<React.SetStateAction<EditData>>;
}

interface Contact {
    id: string;
    fullName: string;
    role: string;
    email: string;
    phoneNumber: string;
    isPrimary: boolean;
}

const Contacts: React.FC<ContactsProps> = ({ editData, setEditData }) => {
    const handleInputChange = (field: keyof EditData['contact'], value: string) => {
        setEditData((prev) => ({
            ...prev,
            contact: {
                ...prev.contact,
                [field]: value,
            },
        }));
    };


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [contacts, setContacts] = useState<Contact[]>([]);

    const handleAddContact = (data: Omit<Contact, 'id'>) => {
        const newContact: Contact = {
            ...data,
            id: Date.now().toString(),
        };
        setContacts([...contacts, newContact]);
    };

    return (
        <div className="w-full mx-auto space-y-6">
            {/* Email Address and Phone Number Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email Address */}
                <div className="flex flex-col">
                    <label htmlFor="country" className="text-sm text-gray-700 mb-2">
                        Email Address<span className="text-red-500">*</span>
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={editData.contact.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        placeholder="business@company.com"
                    />
                </div>

                {/* Phone Number */}
                <div className="flex flex-col">
                    <label htmlFor="country" className="text-sm text-gray-700 mb-2">
                        Phone Number<span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <input
                            id="phone"
                            type='tel'
                            maxLength={14}
                            value={editData.contact.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            placeholder="+1 555 0123 5248"
                        />
                    </div>
                </div>
            </div>

            {/* Website URL */}
            <div className="flex flex-col">
                <label htmlFor="country" className="text-sm text-gray-700 mb-2">
                    Website URL<span className="text-red-500">*</span>
                </label>
                <input
                    id="website"
                    type="url"
                    value={editData.contact.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="https://techsolutions.com"
                />
            </div>
            <AddContactModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddContact}
            />
        </div>
    );
};

export default Contacts;