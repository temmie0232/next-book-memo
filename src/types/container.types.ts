export interface Container {
    id: string;
    title: string;
    content: string;
    order: number;
}

export type ContainerUpdateField = 'title' | 'content' | 'order';