
export interface Container {
    id: number;
    title: string;
    content: string;
    isModified?: boolean;
}

export type ContainerUpdateField = 'title' | 'content';