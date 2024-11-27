import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useNavigate, Link } from 'react-router-dom';
import { AUTH_TYPES } from '../Constants';
import { useState } from 'react';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Navbar({ navigation, logo}) {
    const navigate = useNavigate();
    const auth = JSON.parse(localStorage.getItem("auth"));
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLogout = () => {
        localStorage.setItem("auth", AUTH_TYPES.FALSE);
        navigate('/login');
    };

    const handleLogoutConfirmation = () => {
        setIsModalOpen(true);
    };

    const confirmLogout = () => {
        handleLogout();
        setIsModalOpen(false);
    };

    const cancelLogout = () => {
        setIsModalOpen(false);
    };

    return (
        <Disclosure as="nav" className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    {/* Mobile menu button */}
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <DisclosureButton 
                            as="button"
                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                        </DisclosureButton>
                    </div>

                    {/* Desktop Navigation Container */}
                    <div className="flex flex-1 items-center">
                        {/* Logo */}
                        <div className="flex-shrink-0 mr-6">
                            <img
                                alt="Logo"
                                src="public/image/logoblanco.png"
                                className="h-8 w-auto hidden sm:block"
                            />
                        </div>

                        {/* Navigation Links - Aligned Left */}
                        <div className="hidden sm:flex space-x-4">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={classNames(
                                        item.current 
                                            ? 'bg-gray-900 text-white' 
                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'rounded-md px-3 py-2 text-sm font-medium',
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>

                        {/* Logout Button - Aligned Right */}
                        {auth && (
                            <button
                                onClick={handleLogoutConfirmation}
                                className="hidden sm:flex ml-auto items-center bg-red-600 hover:bg-red-700 text-white rounded-md px-3 py-2 text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                            >
                                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                                Cerrar sesión
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Menu Panel */}
            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {navigation.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as={Link}
                            to={item.href}
                            className={classNames(
                                item.current 
                                    ? 'bg-gray-900 text-white' 
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'block rounded-md px-3 py-2 text-base font-medium',
                            )}
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}
                    {auth && (
                        <button
                            onClick={handleLogoutConfirmation}
                            className="w-full text-left flex items-center text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium"
                        >
                            <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                            Cerrar sesión
                        </button>
                    )}
                </div>
            </DisclosurePanel>

            {/* Logout Confirmation Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                        <h2 className="text-lg font-bold mb-4">Confirmar Cierre de Sesión</h2>
                        <p className="mb-4">¿Estás seguro de que deseas cerrar sesión?</p>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={cancelLogout}
                                className="bg-gray-300 hover:bg-gray-400 text-black rounded-md px-4 py-2"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmLogout}
                                className="bg-red-600 hover:bg-red-700 text-white rounded-md px-4 py-2"
                            >
                                Cerrar sesión
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Disclosure>
    );
}