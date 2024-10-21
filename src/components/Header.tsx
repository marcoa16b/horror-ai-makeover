import { IconWand } from '@tabler/icons-react';
import React, { useEffect } from 'react';
import {
    GetCurrentUser,
    LoginUser,
    LogOutUser,
    RegisterUser,
} from '../utils/auth';
import type { Models } from 'appwrite';

function Header() {
    const [loadingContent, setLoadingContent] = React.useState<boolean>(true);
    const [showLogin, setShowLogin] = React.useState<boolean>(false);
    const [showRegister, setShowRegister] = React.useState<boolean>(false);

    const [loginData, setLoginData] = React.useState({
        email: '',
        password: '',
    });
    const [registerData, setRegisterData] = React.useState({
        name: '',
        email: '',
        password: '',
    });

    const [user, setUser] =
        React.useState<Models.User<Models.Preferences> | null>(null);

    const [userOptions, setUserOptions] = React.useState<boolean>(false);

    // Obtener el usuario actual
    const verifyUser = async () => {
        try {
            const user = await GetCurrentUser();

            if (!user) {
                console.log('No hay usuario');
            } else {
                console.log('Usuario actual', user);
                setUser(user);
            }
        } catch (error) {
            console.log(error);
        }
        setLoadingContent(false);
    };

    const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Registrando usuario');
        console.log(registerData);
        // Verificar contraseña segura
        const password = registerData.password;
        const pswMsg = document.getElementById('register-psw-msg');
        if (password.length < 8) {
            pswMsg!.innerText =
                'La contraseña debe tener al menos 8 caracteres';
            return;
        }
        if (!/[a-z]/.test(password)) {
            pswMsg!.innerText =
                'La contraseña debe tener al menos una letra minúscula';
            return;
        }
        if (!/[A-Z]/.test(password)) {
            pswMsg!.innerText =
                'La contraseña debe tener al menos una letra mayúscula';
            return;
        }
        if (!/[0-9]/.test(password)) {
            pswMsg!.innerText = 'La contraseña debe tener al menos un número';
            return;
        }
        if (!/[!@#$%^&*]/.test(password)) {
            pswMsg!.innerText =
                'La contraseña debe tener al menos un caracter especial';
            return;
        }
        pswMsg!.innerText = '';

        // Registrar usuario
        RegisterUser(
            registerData.email,
            registerData.password,
            registerData.name
        )
            .then((response) => {
                console.log('Usuario registrado', response);
                alert('¡Usuario registrado con éxito!');
                setShowRegister(false);
            })
            .catch((error) => {
                console.error('Error al registrar usuario', error);
                alert('Error al registrar el usuario, intente de nuevo');
            });
    };

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Iniciando sesión');

        // Iniciar sesión
        LoginUser(loginData.email, loginData.password)
            .then((response) => {
                console.log('Sesión iniciada', response);
                alert('¡Sesión iniciada con éxito!');
                setShowLogin(false);
                verifyUser();
            })
            .catch((error) => {
                console.error('Error al iniciar sesión', error);
                alert('Error al iniciar sesión, intente de nuevo');
            });
    };

    const HandleLogOut = () => {
        console.log('Cerrando sesión');
        // Cerrar sesión
        LogOutUser()
            .then(() => {
                console.log('Sesión cerrada');
                alert('¡Sesión cerrada con éxito!');
                setUser(null);
            })
            .catch((error) => {
                console.error('Error al cerrar sesión', error);
                alert('Error al cerrar sesión, intente de nuevo');
            });
    };

    useEffect(() => {
        verifyUser();
    }, []);
    return (
        <div
            className={`flex flex-col sm:flex-row items-center gap-3 justify-between w-full px-5 sm:px-10 md:px-14 py-5 z-50 ${
                user ? 'relative' : ''
            }`}
        >
            <p className="creepster text-3xl text-nowrap">Horror Makeover 👻</p>

            <div className="">
                <div
                    className={`items-center gap-2 ${
                        user === null ? 'flex' : 'hidden'
                    }`}
                >
                    <button
                        onClick={() => setShowRegister(!showRegister)}
                        disabled={loadingContent}
                        className="text-white flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 font-medium rounded-lg text-sm px-3 sm:px-5 py-1.5 sm:py-2.5 text-center me-2 mb-2"
                    >
                        Registro
                    </button>
                    <button
                        onClick={() => setShowLogin(!showLogin)}
                        disabled={loadingContent}
                        className="text-white flex items-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 font-medium rounded-lg text-sm px-3 sm:px-5 py-1.5 sm:py-2.5 text-center me-2 mb-2"
                    >
                        Iniciar sesión
                    </button>
                </div>

                <div
                    className={`relative ${user === null ? 'hidden' : 'flex'}`}
                >
                    <div
                        onClick={() => setUserOptions(!userOptions)}
                        className="text-xl w-10 h-10 cursor-pointer flex items-center justify-center rounded-full bg-slate-950"
                    >
                        <p>{user?.name.charAt(0)}</p>
                    </div>
                    <div
                        className={`absolute w-auto top-10 right-0 transition-opacity duration-300 bg-slate-800 backdrop-blur-lg flex flex-col gap-2 items-center justify-center rounded-lg p-3 ${
                            userOptions
                                ? 'opacity-100'
                                : 'opacity-0 pointer-events-none'
                        }`}
                    >
                        <p className="text-nowrap text-xl font-medium">
                            {user?.name}
                        </p>
                        <div className="w-full h-0.5 bg-slate-950/50"></div>
                        <div onClick={() => setUserOptions(!userOptions)}>
                            <button onClick={HandleLogOut}>
                                Cerrar sesión
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={`
                absolute top-0 bottom-0 left-0 right-0 transition-opacity duration-300 bg-white/30 backdrop-blur-lg flex items-center justify-center
                ${
                    showLogin
                        ? 'opacity-100 z-50'
                        : 'opacity-0 pointer-events-none -z-50'
                }    
            `}
            >
                <div className="bg-[#13151a] w-[90%] sm:w-[70%] md:w-[40%] px-5 py-8 rounded-lg z-10">
                    <p className="text-2xl mb-3 font-bold">Iniciar sesión</p>
                    <form onSubmit={handleLogin}>
                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-white">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                onChange={(e) => {
                                    setLoginData({
                                        ...loginData,
                                        email: e.target.value,
                                    });
                                }}
                                value={loginData.email}
                                className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                placeholder="name@mail.com"
                                required
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-white">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => {
                                    setLoginData({
                                        ...loginData,
                                        password: e.target.value,
                                    });
                                }}
                                value={loginData.password}
                                placeholder="********"
                                className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                        >
                            Iniciar sesión
                        </button>
                    </form>
                </div>
                <div
                    className="absolute top-0 left-0 right-0 bottom-0 hover:cursor-pointer z-0"
                    onClick={() => setShowLogin(!showLogin)}
                ></div>
            </div>
            <div
                className={`
                absolute top-0 bottom-0 left-0 right-0 transition-opacity duration-300 bg-white/30 backdrop-blur-lg flex items-center justify-center
                ${
                    showRegister
                        ? 'opacity-100 z-50'
                        : 'opacity-0 pointer-events-none -z-50'
                }    
            `}
            >
                <div className="bg-[#13151a] w-[90%] sm:w-[70%] md:w-[40%] px-5 py-8 rounded-lg z-10">
                    <p className="text-2xl mb-3 font-bold">Registro</p>
                    <form onSubmit={handleRegister}>
                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-white">
                                Nombre
                            </label>
                            <input
                                type="text"
                                id="name"
                                onChange={(e) => {
                                    setRegisterData({
                                        ...registerData,
                                        name: e.target.value,
                                    });
                                }}
                                value={registerData.name}
                                className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                placeholder="John Doe"
                                required
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-white">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                onChange={(e) => {
                                    setRegisterData({
                                        ...registerData,
                                        email: e.target.value,
                                    });
                                }}
                                value={registerData.email}
                                className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                placeholder="name@mail.com"
                                required
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-white">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => {
                                    setRegisterData({
                                        ...registerData,
                                        password: e.target.value,
                                    });
                                }}
                                value={registerData.password}
                                placeholder="********"
                                className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                            <span id="register-psw-msg"></span>
                        </div>
                        <button
                            type="submit"
                            className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                        >
                            Registrarme
                        </button>
                    </form>
                </div>
                <div
                    className="absolute top-0 left-0 right-0 bottom-0 hover:cursor-pointer z-0"
                    onClick={() => setShowRegister(!showRegister)}
                ></div>
            </div>
        </div>
    );
}

export default Header;
