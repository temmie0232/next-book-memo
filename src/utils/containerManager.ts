import { db } from '~/firebase';
import { collection, addDoc, doc, getDocs, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { Container } from '@/types/container.types';

/**
 * 新しいコンテナをFirestoreに追加する関数
 * @param userId ユーザーのID
 * @param bookId 本のID
 * @param containerData 追加するコンテナのデータ（id以外）
 * @returns 新しく作成されたコンテナのID
 */
export const addContainer = async (userId: string, bookId: string, containerData: Omit<Container, 'id'>): Promise<string> => {
    try {
        // ユーザー > 本 > コンテナ のパスでコレクションの参照を取得
        const containerRef = collection(db, 'users', userId, 'books', bookId, 'containers');
        // 新しいドキュメントを追加し、その参照を取得
        const docRef = await addDoc(containerRef, containerData);
        // 新しく作成されたドキュメントのIDを返す
        return docRef.id;
    } catch (error) {
        console.error('Error adding container:', error);
        throw new Error('Failed to add container');
    }
};

/**
 * 特定の本に属するすべてのコンテナをFirestoreから取得する関数
 * @param userId ユーザーのID
 * @param bookId 本のID
 * @returns コンテナの配列
 */
export const fetchContainers = async (userId: string, bookId: string): Promise<Container[]> => {
    try {
        // コンテナコレクションの参照を取得
        const containerRef = collection(db, 'users', userId, 'books', bookId, 'containers');
        // orderフィールドで並べ替えたクエリを作成
        const q = query(containerRef, orderBy('order'));
        // クエリを実行してスナップショットを取得
        const querySnapshot = await getDocs(q);
        const containers: Container[] = [];
        // スナップショットの各ドキュメントをコンテナオブジェクトに変換
        querySnapshot.forEach((doc) => {
            containers.push({ id: doc.id, ...doc.data() } as Container);
        });
        return containers;
    } catch (error) {
        console.error('Error fetching containers:', error);
        throw error;
    }
};

/**
 * 既存のコンテナを更新する関数
 * @param userId ユーザーのID
 * @param bookId 本のID
 * @param containerId 更新するコンテナのID
 * @param updatedData 更新するデータ
 */
export const updateContainer = async (userId: string, bookId: string, containerId: string, updatedData: Partial<Container>): Promise<void> => {
    try {
        // 更新するコンテナドキュメントの参照を取得
        const containerRef = doc(db, 'users', userId, 'books', bookId, 'containers', containerId);
        // ドキュメントを更新
        await updateDoc(containerRef, updatedData);
    } catch (error) {
        console.error('Error updating container:', error);
        throw error;
    }
};

/**
 * コンテナを削除する関数
 * @param userId ユーザーのID
 * @param bookId 本のID
 * @param containerId 削除するコンテナのID
 */
export const deleteContainer = async (userId: string, bookId: string, containerId: string): Promise<void> => {
    try {
        // 削除するコンテナドキュメントの参照を取得
        const containerRef = doc(db, 'users', userId, 'books', bookId, 'containers', containerId);
        // ドキュメントを削除
        await deleteDoc(containerRef);
    } catch (error) {
        console.error('Error deleting container:', error);
        throw error;
    }
};