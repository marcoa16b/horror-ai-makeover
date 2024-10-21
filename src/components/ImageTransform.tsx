import React, { useEffect } from 'react';
import { getCldImageUrl } from 'astro-cloudinary/helpers';
import { generateDescription } from '../utils/gemini';
import { createHorror } from '../utils/appwrite';
import { IconWand, IconArrowRight } from '@tabler/icons-react';
import { imageOptions, type imageOptionProps } from '../utils/options';
import ShinyButton from '../../@/components/ui/shiny-button';
import { RainbowButton } from '../../@/components/ui/rainbow-button';
import { Compare } from '../../@/components/ui/compare';

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

    const [dataToGenerate, setDataToGenerate] = React.useState({
        classicHalloweenThemes: 'none',
        supernaturalCreatures: 'none',
        iconicHorrorCharacters: 'none',
        naturalElements: 'none',
        periodsOrStyles: 'none',
        emotionsAndFeelings: 'none',
        mythologyAndCulture: 'none',
        fantasyAndSciFi: 'none',
    });

    const generateRandomTransformation = async () => {
        setLoading(true);

        const promptRandomGeneration =
            'Generate a short description of Halloween themed makeup that is spooky and scary. The description does not contain any commas.';
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
            // replaceBackground: `Creepy and spooky background related to the person's makeup: ${description}`,
            brightness: '50',
            autoContrast: true,
        });

        console.log('Descripcion generada: ', description);
        console.log('Nueva URL: ', newGeneratedUrl);

        setNewURL(newGeneratedUrl);
        setLoading(false);
    };

    const generateTransformation = async () => {
        console.log('Data to generate: ', dataToGenerate);
        setLoading(true);

        // get the description for all the selected options from the options.ts file and add to a string to create the prompt
        let prompt =
            'Based on the following options, create a description of an amazing makeup: ';
        for (const [key, value] of Object.entries(dataToGenerate)) {
            if (value !== 'none') {
                const option = imageOptions.maquillajes.find(
                    (option) => option.varName === key
                );
                const subOption = option?.opciones.find(
                    (subOption) => subOption.nombre_en === value
                );
                prompt += `${subOption?.descripcion_en} `;
            }
        }

        prompt +=
            ' The makeup should be creepy and scary. Remember that the description should not contain any commas.';

        const description = await generateDescription(prompt);

        const newGeneratedUrl = getCldImageUrl({
            src: id,
            replace: {
                from: 'subject makeup',
                to: description,
                preserveGeometry: true,
            },
            // replaceBackground: `Creepy and spooky background related to the person's makeup: ${description}`,
            brightness: '50',
            autoContrast: true,
        });

        console.log('Descripcion generada: ', description);

        setNewURL(newGeneratedUrl);
        setLoading(false);
    };
    return (
        <div className={`${className} lg:flex lg:gap-5`}>
            <section className="w-full">
                <h1 className="text-xl font-medium mb-5">
                    Descubre el maquillaje perfecto para halloween o genera uno
                    tematico.
                </h1>
                <div className="my-5">
                    <p className="text-sm font-medium mb-3">
                        Presiona el botón para generar un maquillaje
                        espeluznante aleatorio.
                    </p>
                    <ShinyButton onClick={generateRandomTransformation}>
                        <IconWand
                            size={24}
                            className="inline-flex items-center mr-3"
                        />
                        <span>Descubrir maquillaje</span>
                    </ShinyButton>
                </div>

                <div className="my-5">
                    <p className="text-sm font-medium mb-3">
                        Selecciona las opciones que quieras para generar una
                        transformación basada en tus gustos.
                    </p>
                    <p className="text-sm font-medium mb-3">
                        Puedes seleccionar una sola opción, o varias para
                        combinar las ideas en una creación única.
                    </p>
                    {imageOptions.maquillajes.map(
                        (option: imageOptionProps) => (
                            <div key={option.categoria} className="my-2.5">
                                <label>{option.categoria}</label>
                                <select
                                    name={option.varName}
                                    onChange={(e) =>
                                        setDataToGenerate({
                                            ...dataToGenerate,
                                            [option.varName]: e.target.value,
                                        })
                                    }
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer"
                                >
                                    <option value="none" defaultChecked>
                                        Ninguno
                                    </option>
                                    {option.opciones.map((subOption) => (
                                        <option
                                            key={subOption.nombre_en}
                                            value={subOption.nombre_en}
                                        >
                                            {subOption.nombre_es}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )
                    )}
                    <ShinyButton
                        onClick={generateTransformation}
                        className="mt-2.5"
                    >
                        <IconWand
                            size={24}
                            className="inline-flex items-center mr-3"
                        />
                        <span>Generar maquillaje</span>
                    </ShinyButton>
                </div>
            </section>

            <div className="relative w-full max-w-[600px] h-fit mx-auto">
                <Compare
                    firstImage={baseURL}
                    secondImage={newURL}
                    slideMode="drag"
                    className="w-full"
                    firstImageClassName="w-full h-full object-cover rounded-lg"
                    secondImageClassname="w-full h-full object-cover rounded-lg"
                    onLoad={() => console.log('load image successfully')}
                />
                <div
                    className={`
                    absolute top-0 bottom-0 left-0 right-0 bg-white/50 text-black text-xl font-bold backdrop-blur-md rounded-lg z-50
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

                {/* <div>
                    <RainbowButton className="mt-5 flex items-center justify-end duration-300">
                        <span>Compartir con la comunidad</span>
                        <IconArrowRight className="absolute scale-0 opacity-0 group-hover:relative group-hover:opacity-100 group-hover:scale-100 duration-300" />
                    </RainbowButton>
                </div> */}
            </div>
        </div>
    );
}

export default ImageTransform;
