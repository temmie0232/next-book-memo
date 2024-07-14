import { useState, useEffect } from 'react';
import { CustomContainer } from '@/types/customContainer';
import { useAuth } from '@/hooks/useAuth';
import { saveContainer, fetchContainers, deleteContainer as deleteContainerFromDB } from '@/utils/customContainerManager';

/**
 * カスタムコンテナを管理するためのカスタムフック
 * 
 * このフックは、特定の本に関連するカスタムコンテナの取得、追加、編集、削除、
 * および検索機能を提供します。また、アクティブなタブの管理も行います。
 * 
 * @param bookId 本のID - コンテナを管理する対象の本を指定
 * @returns コンテナ、アクティブタブ、検索関連の状態と操作関数のオブジェクト
 */
export const useCustomContainers = (bookId: string) => {
    // コンテナのリストを管理する状態
    const [containers, setContainers] = useState<CustomContainer[]>([]);
    // アクティブなタブ（'important-notes' または 'characters'）を管理する状態
    const [activeTab, setActiveTab] = useState<'important-notes' | 'characters'>('important-notes');
    // 検索語を管理する状態
    const [searchTerm, setSearchTerm] = useState<string>('');
    // タイトルのみで検索するかどうかを管理する状態
    const [titleOnly, setTitleOnly] = useState<boolean>(true);
    // 認証情報を取得するカスタムフック
    const { user } = useAuth();

    // ユーザー、本ID、またはアクティブタブが変更されたときにコンテナを読み込む
    useEffect(() => {
        if (user && bookId) {
            loadContainers();
        }
    }, [user, bookId, activeTab]);

    /**
     * Firestoreからコンテナを読み込む非同期関数
     */
    const loadContainers = async () => {
        if (user) {
            const loadedContainers = await fetchContainers(user.uid, bookId, activeTab);
            setContainers(loadedContainers);
        }
    };

    /**
     * 新しいコンテナを追加する非同期関数
     * 
     * @param title コンテナのタイトル
     * @param content コンテナの内容
     */
    const addContainer = async (title: string, content: string) => {
        if (user) {
            const newContainer = await saveContainer(user.uid, bookId, { title, content }, activeTab);
            setContainers([...containers, newContainer]);
        }
    };

    /**
     * 既存のコンテナを編集する非同期関数
     * 
     * @param id 編集するコンテナのID
     * @param title 更新後のタイトル
     * @param content 更新後の内容
     */
    const editContainer = async (id: string, title: string, content: string) => {
        if (user) {
            await saveContainer(user.uid, bookId, { id, title, content }, activeTab);
            setContainers(containers.map(container =>
                container.id === id ? { ...container, title, content } : container
            ));
        }
    };

    /**
     * コンテナを削除する非同期関数
     * 
     * @param id 削除するコンテナのID
     */
    const deleteContainer = async (id: string) => {
        if (user) {
            await deleteContainerFromDB(user.uid, bookId, id, activeTab);
            setContainers(containers.filter(container => container.id !== id));
        }
    };

    /**
     * 検索語を更新する関数
     * 
     * @param term 新しい検索語
     */
    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    /**
     * タイトルのみで検索するかどうかを切り替える関数
     * 
     * @param checked タイトルのみで検索する場合はtrue
     */
    const handleToggle = (checked: boolean) => {
        setTitleOnly(checked);
    };

    // 現在の検索条件に基づいてコンテナをフィルタリング
    const filteredContainers = containers.filter(container => {
        if (titleOnly) {
            return container.title.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return container.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            container.content.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // フックから返すオブジェクト
    return {
        containers: filteredContainers,  // フィルタリングされたコンテナリスト
        activeTab,                       // 現在のアクティブタブ
        setActiveTab,                    // アクティブタブを設定する関数
        searchTerm,                      // 現在の検索語
        titleOnly,                       // タイトルのみで検索するかどうかのフラグ
        addContainer,                    // 新しいコンテナを追加する関数
        editContainer,                   // 既存のコンテナを編集する関数
        deleteContainer,                 // コンテナを削除する関数
        handleSearch,                    // 検索語を更新する関数
        handleToggle                     // タイトルのみで検索するかどうかを切り替える関数
    };
};