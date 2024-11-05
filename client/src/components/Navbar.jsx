import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { AUTH_TYPES } from '../Constants';
import { useState } from 'react';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Navbar({ navigation }) {
    const navigate = useNavigate();
    const auth = JSON.parse(localStorage.getItem("auth"));
    
    // Estado para manejar la modal de confirmación
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
            <div className="max-w-7xl px-2 sm:px-10 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Botón de menú para móviles */}
                        <DisclosureButton 
                            as="button"
                            className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-between">
                        <div className="flex flex-shrink-0 items-center hidden sm:flex">
                            <img
                                alt="Logo"
                                src='/image/logoblanco.png'
                                className="h-8 w-auto"
                            />
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:items-center w-full justify-between">
                            <div className="flex space-x-4">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        aria-current={item.current ? 'page' : undefined}
                                        className={classNames(
                                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'rounded-md px-3 py-2 text-sm font-medium',
                                        )}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                            {auth && (
                                <button
                                    onClick={handleLogoutConfirmation}
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium ml-auto"
                                >
                                    Cerrar sesión
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {navigation.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            aria-current={item.current ? 'page' : undefined}
                            className={classNames(
                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'block rounded-md px-3 py-2 text-base font-medium',
                            )}
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}
                    {auth && (
                        <button
                            onClick={handleLogoutConfirmation}
                            className="w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium"
                        >
                            Cerrar sesión
                        </button>
                    )}
                </div>
            </DisclosurePanel>

            {/* Modal de Confirmación */}
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
