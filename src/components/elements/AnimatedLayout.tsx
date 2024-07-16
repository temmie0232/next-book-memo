'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/contexts/theme/useTheme';

const AnimatedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const pathname = usePathname();
    const { theme } = useTheme();

    return (
        <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
                backgroundColor: theme === 'dark' ? '#2E2E2E' : '#EBEBEB',
                minHeight: '100vh',
            }}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedLayout;