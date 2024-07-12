"use client"

import React from 'react';
import { useTheme } from '@/contexts/theme/useTheme';
import BookDetailHeader from '@/features/BookDetail/BookDetailHeader/BookDetailHeader';
import { useAuth } from '@/hooks/useAuth';
import { PlusCircle } from 'lucide-react';
import styles from './style.module.css';
import CustomTooltip from '@/components/elements/CustomTooltip';
import { useParams } from 'next/navigation';
import { useBookDetail } from '@/hooks/useBookDetail';
import { useContainers } from '@/hooks/useContainers';
import ContainerItem from '@/features/BookDetail/ContainerItem/ContainerItem';
import DeleteDialog from '@/features/BookDetail/DeleteDialog/DeleteDialog';

const BookDetailPage: React.FC = () => {
    const { theme } = useTheme();
    const { user, loading, authChecked } = useAuth();
    const params = useParams();
    const id = params.id as string;

    const { book, handleSave } = useBookDetail(user?.uid, id);
    const {
        containers,
        addContainer,
        updateContainer,
        deleteContainer,
        deleteDialogOpen,
        setDeleteDialogOpen,
        containerToDelete,
        confirmDelete
    } = useContainers();

    if (loading || !authChecked) {
        return <div>Loading...</div>;
    }

    if (!user || !book) {
        return null;
    }

    return (
        <div className={`${styles.container} ${theme === 'dark' ? styles.darkContainer : styles.lightContainer}`}>
            <BookDetailHeader book={book} onSave={handleSave} />
            <div className={styles.content}>
                <div className={styles.memoArea}>
                    {containers.map((container, index) => (
                        <ContainerItem
                            key={container.id}
                            container={container}
                            index={index}
                            updateContainer={updateContainer}
                            deleteContainer={deleteContainer}
                            addContainer={addContainer}
                            theme={theme}
                        />
                    ))}
                    {containers.length === 0 && (
                        <CustomTooltip content="コンテナを追加">
                            <button
                                onClick={() => addContainer(-1)}
                                className={`${styles.emptyStateButton} ${theme === 'dark' ? styles.darkEmptyStateButton : styles.lightEmptyStateButton}`}
                            >
                                <PlusCircle size={24} className="mr-2" />
                                Add Container
                            </button>
                        </CustomTooltip>
                    )}
                </div>
                <div className={styles.divider} />
                <div className={`${styles.customArea} ${theme === 'dark' ? styles.darkCustomArea : styles.lightCustomArea}`}>
                    <h2 className="text-xl font-bold mb-4">カスタムエリア</h2>
                    <p>後で実装するね</p>
                </div>
            </div>
            <DeleteDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                onConfirm={() => confirmDelete()}
            />
        </div>
    );
};

export default BookDetailPage;