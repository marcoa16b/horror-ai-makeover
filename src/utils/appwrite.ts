import { Client, Databases, ID } from 'appwrite';

const client = new Client();

client.setProject(import.meta.env.PUBLIC_APPWRITE_PROJECT);

const db = new Databases(client);

const DATABASEID = import.meta.env.PUBLIC_APPWRITE_DATABASE_ID;
const HORRORCOLLECTION = '6709f4e60023d9608da6';
const HORRORGENERATIONCOLLECTION = '6709f7ac00290b7362c6';

/**
 * Horror object
 *
 * @param id Horror ID in the database
 * @param publicId Horror public ID of cloudinary
 */
export interface Horror {
    id: string | null;
    publicId: string;
}

/**
 * Horror generation object
 *
 * @param id Horror generation ID in the database
 * @param description Description of the horror generation
 * @param url URL of the horror generation
 * @param horror Horror object
 */
export interface HorrorGeneration {
    id: string | null;
    description: string;
    url: string;
    horror: Horror;
}

/**
 * Get all horrors
 *
 * @returns List of all horrors
 */
export const getAllHorror = async (): Promise<Horror[]> => {
    const response = await db.listDocuments(DATABASEID, HORRORCOLLECTION);

    const listHorrors = response.documents.map((doc) => ({
        id: doc.$id,
        publicId: doc.publicId,
    }));

    return listHorrors;
};

/**
 * Get a horror by ID
 *
 * @param id Horror ID
 * @returns Horror
 * @throws Error if horror not found
 */
export const getHorror = async (id: string): Promise<Horror> => {
    const response = await db.listDocuments(DATABASEID, HORRORCOLLECTION);
    const doc = response.documents.find((doc) => doc.publicId === id);

    if (!doc) {
        throw new Error('Horror not found');
    }
    return {
        id: doc.$id,
        publicId: doc.publicId,
    };
};

/**
 * Create a horror
 *
 * @param horror object with an original image id
 * @returns Horror
 */
export const createHorror = async (horror: Horror): Promise<Horror> => {
    const response = await db.createDocument(
        DATABASEID,
        HORRORCOLLECTION,
        ID.unique(),
        {
            publicId: horror.publicId,
        }
    );

    return {
        id: response.$id,
        publicId: response.publicId,
    };
};

// TODO: Implement the following function
const deleteHorror = async (id: string): Promise<void> => {
    //await db.deleteDocument(DATABASEID, HORRORCOLLECTION, id);
    throw new Error('Not implemented');
};

export const getAllHorrorGenerations = async (): Promise<
    HorrorGeneration[]
> => {
    const response = await db.listDocuments(
        DATABASEID,
        HORRORGENERATIONCOLLECTION
    );

    const listHorrorGenerations = response.documents.map((doc) => ({
        id: doc.$id,
        description: doc.description,
        url: doc.url,
        horror: {
            id: doc.horror.$id,
            publicId: doc.horror.publicId,
        },
    }));

    return listHorrorGenerations;
};

/**
 * Get a horror generation by ID
 *
 * @param id Horror generation ID
 * @returns Horror generation
 * @throws Error if horror generation not found
 */
export const getHorrorGeneration = async (
    id: string
): Promise<HorrorGeneration> => {
    const allHorrorGenerations = await getAllHorrorGenerations();

    const horrorGeneration = allHorrorGenerations.find(
        (horrorGeneration) => horrorGeneration.id === id
    );

    if (!horrorGeneration) {
        throw new Error('Horror generation not found');
    }

    return horrorGeneration;
};

/**
 * Create a horror generation
 *
 * @param description Description of the makeup generated
 * @param url URL of the final image with the makeup
 * @param originalID ID of the original makeup
 * @returns Horror generation
 */
export const createHorrorGeneration = async (
    description: string,
    url: string,
    originalID: string
): Promise<HorrorGeneration> => {
    const horror = await getHorror(originalID);

    const response = await db.createDocument(
        DATABASEID,
        HORRORGENERATIONCOLLECTION,
        ID.unique(),
        {
            description: description,
            url: url,
            horror: horror.id,
        }
    );

    return {
        id: response.$id,
        description: response.description,
        url: response.url,
        horror: {
            id: response.horror.$id,
            publicId: response.horror.publicId,
        },
    };
};
