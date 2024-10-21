export interface imageOptionProps {
    categoria: string;
    varName: string;
    opciones: {
        nombre_es: string;
        nombre_en: string;
        descripcion_en: string;
    }[];
}

export const imageOptions = {
    maquillajes: [
        {
            categoria: 'Temáticas Clásicas de Halloween',
            varName: 'classicHalloweenThemes',
            opciones: [
                {
                    nombre_es: 'Vampiro',
                    nombre_en: 'Vampire',
                    descripcion_en:
                        'Sharp fangs, pale skin, dark eyes, and a touch of blood around the mouth.',
                },
                {
                    nombre_es: 'Fantasma',
                    nombre_en: 'Ghost',
                    descripcion_en:
                        'White, translucent skin, hollow dark eyes, and an ethereal floating appearance.',
                },
                {
                    nombre_es: 'Zombie',
                    nombre_en: 'Zombie',
                    descripcion_en:
                        'Torn skin, bloody eyes, scars, and rotting patches of flesh.',
                },
                {
                    nombre_es: 'Bruja',
                    nombre_en: 'Witch',
                    descripcion_en:
                        'Warts, green or grayish skin, a hooked nose, and spell marks on the face.',
                },
                {
                    nombre_es: 'Hombre Lobo',
                    nombre_en: 'Werewolf',
                    descripcion_en:
                        'Glowing eyes, claw marks on the face, and a grayish skin tone with shadows.',
                },
                {
                    nombre_es: 'Payaso Diabólico',
                    nombre_en: 'Evil Clown',
                    descripcion_en:
                        'Exaggerated lips, smeared makeup, and a creepy smile.',
                },
                {
                    nombre_es: 'Momia',
                    nombre_en: 'Mummy',
                    descripcion_en:
                        'Worn-out bandages, dry skin, and sunken eyes.',
                },
                {
                    nombre_es: 'Catrina',
                    nombre_en: 'Catrina (Mexican Skull)',
                    descripcion_en:
                        'Colorful floral designs combined with the traditional white skull look.',
                },
            ],
        },
        {
            categoria: 'Criaturas Sobrenaturales',
            varName: 'supernaturalCreatures',
            opciones: [
                {
                    nombre_es: 'Demonio',
                    nombre_en: 'Demon',
                    descripcion_en:
                        'Red skin, prominent horns, black or glowing eyes, and dark veins.',
                },
                {
                    nombre_es: 'Esqueleto Viviente',
                    nombre_en: 'Living Skeleton',
                    descripcion_en:
                        'Face painted like bones, deep shadows around the eyes, and a visible jaw.',
                },
                {
                    nombre_es: 'Sirena Oscura',
                    nombre_en: 'Dark Mermaid',
                    descripcion_en:
                        'Scales on the face, blue or green lips, glassy eyes, and seaweed in the hair.',
                },
                {
                    nombre_es: 'Hada Oscura',
                    nombre_en: 'Dark Fairy',
                    descripcion_en:
                        'Ghostly wings, metallic skin shimmer, and dark fairy dust.',
                },
                {
                    nombre_es: 'Vampiro Gótico',
                    nombre_en: 'Gothic Vampire',
                    descripcion_en:
                        'Extremely pale skin, dark lips, and deep shadows around the eyes.',
                },
                {
                    nombre_es: 'Monstruo del Pantano',
                    nombre_en: 'Swamp Monster',
                    descripcion_en:
                        'Muddy, slimy skin, yellowish eyes, and vegetation marks on the face.',
                },
            ],
        },
        {
            categoria: 'Personajes Icónicos de Terror',
            varName: 'iconicHorrorCharacters',
            opciones: [
                {
                    nombre_es: 'Frankenstein',
                    nombre_en: 'Frankenstein',
                    descripcion_en:
                        'Large scars, bolts in the neck, greenish skin, and a decayed appearance.',
                },
                {
                    nombre_es: 'Carrie',
                    nombre_en: 'Carrie',
                    descripcion_en:
                        'Blood pouring from the forehead, pale skin, and crazed eyes.',
                },
                {
                    nombre_es: 'Jason Voorhees',
                    nombre_en: 'Jason Voorhees (Friday the 13th)',
                    descripcion_en:
                        'Broken mask, scars on the visible skin, and dark eyes.',
                },
                {
                    nombre_es: 'Freddy Krueger',
                    nombre_en: 'Freddy Krueger',
                    descripcion_en:
                        'Burned skin, dark shadows around the eyes, and deep scars.',
                },
                {
                    nombre_es: 'Novia de Frankenstein',
                    nombre_en: "Frankenstein's Bride",
                    descripcion_en:
                        'White streaks in the hair, pale skin, dark lips, and scars.',
                },
            ],
        },
        {
            categoria: 'Elementos Naturales',
            varName: 'naturalElements',
            opciones: [
                {
                    nombre_es: 'Tormenta',
                    nombre_en: 'Storm',
                    descripcion_en:
                        'Lightning painted across the face, light effects in the eyes, and gray shadows.',
                },
                {
                    nombre_es: 'Fuego',
                    nombre_en: 'Fire',
                    descripcion_en:
                        'Flame effects on the skin, reds, oranges, and black shadows.',
                },
                {
                    nombre_es: 'Hielo',
                    nombre_en: 'Ice',
                    descripcion_en:
                        'Blue or white skin, frost effects, and icy crystals around the eyes.',
                },
                {
                    nombre_es: 'Bosque Encantado',
                    nombre_en: 'Enchanted Forest',
                    descripcion_en:
                        'Entwined leaves, green shadows, and dark eyes with a forest-like appearance.',
                },
                {
                    nombre_es: 'Tierra Desgarrada',
                    nombre_en: 'Torn Earth',
                    descripcion_en:
                        'Cracked scars on the skin, dust effects, and brown shadows.',
                },
            ],
        },
        {
            categoria: 'Épocas o Estilos',
            varName: 'periodsOrStyles',
            opciones: [
                {
                    nombre_es: 'Retro (Años 80)',
                    nombre_en: 'Retro (1980s)',
                    descripcion_en:
                        'Fluorescent colors, exaggerated shadows, and a look inspired by old horror movies.',
                },
                {
                    nombre_es: 'Victoriano',
                    nombre_en: 'Victorian',
                    descripcion_en:
                        'Pale skin, dark lips, deep eye circles, and elegant makeup with spooky touches.',
                },
                {
                    nombre_es: 'Futurista',
                    nombre_en: 'Futuristic',
                    descripcion_en:
                        'Metallic skin, painted circuits, and glowing effects around the eyes.',
                },
            ],
        },
        {
            categoria: 'Emociones y Sensaciones',
            varName: 'emotionsAndFeelings',
            opciones: [
                {
                    nombre_es: 'Tristeza',
                    nombre_en: 'Sadness',
                    descripcion_en:
                        'Smeared makeup, black or blood-like tears, and dull eyes.',
                },
                {
                    nombre_es: 'Furia',
                    nombre_en: 'Rage',
                    descripcion_en:
                        'Red eyes, deep scars, glowing veins, and shadowed expressions.',
                },
                {
                    nombre_es: 'Desesperación',
                    nombre_en: 'Despair',
                    descripcion_en:
                        'Pale, discolored skin, sunken eyes, and a distressed expression with blood marks.',
                },
            ],
        },
        {
            categoria: 'Mitología y Cultura',
            varName: 'mythologyAndCulture',
            opciones: [
                {
                    nombre_es: 'Dios Egipcio (Anubis)',
                    nombre_en: 'Egyptian God (Anubis)',
                    descripcion_en:
                        'Golden details, dark skin, glowing eyes, and hieroglyphic patterns.',
                },
                {
                    nombre_es: 'Vikingo Fantasmal',
                    nombre_en: 'Ghostly Viking',
                    descripcion_en:
                        'Battle marks on the face, pale skin, and warrior-like dark eyes.',
                },
                {
                    nombre_es: 'Samurái Oscuro',
                    nombre_en: 'Dark Samurai',
                    descripcion_en:
                        'Traditional mask, armor details, and deep shadows around the eyes.',
                },
                {
                    nombre_es: 'Banshee',
                    nombre_en: 'Irish Fairy (Banshee)',
                    descripcion_en:
                        'Pale skin, dark eyes, and blue lips with a ghostly aura.',
                },
            ],
        },
        {
            categoria: 'Fantasía y Ciencia Ficción',
            varName: 'fantasyAndSciFi',
            opciones: [
                {
                    nombre_es: 'Alienígena',
                    nombre_en: 'Alien',
                    descripcion_en:
                        'Green or gray skin, large eyes, and alien scars with glowing accents.',
                },
                {
                    nombre_es: 'Cyborg',
                    nombre_en: 'Cyborg',
                    descripcion_en:
                        'Metallic circuits, robotic eye, and mechanical parts replacing parts of the face.',
                },
                {
                    nombre_es: 'Criatura Mutante',
                    nombre_en: 'Mutant Creature',
                    descripcion_en:
                        'Uneven eyes, cracked and deformed skin, and disfigured parts of the face.',
                },
            ],
        },
    ],
};
