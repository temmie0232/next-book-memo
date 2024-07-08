import { useState, useEffect } from 'react';

/**
 * カスタムフック: 本棚のレイアウトを動的に計算する
 * 
 * ウィンドウのサイズに基づいて1つの棚に表示する本の数を計算する。
 * ウィンドウのリサイズに応じて自動的に再計算を行う。
 * 
 * @returns {number} 1つの棚に表示する本の数
 */
export const useBookshelfLayout = () => {
    // booksPerShelfの状態を管理し、初期値を12に設定
    const [booksPerShelf, setBooksPerShelf] = useState<number>(12);

    useEffect(() => {

        // 本棚のレイアウトを更新する関数
        const updateBooksPerShelf = () => {

            // cssで定義された値を使う (後でcssファイルと動悸させる)
            const bookWidth = 120; // BookList.cssの.bookのwidth
            const containerPadding = 32; // BookList.cssの.book-list-containerのpadding (16px * 2)
            const bookGap = 16; // BookList.cssの.books-containerのgap

            // 利用可能な幅を計算
            const availableWidth = window.innerWidth - containerPadding;
            const targetWidth = availableWidth * 0.80; // 画面の80%

            // 一行に表示可能な本の数を計算
            const booksPerRow = Math.floor((targetWidth + bookGap) / (bookWidth + bookGap));

            // 計算結果を状態にセット
            setBooksPerShelf(Math.max(1, booksPerRow)); // 最低一冊は表示
        };

        // 初回の実行
        updateBooksPerShelf();

        // ウィンドウサイズ変更のたびに本棚レイアウト更新
        window.addEventListener('resize', updateBooksPerShelf);

        // コンポーネントのアンマウント時にイベントリスナーを削除
        return () => window.removeEventListener('resize', updateBooksPerShelf);
    }, []);// 空の依存配列を指定し、エフェクトを一度だけ実行

    // 計算された本の数を返す
    return booksPerShelf;
};