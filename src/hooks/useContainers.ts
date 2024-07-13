import { useState, useEffect, useCallback } from 'react';
import { Container } from '@/types/container.types';
import { addContainer, fetchContainers, updateContainer, deleteContainer } from '@/utils/containerManager';
import { useAuth } from '@/hooks/useAuth';
import debounce from 'lodash/debounce';

/**
 * コンテナの状態を管理するカスタムフック
 * @param bookId 現在の本のID
 */
export const useContainers = (bookId: string) => {
    // コンテナの状態を管理
    const [containers, setContainers] = useState<Container[]>([]);
    // 削除ダイアログの表示状態を管理
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    // 削除対象のコンテナを管理
    const [containerToDelete, setContainerToDelete] = useState<Container | null>(null);
    // 認証情報を取得
    const { user } = useAuth();

    /**
     * ユーザーと本のIDが有効な場合、コンテナをロード
     */
    useEffect(() => {
        if (user && bookId) {
            loadContainers();
        }
    }, [user, bookId]);

    /**
     * Firestoreからコンテナをロードする関数
     */
    const loadContainers = async () => {
        if (user) {
            try {
                const loadedContainers = await fetchContainers(user.uid, bookId);
                setContainers(loadedContainers);
            } catch (error) {
                console.error('Error loading containers:', error);
            }
        }
    };

    /**
     * 新しいコンテナを追加する関数
     * @param index 新しいコンテナを挿入する位置
     */
    const addNewContainer = async (index: number) => {
        if (user) {
            const newContainer: Omit<Container, 'id'> = {
                title: `見出し ${containers.length + 1}`,
                content: '',
                order: index + 1,
            };
            try {
                const newContainerId = await addContainer(user.uid, bookId, newContainer);
                // 新しいコンテナを挿入し、それ以降のコンテナの順序を更新
                setContainers(prev => [
                    ...prev.slice(0, index + 1),
                    { ...newContainer, id: newContainerId },
                    ...prev.slice(index + 1).map(c => ({ ...c, order: c.order + 1 }))
                ]);
            } catch (error) {
                console.error('Error adding new container:', error);
            }
        }
    };

    /**
     * コンテナの更新をデバウンスする関数
     * 頻繁な更新を防ぎ、パフォーマンスを最適化
     */
    const debouncedUpdateContainer = useCallback(
        debounce(async (userId: string, bookId: string, id: string, field: string, value: string | number) => {
            try {
                await updateContainer(userId, bookId, id, { [field]: value });
                console.log(`Container ${id} updated: ${field} = ${value}`);
            } catch (error) {
                console.error('Error updating container:', error);
            }
        }, 500), // 500ミリ秒のデバウンス時間
        []
    );

    /**
     * 既存のコンテナを更新する関数
     * @param id 更新するコンテナのID
     * @param field 更新するフィールド
     * @param value 新しい値
     */
    const updateExistingContainer = async (id: string, field: 'title' | 'content' | 'order', value: string | number) => {
        if (user) {
            // ローカルの状態を即時更新
            setContainers(containers.map(container =>
                container.id === id ? { ...container, [field]: value } : container
            ));
            // Firestoreの更新をデバウンス
            debouncedUpdateContainer(user.uid, bookId, id, field, value);
        }
    };

    /**
     * コンテナの削除を開始する関数
     * 削除ダイアログを表示
     * @param container 削除対象のコンテナ
     */
    const deleteExistingContainer = async (container: Container) => {
        setContainerToDelete(container);
        setDeleteDialogOpen(true);
    };

    /**
     * コンテナの削除を確認する関数
     * 削除ダイアログで確認後に実行
     */
    const confirmDelete = async () => {
        if (user && containerToDelete) {
            try {
                await deleteContainer(user.uid, bookId, containerToDelete.id);
                // ローカルの状態から削除したコンテナを除外
                setContainers(containers.filter(c => c.id !== containerToDelete.id));
            } catch (error) {
                console.error('Error deleting container:', error);
            }
        }
        setDeleteDialogOpen(false);
        setContainerToDelete(null);
    };

    // フックから返す値と関数
    return {
        containers,
        addContainer: addNewContainer,
        updateContainer: updateExistingContainer,
        deleteContainer: deleteExistingContainer,
        deleteDialogOpen,
        setDeleteDialogOpen,
        containerToDelete,
        confirmDelete
    };
};