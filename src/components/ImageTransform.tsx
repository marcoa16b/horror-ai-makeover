import React, { useEffect } from 'react';
import { getCldImageUrl } from 'astro-cloudinary/helpers';
import { generateDescription } from '../utils/gemini';
import { createHorrorGeneration } from '../utils/appwrite';
import { IconWand } from '@tabler/icons-react';

import './utilStyles.css';

function ImageTransform({
    id,
    url,
    className,
}: {
    id: string;
    url: string;
    className?: string;
}) {
    const [baseURL, setBaseURL] = React.useState<string>(url);
    const [newURL, setNewURL] = React.useState<string>(url);
    const [loading, setLoading] = React.useState<boolean>(false);

    const promptRandomGeneration =
        'Generate a short description of Halloween themed makeup that is spooky and scary. The description does not contain any commas.';

    const generateRandomTransformation = async () => {
        setLoading(true);
        const description = await generateDescription(promptRandomGeneration);

        // Eliminar las comas de la descripción
        const newPrompt = description.replace(/,/g, '');

        const newGeneratedUrl = getCldImageUrl({
            src: id,
            replace: {
                from: 'subject makeup',
                to: newPrompt,
                preserveGeometry: true,
            },
            replaceBackground: `Creepy and spooky background related to the person's makeup: ${description}`,
            brightness: '50',
            autoContrast: true,
        });

        console.log('Descripcion generada: ', description);
        console.log('Nueva URL: ', newGeneratedUrl);

        setNewURL(newGeneratedUrl);
        setLoading(false);
    };

    useEffect(() => {
        // Cargar el componente two-up
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/two-up-element@1';
        script.async = true;
        document.body.appendChild(script);

        // Limpiar el script cuando se desmonte el componente
        return () => {
            document.body.removeChild(script);
        };
    }, []);
    return (
        <div className={`${className} lg:flex`}>
            <section className="w-full">
                <h1 className="text-xl font-medium mb-5">
                    Descubre el maquillaje perfecto para halloween o genera uno
                    tematico.
                </h1>
                <div>
                    <p className="text-sm font-medium mb-3">
                        Presiona el botón para generar un maquillaje
                        espeluznante aleatorio.
                    </p>
                    <button
                        onClick={generateRandomTransformation}
                        className="text-white flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                        <IconWand size={24} />
                        Descubrir maquillaje
                    </button>
                </div>
            </section>

            <div className="w-full relative max-w-[600px] mx-auto">
                <two-up>
                    <img
                        src={baseURL}
                        alt=""
                        className="w-full h-full object-cover rounded-lg"
                    />
                    <img
                        src={newURL}
                        alt=""
                        className="w-full h-full object-cover rounded-lg"
                    />
                </two-up>
                {/* Loading blur effect */}
                <div
                    className={`
                    absolute top-0 bottom-0 left-0 right-0 bg-white/50 text-black text-xl font-bold backdrop-blur-md rounded-lg
                    ${loading ? 'flex items-center justify-center' : 'hidden'}
                `}
                >
                    <p>Cargando efecto</p>
                    <div
                        id="loading"
                        className="flex items-center justify-center"
                    >
                        {/* <p id="loading" className="text-gray-400 mt-2">Loading...</p> */}
                        <div className="lds-facebook">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImageTransform;
