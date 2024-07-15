import { db } from '~/firebase';
import { collection, doc, setDoc, writeBatch } from 'firebase/firestore';
import { sampleBooks } from '@/data/sampleBooks';
import { sampleGenres } from '@/data/sampleGenres';

export const addSampleData = async (userId: string) => {
    const batch = writeBatch(db);
    const userDocRef = doc(db, 'users', userId);

    // サンプルジャンルの追加
    await setDoc(userDocRef, { genres: sampleGenres }, { merge: true });

    // サンプル本の追加
    for (const book of sampleBooks) {
        // book オブジェクトから containers, importantNotes, characters を分離
        const { containers, importantNotes, characters, ...bookData } = book;

        // 新しい本のドキュメント参照を作成
        const bookRef = doc(collection(userDocRef, 'books'));

        // 本のメインデータをバッチに追加
        batch.set(bookRef, bookData);

        // コンテナを追加
        containers.forEach((container) => {
            const containerRef = doc(collection(bookRef, 'containers'));
            batch.set(containerRef, container);
        });

        // 重要なメモを追加
        importantNotes.forEach((note) => {
            const noteRef = doc(collection(bookRef, 'customContainers'));
            batch.set(noteRef, { ...note, createdAt: new Date(), updatedAt: new Date() });
        });

        // キャラクター情報を追加
        characters.forEach((character) => {
            const characterRef = doc(collection(bookRef, 'customContainers'));
            batch.set(characterRef, { ...character, createdAt: new Date(), updatedAt: new Date() });
        });
    }

    // バッチ処理をコミット（一括して書き込み）
    await batch.commit();
};