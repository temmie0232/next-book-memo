import React from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import styles from './ContainerItem.module.css';
import CustomTooltip from '@/components/elements/CustomTooltip';
import { Container } from '@/types/container.types';
import AutoResizeTextArea from '../AutoResizeTextArea/AutoResizeTextArea';

interface ContainerItemProps {
    container: Container;
    index: number;
    updateContainer: (id: number, field: 'title' | 'content', value: string) => void;
    deleteContainer: (container: Container) => void;
    addContainer: (index: number) => void;
    theme: string;
}

const ContainerItem: React.FC<ContainerItemProps> = ({
    container,
    index,
    updateContainer,
    deleteContainer,
    addContainer,
    theme
}) => {
    return (
        <div className={styles.containerItem}>
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
    );
};

export default ContainerItem;