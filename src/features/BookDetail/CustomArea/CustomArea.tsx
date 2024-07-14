import React from 'react';
import styles from './CustomArea.module.css';
import { Separator } from "@/components/ui/separator";
import { useTheme } from '@/contexts/theme/useTheme';
import { CustomTabSelector } from '../CustomTabSelector/CustomTabSelector';
import { CustomSearchBar } from '../CustomSearchBar/CustomSearchBar';
import { EditCustomContainerDialog } from '../EditCustomContainerDialog/EditCustomContainerDialog';
import { CustomContainerItem } from '../CustomContainerItem/CustomContainerItem';
import { AddCustomContainerDialog } from '../AddCustomContainerDialog/AddCustomContainerDialog';
import { AddButton } from '../AddButton/AddButton';
import { useCustomArea } from '@/hooks/useCustomArea';

export const CustomArea: React.FC = () => {
    const { theme } = useTheme();
    const {
        containers,
        activeTab,
        setActiveTab,
        searchTerm,
        titleOnly,
        isAddDialogOpen,
        setIsAddDialogOpen,
        isEditDialogOpen,
        setIsEditDialogOpen,
        containerToEdit,
        handleAddContainer,
        handleEditContainer,
        openEditDialog,
        deleteContainer,
        handleSearch,
        handleToggle
    } = useCustomArea();

    return (
        <div className={styles.customArea}>
            <CustomTabSelector
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />
            <Separator className={`my-4 w-full ${theme === 'dark' ? 'bg-[#858383]' : 'bg-[#EBEBEB]'}`} />
            <CustomSearchBar
                searchTerm={searchTerm}
                titleOnly={titleOnly}
                onSearch={handleSearch}
                onToggle={handleToggle}
            />
            <Separator className={`mt-5 w-10/12 ${theme === 'dark' ? 'bg-[#858383]' : 'bg-[#EBEBEB]'}`} />
            <div className={styles.mainContent}>
                {containers.map((container) => (
                    <CustomContainerItem
                        key={container.id}
                        container={container}
                        onEdit={() => openEditDialog(container)}
                        onDelete={deleteContainer}
                    />
                ))}
            </div>
            <AddButton theme={theme} onClick={() => setIsAddDialogOpen(true)} />
            <AddCustomContainerDialog
                isOpen={isAddDialogOpen}
                onClose={() => setIsAddDialogOpen(false)}
                onAdd={handleAddContainer}
                activeTab={activeTab}
            />
            <EditCustomContainerDialog
                isOpen={isEditDialogOpen}
                onClose={() => setIsEditDialogOpen(false)}
                onEdit={handleEditContainer}
                container={containerToEdit}
            />
        </div>
    );
};