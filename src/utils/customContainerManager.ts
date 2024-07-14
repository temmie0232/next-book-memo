import { db } from '~/firebase';
import { collection, addDoc, doc, getDocs, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { CustomContainer } from '@/types/customContainer';

/**
 * カスタムコンテナをFirestoreに保存する関数
 * 
 * この関数は、新しいカスタムコンテナを作成するか、既存のコンテナを更新します。
 * コンテナのIDが提供されている場合は更新を、そうでない場合は新規作成を行います。
 * 
 * @param userId ユーザーID - Firestoreのユーザードキュメントを特定するために使用
 * @param bookId 本のID - ユーザードキュメント内の特定の本を指定するために使用
 * @param containerData コンテナのデータ - タイトルや内容などのコンテナ情報を含むオブジェクト
 * @param containerType コンテナのタイプ - 'important-notes'（重要なメモ）または'characters'（登場人物）
 * @returns 保存されたコンテナオブジェクト - 新規作成の場合はIDを含む
 */
export const saveContainer = async (
    userId: string,
    bookId: string,
    containerData: Partial<CustomContainer>,
    containerType: 'important-notes' | 'characters'
): Promise<CustomContainer> => {
    // Firestoreのドキュメント参照を作成
    const userDocRef = doc(db, 'users', userId);
    const bookDocRef = doc(userDocRef, 'books', bookId);
    const containersCollectionRef = collection(bookDocRef, 'customContainers');

    if (containerData.id) {
        // 既存のコンテナを更新
        const containerDocRef = doc(containersCollectionRef, containerData.id);
        await updateDoc(containerDocRef, {
            ...containerData,
            type: containerType,
            updatedAt: new Date()
        });
        return { ...containerData, type: containerType } as CustomContainer;
    } else {
        // 新しいコンテナを追加
        const newContainerRef = await addDoc(containersCollectionRef, {
            ...containerData,
            type: containerType,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        return { id: newContainerRef.id, ...containerData, type: containerType } as CustomContainer;
    }
};

/**
 * 指定された本とタイプのカスタムコンテナを取得する関数
 * 
 * この関数は、特定のユーザー、本、およびコンテナタイプに基づいて
 * Firestoreからカスタムコンテナのリストを取得します。
 * 
 * @param userId ユーザーID - Firestoreのユーザードキュメントを特定するために使用
 * @param bookId 本のID - ユーザードキュメント内の特定の本を指定するために使用
 * @param containerType コンテナのタイプ - 'important-notes'（重要なメモ）または'characters'（登場人物）
 * @returns コンテナの配列 - 指定された条件に一致するすべてのコンテナ
 */
export const fetchContainers = async (
    userId: string,
    bookId: string,
    containerType: 'important-notes' | 'characters'
): Promise<CustomContainer[]> => {
    // Firestoreのドキュメント参照とクエリを作成
    const userDocRef = doc(db, 'users', userId);
    const bookDocRef = doc(userDocRef, 'books', bookId);
    const containersCollectionRef = collection(bookDocRef, 'customContainers');
    const q = query(containersCollectionRef, where("type", "==", containerType));

    // クエリを実行し、結果を配列に変換
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CustomContainer));
};

/**
 * カスタムコンテナを削除する関数
 * 
 * この関数は、指定されたユーザー、本、コンテナID、およびタイプに基づいて
 * Firestoreから特定のカスタムコンテナを削除します。
 * 
 * @param userId ユーザーID - Firestoreのユーザードキュメントを特定するために使用
 * @param bookId 本のID - ユーザードキュメント内の特定の本を指定するために使用
 * @param containerId コンテナID - 削除するコンテナを特定するために使用
 * @param containerType コンテナのタイプ - 'important-notes'（重要なメモ）または'characters'（登場人物）
 */
export const deleteContainer = async (
    userId: string,
    bookId: string,
    containerId: string,
    containerType: 'important-notes' | 'characters'
): Promise<void> => {
    // Firestoreのドキュメント参照を作成し、コンテナを削除
    const userDocRef = doc(db, 'users', userId);
    const bookDocRef = doc(userDocRef, 'books', bookId);
    const containerDocRef = doc(bookDocRef, 'customContainers', containerId);
    await deleteDoc(containerDocRef);
};