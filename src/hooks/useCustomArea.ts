import { useState } from 'react';
import { useCustomContainers } from '@/hooks/useCustomContainer';
import { CustomContainer } from '@/types/customContainer';

export const useCustomArea = () => {
    const {
        containers,
        activeTab,
        setActiveTab,
        searchTerm,
        titleOnly,
        addContainer,
        editContainer,
        deleteContainer,
        handleSearch,
        handleToggle
    } = useCustomContainers();

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [containerToEdit, setContainerToEdit] = useState<CustomContainer | null>(null);

    const handleAddContainer = (title: string, content: string) => {
        addContainer(title, content);
        setIsAddDialogOpen(false);
    };

    const handleEditContainer = (id: string, title: string, content: string) => {
        editContainer(id, title, content);
        setIsEditDialogOpen(false);
    };

    const openEditDialog = (container: CustomContainer) => {
        setContainerToEdit(container);
        setIsEditDialogOpen(true);
    };

    return {
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
    };
};