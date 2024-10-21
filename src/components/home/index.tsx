import React from 'react';
import { AuroraBackground } from '../../../@/components/ui/aurora-background';
import { HoverBorderGradient } from '../../../@/components/ui/hover-border-gradient';
import { motion } from 'framer-motion';

function Home() {
    const handleToggle = () => {
        document.documentElement.classList.toggle('dark');
    };
    return (
        <div className="relative w-full h-[100dvh] bg-white dark:bg-black text-black dark:text-white">
            {/* <button onClick={handleToggle}>toggle</button> */}
            <div className="absolute top-0 left-0 right-0 z-50 px-10 py-5">
                <div className="w-full flex flex-wrap items-center justify-between">
                    <span className="creepster text-base sm:text-3xl text-nowrap">
                        Horror Makeover 👻
                    </span>
                    <HoverBorderGradient
                        containerClassName="rounded-full"
                        as="button"
                        onClick={handleToggle}
                        className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
                    >
                        <span className="md:text-xl">Theme</span>
                    </HoverBorderGradient>
                </div>
            </div>
            <AuroraBackground className="w-full h-full flex flex-col items-center justify-center">
                <motion.div
                    initial={{ opacity: 0.0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: 'easeInOut',
                    }}
                    className="relative flex flex-col gap-4 items-center justify-center px-5 sm:px-10 md:px-14"
                >
                    <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
                        Crea transformaciones espeluznantes a tus selfies.
                    </div>
                    <div className="font-extralight text-base sm:text-lg md:text-2xl dark:text-neutral-200 text-center py-4">
                        Transforma tu fotografía y crea ideas para tu próximo
                        disfraz.
                    </div>
                    <HoverBorderGradient
                        containerClassName="rounded-full"
                        as="button"
                        className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
                    >
                        <span className="md:text-xl">Subir imagen</span>
                    </HoverBorderGradient>
                    {/* <UploadWidget /> */}
                </motion.div>
            </AuroraBackground>
        </div>
    );
}

export default Home;
