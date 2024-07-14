import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, MoreVertical } from 'lucide-react';
import { useTheme } from '@/contexts/theme/useTheme';
import styles from './CustomContainerItem.module.css';
import { CustomContainer } from '@/types/customContainer';

interface CustomContainerItemProps {
    container: CustomContainer;
    onEdit: (container: CustomContainer) => void;
    onDelete: (id: string) => void;
}

export const CustomContainerItem: React.FC<CustomContainerItemProps> = ({ container, onEdit, onDelete }) => {
    const { theme } = useTheme();

    return (
        <div className={styles.containerItem}>
            <div className={styles.containerContent}>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem
                        value={container.id}
                        className={`${styles.accordionItem} ${theme === 'dark' ? 'bg-[#333333]' : ''}`}
                    >
                        <AccordionTrigger
                            className={`${styles.accordionTrigger} ${theme === 'dark'
                                ? 'hover:bg-[#3E3E3E] transition-colors duration-200'
                                : 'hover:bg-gray-100'
                                }`}
                        >
                            {container.title}
                        </AccordionTrigger>
                        <AccordionContent className={styles.accordionContent}>
                            <div className="whitespace-pre-wrap">{container.content}</div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            <div className={styles.containerActions}>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className={`h-8 w-8 p-0 bg-transparent hover:bg-transparent focus:bg-transparent ${theme === 'dark' ? 'text-white hover:text-white' : 'text-black hover:text-black'
                                }`}
                        >
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(container)}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>編集</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDelete(container.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>削除</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};
