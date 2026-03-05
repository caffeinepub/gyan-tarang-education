import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface ContentItem {
    id: string;
    url: string;
    title: string;
    subject: string;
    contentType: string;
    file?: ExternalBlob;
    description: string;
    language: string;
    category: string;
    classLevel: string;
    governmentApproved: boolean;
}
export interface UserProfile {
    classOrBranch: string;
    name: string;
    role: string;
    email: string;
    language: string;
    phone: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addContentItem(item: ContentItem): Promise<void>;
    addQuote(quote: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createGroup(id: string, name: string, description: string): Promise<void>;
    deleteContentItem(id: string): Promise<void>;
    getAllContentItems(): Promise<Array<ContentItem>>;
    getAllQuotes(): Promise<Array<string>>;
    getAllUserProfiles(): Promise<Array<UserProfile>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getContentItem(id: string): Promise<{
        url: string;
        title: string;
        subject: string;
        contentType: string;
        file?: ExternalBlob;
        description: string;
        language: string;
        category: string;
        classLevel: string;
        governmentApproved: boolean;
    }>;
    getContentItemsByCategory(category: string): Promise<Array<ContentItem>>;
    getContentItemsByClassLevel(classLevel: string): Promise<Array<ContentItem>>;
    getQuizScore(user: Principal): Promise<bigint | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveQuizScore(score: bigint): Promise<void>;
    updateContentItem(item: ContentItem): Promise<void>;
}
