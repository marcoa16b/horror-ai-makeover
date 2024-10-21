import { defineCollection } from 'astro:content';
import { cldAssetsLoader } from 'astro-cloudinary/loaders';

const images = defineCollection({
    loader: cldAssetsLoader({
        limit: 10,
        folder: 'hackathon',
        deliveryType: 'upload',
    }),
});

export const collections = { images };
