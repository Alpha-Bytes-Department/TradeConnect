import React,{useState} from 'react';
import { EditData } from '../page';
import AddContactModal from './contactsModal';
import { Mail, Pencil, Phone, Plus, Star, Trash2 } from 'lucide-react';

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


    const contact= {
        office: {
            phone: '5656565494555',
            email: 'mmislam272@gmail.com',
            website: '',
        },
        contacts: [
            {
                id: 1,
                name: 'Sample Name',
                position: 'CEO',
                phone: '5656565494555',
                email: 'mmislam272@gmail.com',
                isPrimary: true,
            },
            {
                
                id: 2,
                name: 'Sample Name',
                position: 'CEO',
                phone: '5656565494555',
                email: 'mmislam272@gmail.com',
                isPrimary: true,
            },
            {
                id: 3, 
                name: 'Sample Name',
                position: 'CEO',
                phone: '5656565494555',
                email: 'mmislam272@gmail.com',
                isPrimary: true,
            },
        ]
    }


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


            <div className="w-full">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900">Contact Persons</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Manage contact persons for your business
                        </p>
                    </div>
                    <button
                        onClick={()=>setIsModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Contact
                    </button>
                </div>

                {/* Contact List */}
                <div className="space-y-4">
                    {contact.contacts.map((contact,index) => (
                        <div
                            key={index}
                            className="bg-gray-50 border border-gray-200 rounded-lg p-4"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    {/* Name and Primary Badge */}
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-base font-medium text-gray-900">
                                            {contact.name}
                                        </h3>
                                        {contact.isPrimary && (
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-100 text-orange-600 text-xs font-medium rounded">
                                                <Star className="w-3 h-3 fill-orange-600" />
                                                Primary
                                            </span>
                                        )}
                                    </div>

                                    {/* Role */}
                                    <p className="text-sm text-gray-600 mb-3">{contact.position}</p>

                                    {/* Contact Info */}
                                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-gray-400" />
                                            <span>{contact.email}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Phone className="w-4 h-4 text-gray-400" />
                                            <span>{contact.phone}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center gap-2 ml-4">
                                    <button
                                        onClick={() => onEditContact(contact.id)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        aria-label="Edit contact"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => onDeleteContact(contact.id)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        aria-label="Delete contact"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
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