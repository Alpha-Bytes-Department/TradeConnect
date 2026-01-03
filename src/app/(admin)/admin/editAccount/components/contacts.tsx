import React,{useState} from 'react';
import { Data } from '../page';
import AddContactModal from './contactsModal';
import { Mail, Pencil, Phone, Plus, Star, Trash2 } from 'lucide-react';
import { ContactInfo,Contact } from '../../accounts/page';
import EditContactModal from './contactsUpdateModal';

interface ContactsProps {
    data: Contact;
    setData: React.Dispatch<React.SetStateAction<Data>>;
}





const Contacts: React.FC<ContactsProps> = ({ data, setData }) => {
    const handleInputChange = (field: keyof Data['contact'], value: string) => {
        setData((prev) => ({
            ...prev,
            contact: {
                ...prev.contact,
                [field]: value,
            },
        }));
    };


    const sampleContact:ContactInfo   = {
        office: {
            phone: '5656565494555',
            email: 'mmislam272@gmail.com',
            website: '',
        },
        contacts: [
            {
                id: '1',
                name: 'Sample Name',
                position: 'CEO',
                phone: '5656565494555',
                email: 'mmislam272@gmail.com',
                isPrimary: true,
            },
            {
                
                id: '2',
                name: 'Sample Name',
                position: 'CEO',
                phone: '5656565494555',
                email: 'mmislam272@gmail.com',
                isPrimary: false,
            },
            {
                id: '3', 
                name: 'Sample Name',
                position: 'CEO',
                phone: '5656565494555',
                email: 'mmislam272@gmail.com',
                isPrimary: false,
            },
        ]
    }


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [contact, setContact] = useState<ContactInfo>(sampleContact);
    const [idToEdit, setIdToEdit] = useState<string>('');

    const handleAddContact = (data: Omit<Contact, 'id'>) => {
        console.log(data)
        const newContacts: Contact = {
            ...data,
            id: Date.now().toString(),
        };

        let newContact:ContactInfo={...contact}

        newContact.contacts.push(newContacts)

        setContact(newContact);
    };


    const handleEditContact = (data:Contact) => {

        setContact({...contact,contacts:contact.contacts.map((item)=>{
            if(item.id===data.id){
                return data
            }
            else{
                return item
            }
        }
        )})
        
        
    };

    const onEditContact=(id:string)=>{
        
        setIsEditModalOpen(true)
        setIdToEdit(id)
        

    }

    const onDeleteContacts = (id:any) => {
        setContact({...contact,contacts:contact.contacts.filter((con:any)=>con.id!==id)
        })
    }


    console.log(contact)



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
                        value={data.email}
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
                            value={data.phone}
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
                    value={data.email}
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
                            className="bg-gray-50 border border-blue-400 hover:bg-blue-100 rounded-lg p-4"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    {/* Name and Primary Badge */}
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-base font-medium text-gray-900 mb-2">
                                            {contact.name}
                                        </h3>
                                        {contact.isPrimary && (
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-100 text-orange-400 border border-orange-400 rounded-full text-xs font-medium">
                                                <Star className="w-3 h-3 fill-orange-400" />
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
                                        onClick={() => onDeleteContacts(contact.id)}
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

            {isEditModalOpen && idToEdit && (
                <EditContactModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSubmit={handleEditContact}
                contact={contact.contacts.find((item) => item.id === idToEdit)!}
            />)
            }

        </div>
    );
};

export default Contacts;