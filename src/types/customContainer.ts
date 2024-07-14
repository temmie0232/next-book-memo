export interface CustomContainer {
    id: string;
    title: string;
    content: string;
    type: 'important-notes' | 'characters';
    createdAt: Date;
    updatedAt: Date;
}