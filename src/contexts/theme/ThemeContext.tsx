// ThemeContext.tsx

import React, { createContext } from 'react';
import { ThemeContextType } from './themeType';

/** 
 * ThemeContextの作成。
 * 初期値はundefined
 */
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);