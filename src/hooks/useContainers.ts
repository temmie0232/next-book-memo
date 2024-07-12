import { useState } from 'react';
import { Container } from '@/types/container.types';

/**
 * コンテナの状態を管理するカスタムフック
 * 
 * @returns コンテナ関連の状態と操作関数
 */
export const useContainers = () => {
    const [containers, setContainers] = useState<Container[]>([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [containerToDelete, setContainerToDelete] = useState<Container | null>(null);

    /**
     * 新しいコンテナを追加する関数
     * @param index 追加する位置のインデックス
     */
    const addContainer = (index: number) => {
        const newContainer: Container = {
            id: Date.now(),
            title: `見出し ${containers.length + 1}`,
            content: '',
            isModified: false,
        };
        const newContainers = [...containers];
        newContainers.splice(index + 1, 0, newContainer);
        setContainers(newContainers);
    };

    /**
     * コンテナの内容を更新する関数
     * @param id 更新するコンテナのID
     * @param field 更新するフィールド（'title' または 'content'）
     * @param value 新しい値
     */
    const updateContainer = (id: number, field: 'title' | 'content', value: string) => {
        setContainers(containers.map(container =>
            container.id === id ? { ...container, [field]: value, isModified: true } : container
        ));
    };

    /**
     * コンテナを削除する関数
     * @param container 削除するコンテナ
     */
    const deleteContainer = (container: Container) => {
        if (container.isModified) {
            setContainerToDelete(container);
            setDeleteDialogOpen(true);
        } else {
            confirmDelete(container);
        }
    };

    /**
     * コンテナの削除を確認する関数
     * @param container 削除するコンテナ（省略時は containerToDelete を使用）
     */
    const confirmDelete = (container: Container | null = containerToDelete) => {
        if (container) {
            setContainers(containers.filter(c => c.id !== container.id));
        }
        setDeleteDialogOpen(false);
        setContainerToDelete(null);
    };

    return {
        containers,
        addContainer,
        updateContainer,
        deleteContainer,
        deleteDialogOpen,
        setDeleteDialogOpen,
        containerToDelete,
        confirmDelete
    };
};