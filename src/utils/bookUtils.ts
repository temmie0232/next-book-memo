import React from 'react';
import { IconType } from 'react-icons';
import { FaRegFaceSmile, FaRegFaceFrownOpen, FaRegCircle, FaRegFaceMehBlank, FaRegFaceGrinSquint } from 'react-icons/fa6';
import { FaRegDizzy } from 'react-icons/fa';

/**
 * 本の読書状態に応じた色を返す関数
 * 
 * @param status - 本の読書状態
 * @returns 状態に対応する色のHEXコード
 */
export const getStatusColor = (status: 'not-started' | 'in-progress' | 'completed') => {
    switch (status) {
        case 'not-started': return '#FF5C5C'; // 赤色: 未読
        case 'in-progress': return '#FFD700'; // 黄色: 読書中
        case 'completed': return '#32CD32';   // 緑色: 完読
        default: return '#808080';            // グレー: 不明な状態
    }
};

/**
 * 本の読書状態を日本語テキストで返す関数
 * 
 * @param status - 本の読書状態
 * @returns 状態に対応する日本語テキスト
 */
export const getStatusText = (status: 'not-started' | 'in-progress' | 'completed') => {
    switch (status) {
        case 'not-started': return '未読';
        case 'in-progress': return '読書中';
        case 'completed': return '完読';
        default: return '不明';
    }
};

/**
 * 本の評価に応じたアイコンコンポーネントを返す関数
 * 
 * @param rating - 本の評価（1〜5の文字列、またはnull）
 * @returns 評価に対応するアイコンコンポーネント
 */
export const getRatingIcon = (rating: string | null): IconType => {
    switch (rating) {
        case '5': return FaRegFaceGrinSquint; // とても嬉しい顔
        case '4': return FaRegFaceSmile;      // 笑顔
        case '3': return FaRegFaceMehBlank;   // 無表情
        case '2': return FaRegFaceFrownOpen;  // 困った顔
        case '1': return FaRegDizzy;          // めまい顔
        default: return FaRegCircle;          // 評価なし: 丸
    }
};

/**
 * 本の評価を日本語テキストで返す関数
 * 
 * @param rating - 本の評価（1〜5の文字列、またはnull）
 * @returns 評価に対応する日本語テキスト
 */
export const getRatingText = (rating: string | null) => {
    switch (rating) {
        case '5': return 'とても面白い';
        case '4': return '面白い';
        case '3': return '普通';
        case '2': return 'あまり面白くない';
        case '1': return '面白くない';
        default: return '評価なし';
    }
};

/**
 * 読書の開始日と終了日から日付範囲のテキストを生成する関数
 * 
 * @param startDate - 読書開始日（文字列またはnull）
 * @param endDate - 読書終了日（文字列またはnull）
 * @returns 日付範囲を表す文字列
 */
export const getDateRange = (startDate: string | null, endDate: string | null) => {
    if (!startDate && !endDate) return '登録されていません';
    if (startDate && endDate) return `${startDate} ~ ${endDate}`;
    if (startDate) return `${startDate} ~`;  // 開始日のみ
    if (endDate) return `~ ${endDate}`;      // 終了日のみ
    return '登録されていません';              // この行は実際には実行されないが、TypeScriptの型チェックのために必要
};