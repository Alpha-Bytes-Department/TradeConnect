import React, { useState } from 'react';
import { Mail, Pencil, Phone, Plus, Star, Trash2 } from 'lucide-react';
import AddContactModal from './contactsModal';
import EditContactModal from './contactsUpdateModal';
// 👇 Ensure this points to your actual axios instance
import api from '@/app/api';

interface Contact {
    id: string;
    full_name: string;
    email: string;
    phone_number: string;
    role: string;
    custom_role: string | null;
    is_primary: boolean;
}

interface ContactInfo {
    office: {
        phone: string;
        email: string;
        website: string;
    };
    contacts: Contact[];
}

interface ContactsProps {
    data: ContactInfo;
    setData: React.Dispatch<React.SetStateAction<ContactInfo>>;
}

const Contacts: React.FC<ContactsProps> = ({ data, setData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [idToEdit, setIdToEdit] = useState<string>('');

    // --- LOGIC OPTIMIZATIONS ---

    const handleBasicChange = (field: keyof ContactInfo['office'], value: string) => {
        setData((prev) => ({
            ...prev,
            office: { ...prev.office, [field]: value },
        }));
    };

    const roles=[
        { id: 'ceo', title: 'CEO' },
        { id: 'managing_director', title: 'Managing Director' },
        { id: 'operations_manager', title: 'Operations Manager' },
        { id: 'sales_manager', title: 'Sales Manager' },
        { id: 'business_development_manager', title: 'Business Development Manager' },
        { id: 'account_manager', title: 'Account Manager' },
        { id: 'customer_service_manager', title: 'Customer Service Manager' },
        { id: 'general_manager', title: 'General Manager' },
        { id: 'director', title: 'Director' },
        { id: 'partner', title: 'Partner' },
        { id: 'owner', title: 'Owner' },
        { id: 'other', title: 'Other' },
    ];

    // FIXED: Accepts full Contact object now. 
    // The Modal handles the API POST and returns the backend-generated ID.
    // We must use that ID, otherwise 'Delete' will fail due to ID mismatch.
    const handleAddContact = (newEntry: Contact) => {
        setData((prev) => ({
            ...prev,
            // If new is primary, disable primary for others
            contacts: [
                ...(newEntry.is_primary ? prev.contacts.map(c => ({ ...c, is_primary: false })) : prev.contacts),
                newEntry
            ],
        }));
    };

    const handleEditContact = (updatedContact: Contact) => {
        setData((prev) => ({
            ...prev,
            contacts: prev.contacts.map((item) => {
                const isTarget = item.id === updatedContact.id;
                // If the updated contact is set to primary, others must be false
                if (updatedContact.is_primary) {
                    return isTarget ? updatedContact : { ...item, is_primary: false };
                }
                return isTarget ? updatedContact : item;
            }),
        }));
    };

    const onEditContact = (id: string) => {
        setIdToEdit(id);
        setIsEditModalOpen(true);
    };

    // FIXED: API integration for Delete
    const onDeleteContacts = async (id: string) => {
        // Optional: Simple confirm check to prevent accidental deletes
        if (!window.confirm("Are you sure you want to delete this contact?")) return;

        try {
            // 1. Call API
            await api.delete(`business/contact-persons/${id}/`);

            // 2. On success, update UI
            setData((prev) => ({
                ...prev,
                contacts: prev.contacts.filter((con) => con.id !== id),
            }));
        } catch (error) {
            console.error("Failed to delete contact:", error);
            // Optional: Add toast notification here
        }
    };

    return (
        <div className="w-full mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                    <label htmlFor="email" className="text-sm text-gray-700 mb-2">
                        Email Address<span className="text-red-500">*</span>
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={data.office.email}
                        onChange={(e) => handleBasicChange('email', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        placeholder="business@company.com"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="phone" className="text-sm text-gray-700 mb-2">
                        Phone Number<span className="text-red-500">*</span>
                    </label>
                    <input
                        id="phone"
                        type='tel'
                        maxLength={14}
                        value={data.office.phone}
                        onChange={(e) => handleBasicChange('phone', e.target.value.replace(/[^\d+]/g, ''))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        placeholder="+1 555 0123 5248"
                    />
                </div>
            </div>

            <div className="flex flex-col">
                <label htmlFor="website" className="text-sm text-gray-700 mb-2">
                    Website URL<span className="text-red-500">*</span>
                </label>
                <input
                    id="website"
                    type="url"
                    value={data.office.website}
                    onChange={(e) => handleBasicChange('website', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="https://techsolutions.com"
                />
            </div>

            <div className="w-full">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900">Contact Persons</h2>
                        <p className="text-sm text-gray-500 mt-1">Manage contact persons for your business</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Contact
                    </button>
                </div>

                <div className="space-y-4">
                    {data.contacts.map((contact) => (
                        <div key={contact.id} className="bg-gray-50 border border-blue-400 hover:bg-blue-100 rounded-lg p-4">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-base font-medium text-gray-900 mb-2">{contact.full_name}</h3>
                                        {contact.is_primary && (
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-100 text-orange-400 border border-orange-400 rounded-full text-xs font-medium">
                                                <Star className="w-3 h-3 fill-orange-400" />
                                                Primary
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-600 mb-3">{contact.custom_role || ( contact.role ? roles.find((r) => r.id === contact.role).title : 'Select a role' )}</p>
                                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-gray-400" />
                                            <span>{contact.email}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Phone className="w-4 h-4 text-gray-400" />
                                            <span>{contact.phone_number}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 ml-4">
                                    <button onClick={() => onEditContact(contact.id)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => onDeleteContacts(contact.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <AddContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddContact} />
            {isEditModalOpen && idToEdit && (
                <EditContactModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    onSubmit={handleEditContact}
                    contact={data.contacts.find((item) => item.id === idToEdit)!}
                />
            )}
        </div>
    );
};

export default Contacts;