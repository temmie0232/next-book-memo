import React from 'react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import { IoMdAdd } from 'react-icons/io';
import styles from './AddButton.module.css';

interface AddButtonProps {
    theme: 'light' | 'dark';
    onClick: () => void;
}

export const AddButton: React.FC<AddButtonProps> = ({ theme, onClick }) => (
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    onClick={onClick}
                    className={`${styles.addButton} ${theme === 'dark' ? styles.darkTheme : styles.lightTheme}`}
                >
                    <IoMdAdd className={styles.addButtonIcon} />
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>コンテナを追加</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
);