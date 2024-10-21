import React, { useState, useEffect, useRef } from 'react';
import { GetCurrentUser, LogOutUser } from '../../utils/auth';
import type { Models } from 'appwrite';
import { HoverBorderGradient } from '../../../@/components/ui/hover-border-gradient';
import { Meteors } from '../../../@/components/ui/meteors';
import { AnimatePresence, motion } from 'framer-motion';
import Toast from '../Toast';
import { IconSun, IconMoon, IconX } from '@tabler/icons-react';

function LoginModal() {
    const [showModal, setShowModal] = useState(true);
    const [modalLogin, setModalLogin] = useState(true);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
        null
    );
    const [userOptions, setUserOptions] = React.useState<boolean>(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

    const [toasts, setToasts] = useState<
        Array<{
            id: number;
            message: string;
            type?: 'success' | 'error' | 'info' | undefined;
        }>
    >([]);

    const addToast = (
        message: string,
        type?: 'success' | 'error' | 'info' | undefined
    ) => {
        const id = Date.now(); // Usamos `Date.now()` como un identificador único
        setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
    };

    const removeToast = (id: number) => {
        setToasts((prevToasts) =>
            prevToasts.filter((toast) => toast.id !== id)
        );
    };

    // Obtener el usuario actual
    // const verifyUser = async () => {
    //     try {
    //         const user = await GetCurrentUser();

    //         if (!user) {
    //             console.log('No hay usuario');
    //         } else {
    //             console.log('Usuario actual', user);
    //             setUser(user);
    //         }
    //     } catch (error) {
    //         // console.log(error);
    //     }
    //     setLoading(false);
    // };

    // const HandleLogOut = () => {
    //     console.log('Cerrando sesión');
    //     // Cerrar sesión
    //     LogOutUser()
    //         .then(() => {
    //             console.log('Sesión cerrada');
    //             // alert('¡Sesión cerrada con éxito!');
    //             addToast('¡Sesión cerrada con éxito!', 'success');
    //             setUser(null);
    //         })
    //         .catch((error) => {
    //             console.error('Error al cerrar sesión', error);
    //             addToast('Error al cerrar sesión', 'error');
    //         });
    // };

    useEffect(() => {
        // verifyUser();
        const themeStored = localStorage.getItem('theme');
        setTheme(themeStored === 'dark' ? 'dark' : 'light');
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.documentElement.classList.toggle('dark');
    };

    const modalRef = useRef(null);
    useOutsideClick(modalRef, () => setShowModal(false));

    return (
        <div>
            <div className="absolute top-0 left-0 right-0 z-50 px-5 sm:px-10 md:px-14 py-5">
                <motion.div
                    initial={{ opacity: 0.0, y: -40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: 'easeInOut',
                    }}
                    className="w-full flex flex-wrap items-center justify-between"
                >
                    <span className="creepster text-base sm:text-3xl text-nowrap">
                        Horror Makeover 👻
                    </span>
                    <div className="flex items-center gap-2">
                        <HoverBorderGradient
                            containerClassName="rounded-full"
                            as="button"
                            onClick={toggleTheme}
                            className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
                        >
                            <span className="md:text-xl">
                                {theme === 'dark' ? <IconSun /> : <IconMoon />}
                            </span>
                        </HoverBorderGradient>
                        {/* {user ? (
                            <div>
                                <HoverBorderGradient
                                    containerClassName="rounded-full"
                                    as="button"
                                    onClick={() => setUserOptions(!userOptions)}
                                    className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
                                >
                                    <span className="md:text-xl">
                                        {user ? user.name.charAt(0) : '...'}
                                    </span>
                                </HoverBorderGradient>
                                <div
                                    className={`absolute w-auto top-20 right-10 transition-opacity duration-300 bg-black border border-gray-700 backdrop-blur-lg flex flex-col gap-2 items-center justify-center rounded-lg p-3 ${
                                        userOptions
                                            ? 'opacity-100'
                                            : 'opacity-0 pointer-events-none'
                                    }`}
                                >
                                    <p className="text-nowrap text-xl font-medium">
                                        {user?.name}
                                    </p>
                                    <div className="w-full h-0.5 bg-gray-600/50"></div>
                                    <div
                                        onClick={() =>
                                            setUserOptions(!userOptions)
                                        }
                                    >
                                        <button
                                            onClick={HandleLogOut}
                                            className="px-4 py-1 rounded-md border border-gray-700 hover:border-gray-500 duration-300"
                                        >
                                            Cerrar sesión
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <HoverBorderGradient
                                containerClassName="rounded-full"
                                as="button"
                                aria-disabled={loading}
                                onClick={() => setShowModal(true)}
                                className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
                            >
                                <span className="md:text-xl">
                                    Iniciar sesion
                                </span>
                            </HoverBorderGradient>
                        )} */}
                    </div>
                </motion.div>
            </div>

            {/* <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                            backdropFilter: 'blur(10px)',
                        }}
                        exit={{
                            opacity: 0,
                            backdropFilter: 'blur(0px)',
                        }}
                        className="fixed [perspective:800px] [transform-style:preserve-3d] inset-0 h-full w-full  flex items-center justify-center z-50"
                    >
                        <motion.div
                            ref={modalRef}
                            className={`
                                min-h-[50%] max-h-[90%] max-w-[90%] sm:max-w-[70%] md:max-w-[40%] bg-white dark:bg-neutral-950 border border-transparent dark:border-neutral-800 rounded-lg md:rounded-2xl relative z-50 flex flex-col flex-1 overflow-hidden
                            `}
                            initial={{
                                opacity: 0,
                                scale: 0.5,
                                rotateX: 40,
                                y: 40,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                rotateX: 0,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.8,
                                rotateX: 10,
                            }}
                            transition={{
                                type: 'spring',
                                stiffness: 260,
                                damping: 15,
                            }}
                        >
                            <div className="flex items-end justify-end p-2">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className=""
                                >
                                    <IconX />
                                </button>
                            </div>
                            <div className="p-2">
                                <div className="relative w-fit mx-auto flex items-center justify-center">
                                    <button
                                        onClick={() => setModalLogin(true)}
                                        className="w-[100px] py-1"
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => setModalLogin(false)}
                                        className="w-[100px] py-1"
                                    >
                                        register
                                    </button>
                                    <div
                                        className={`
                                        absolute top-0 bottom-0 left-0 w-[100px] h-full border border-cyan-700 dark:border-cyan-300 rounded-lg duration-300
                                        ${
                                            modalLogin
                                                ? 'translate-x-0'
                                                : 'translate-x-[100px]'
                                        }    
                                    `}
                                    ></div>
                                </div>

                                <div className="relative">
                                    <div>
                                        <form>
                                            <div>
                                                <label className="text-sm">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    className="w-full bg-slate-200 dark:bg-stone-800 border border-cyan-300 rounded-lg md:text-lg px-2 py-1"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-sm">
                                                    Contraseña
                                                </label>
                                                <input
                                                    type="password"
                                                    className="w-full bg-slate-200 dark:bg-stone-800 border border-cyan-300 rounded-lg md:text-lg px-2 py-1"
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                className="w-full bg-cyan-700 dark:bg-cyan-400 text-white dark:text-black rounded-lg py-1 mt-2"
                                            >
                                                Iniciar sesión
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence> */}

            <div className="absolute bottom-5 right-5 z-50 overflow-hidden">
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <Toast
                            key={toast.id}
                            message={toast.message}
                            type={toast.type}
                            onClose={() => removeToast(toast.id)}
                        />
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}

export const useOutsideClick = (
    ref: React.RefObject<HTMLDivElement>,
    callback: Function
) => {
    useEffect(() => {
        const listener = (event: any) => {
            // DO NOTHING if the element being clicked is the target element or their children
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            callback(event);
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, callback]);
};

export default LoginModal;
