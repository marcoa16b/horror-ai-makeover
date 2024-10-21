import { Client, Account, ID, type Models, AppwriteException } from 'appwrite';

const client = new Client();

client.setProject(import.meta.env.PUBLIC_APPWRITE_PROJECT);

const account = new Account(client);

export const RegisterUser = async (
    email: string,
    password: string,
    name: string
): Promise<Models.User<Models.Preferences> | Error> => {
    try {
        const response = await account.create(
            ID.unique(),
            email,
            password,
            name
        );
        return response;
    } catch (error) {
        throw new Error('Error registering user: ' + error);
    }
};

export const LoginUser = async (
    email: string,
    password: string
): Promise<Models.Session | Error> => {
    try {
        const response = await account.createEmailPasswordSession(
            email,
            password
        );
        return response;
    } catch (error) {
        throw new Error('Error logging in user: ' + error);
    }
};

export const LogOutUser = async (): Promise<void> => {
    try {
        await account.deleteSession('current');
    } catch (error) {
        throw new Error('Error logging out user: ' + error);
    }
};

export const GetCurrentUser = async (): Promise<
    Models.User<Models.Preferences> | undefined
> => {
    let res;

    await account
        .get()
        .then((response) => {
            res = response;
        })
        .catch((error: AppwriteException) => {
            console.log('Error getting current user: ' + error.message);
            return;
            // throw new Error('Error getting current user: ' + error.message);
        });

    return res;
};
