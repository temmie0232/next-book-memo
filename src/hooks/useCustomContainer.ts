import { useState, useCallback, useEffect } from 'react';
import { CustomContainer } from '@/types/customContainer';

export const useCustomContainers = () => {
    const [containers, setContainers] = useState<CustomContainer[]>([]);
    const [activeTab, setActiveTab] = useState<string>(() => {
        return localStorage.getItem('activeTab') || 'characters';
    });
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [titleOnly, setTitleOnly] = useState<boolean>(true);

    const addContainer = useCallback((title: string, content: string) => {
        const newContainer: CustomContainer = {
            id: Date.now().toString(),
            title,
            content
        };
        setContainers(prev => [...prev, newContainer]);
    }, []);

    const editContainer = useCallback((id: string, title: string, content: string) => {
        setContainers(prev =>
            prev.map(container =>
                container.id === id ? { ...container, title, content } : container
            )
        );
    }, []);

    const deleteContainer = useCallback((id: string) => {
        setContainers(prev => prev.filter(container => container.id !== id));
    }, []);

    const handleSearch = useCallback((term: string) => {
        setSearchTerm(term);
    }, []);

    const handleToggle = useCallback((checked: boolean) => {
        setTitleOnly(checked);
    }, []);

    useEffect(() => {
        localStorage.setItem('activeTab', activeTab);
    }, [activeTab]);

    const filteredContainers = containers.filter(container => {
        if (titleOnly) {
            return container.title.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return container.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            container.content.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return {
        containers: filteredContainers,
        activeTab,
        setActiveTab,
        searchTerm,
        titleOnly,
        addContainer,
        editContainer,
        deleteContainer,
        handleSearch,
        handleToggle
    };
};