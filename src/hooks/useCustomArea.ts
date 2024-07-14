import { useState } from 'react';
import { useCustomContainers } from '@/hooks/useCustomContainers';
import { CustomContainer } from '@/types/customContainer';
import { useParams } from 'next/navigation';

/**
 * CustomAreaコンポーネントのロジックを管理するカスタムフック
 * 
 * このフックは、カスタムコンテナの管理、ダイアログの制御、
 * および関連する操作のためのロジックをカプセル化します。
 * 
 * @returns CustomAreaコンポーネントで使用する状態と関数のオブジェクト
 */
export const useCustomArea = () => {
    // Next.jsのuseParamsフックを使用してURLパラメータを取得
    const params = useParams();
    const bookId = params.id as string;

    // useCustomContainersフックを使用してコンテナ関連の状態と関数を取得
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
    } = useCustomContainers(bookId);

    // ダイアログの開閉状態を管理するための状態
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    // 編集中のコンテナを保持するための状態
    const [containerToEdit, setContainerToEdit] = useState<CustomContainer | null>(null);

    /**
     * 新しいコンテナを追加する関数
     * 
     * @param title コンテナのタイトル
     * @param content コンテナの内容
     */
    const handleAddContainer = (title: string, content: string) => {
        addContainer(title, content);
        setIsAddDialogOpen(false);  // 追加後にダイアログを閉じる
    };

    /**
     * 既存のコンテナを編集する関数
     * 
     * @param id コンテナのID
     * @param title 更新後のタイトル
     * @param content 更新後の内容
     */
    const handleEditContainer = (id: string, title: string, content: string) => {
        editContainer(id, title, content);
        setIsEditDialogOpen(false);  // 編集後にダイアログを閉じる
    };

    /**
     * 編集ダイアログを開く関数
     * 
     * @param container 編集対象のコンテナ
     */
    const openEditDialog = (container: CustomContainer) => {
        setContainerToEdit(container);
        setIsEditDialogOpen(true);
    };

    // コンポーネントで使用する状態と関数をオブジェクトとして返す
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