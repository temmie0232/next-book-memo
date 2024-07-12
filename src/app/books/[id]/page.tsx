"use client"

import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/contexts/theme/useTheme';
import BookDetailHeader from '@/features/BookDetail/BookDetailHeader';
import { useAuth } from '@/hooks/useAuth';
import { PlusCircle, Trash2 } from 'lucide-react';
import styles from './style.module.css';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CustomTooltip from '@/components/elements/CustomTooltip';

interface Container {
    id: number;
    title: string;
    content: string;
    isModified?: boolean;
}

const BookDetailPage: React.FC = () => {
    const { theme } = useTheme();
    const { user, loading, authChecked } = useAuth();
    const [containers, setContainers] = useState<Container[]>([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [containerToDelete, setContainerToDelete] = useState<Container | null>(null);

    const handleSave = () => {
        // 保存ロジック
        console.log('Saving book details...');
    };

    const addContainer = (index: number) => {
        const newContainer: Container = {
            id: Date.now(),
            title: `New Container ${containers.length + 1}`,
            content: '',
            isModified: false,
        };
        const newContainers = [...containers];
        newContainers.splice(index + 1, 0, newContainer);
        setContainers(newContainers);
    };

    const updateContainer = (id: number, field: 'title' | 'content', value: string) => {
        setContainers(containers.map(container =>
            container.id === id ? { ...container, [field]: value, isModified: true } : container
        ));
    };

    const deleteContainer = (container: Container) => {
        if (container.isModified) {
            setContainerToDelete(container);
            setDeleteDialogOpen(true);
        } else {
            confirmDelete(container);
        }
    };

    const confirmDelete = (container: Container | null = containerToDelete) => {
        if (container) {
            setContainers(containers.filter(c => c.id !== container.id));
        }
        setDeleteDialogOpen(false);
        setContainerToDelete(null);
    };

    if (loading || !authChecked) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return null;
    }

    return (
        <div className={`${styles.container} ${theme === 'dark' ? styles.darkContainer : styles.lightContainer}`}>
            <BookDetailHeader onSave={handleSave} />
            <div className={styles.content}>
                {/* Memo Area */}
                <div className={styles.memoArea}>
                    {containers.map((container, index) => (
                        <div key={container.id} className={styles.containerItem}>
                            <div className={`${styles.containerItemContent} ${theme === 'dark' ? styles.darkContainerItemContent : styles.lightContainerItemContent}`}>
                                <input
                                    type="text"
                                    value={container.title}
                                    onChange={(e) => updateContainer(container.id, 'title', e.target.value)}
                                    className={`${styles.containerTitle} ${styles.mPlusFont}`}
                                />
                                <AutoResizeTextArea
                                    value={container.content}
                                    onChange={(e) => updateContainer(container.id, 'content', e.target.value)}
                                    className={`${styles.autoResizeTextArea} ${theme === 'dark' ? styles.darkAutoResizeTextArea : styles.lightAutoResizeTextArea} ${styles.mPlusFont}`}
                                />
                            </div>
                            <div className={styles.buttonBar}>
                                <CustomTooltip content="コンテナを追加">
                                    <button
                                        onClick={() => addContainer(index)}
                                        className={styles.addButton}
                                    >
                                        <PlusCircle size={24} />
                                    </button>
                                </CustomTooltip>
                                <CustomTooltip content="コンテナを削除">
                                    <button
                                        onClick={() => deleteContainer(container)}
                                        className={styles.deleteButton}
                                    >
                                        <Trash2 size={24} />
                                    </button>
                                </CustomTooltip>
                            </div>
                        </div>
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
                {/* Divider */}
                <div className={styles.divider} />
                {/* Custom Area */}
                <div className={`${styles.customArea} ${theme === 'dark' ? styles.darkCustomArea : styles.lightCustomArea}`}>
                    {/* 今後実装予定 */}
                    <h2 className="text-xl font-bold mb-4">Custom Area</h2>
                    <p>This area will be implemented later.</p>
                </div>
            </div>
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>コンテナの削除</DialogTitle>
                        <DialogDescription>
                            このコンテナには変更が加えられています。本当に削除しますか？
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>キャンセル</Button>
                        <Button variant="destructive" onClick={() => confirmDelete()}>削除</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

// 自動リサイズするテキストエリアコンポーネント
const AutoResizeTextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto';
            textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
        }
    }, [props.value]);

    return (
        <textarea
            {...props}
            ref={textAreaRef}
            rows={1}
        />
    );
};

export default BookDetailPage;