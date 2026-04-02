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
export interface GroupView {
    id: string;
    members: Array<string>;
    name: string;
    description: string;
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
export interface PerformanceData {
    topic: string;
    total: bigint;
    score: bigint;
    timestamp: bigint;
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
    addBadge(badge: string): Promise<void>;
    addContentItem(item: ContentItem): Promise<void>;
    addMemberToGroup(groupId: string, member: string): Promise<void>;
    addQuote(quote: string): Promise<void>;
    addXP(points: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createGroup(id: string, name: string, description: string): Promise<void>;
    deleteContentItem(id: string): Promise<void>;
    getAllContentItems(): Promise<Array<ContentItem>>;
    getAllGroups(): Promise<Array<GroupView>>;
    getAllPerformanceData(): Promise<Array<PerformanceData>>;
    getAllQuotes(): Promise<Array<string>>;
    getAllUserProfiles(): Promise<Array<UserProfile>>;
    getBadges(user: Principal): Promise<Array<string>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getContentItem(id: string): Promise<ContentItem | null>;
    getContentItemsByCategory(category: string): Promise<Array<ContentItem>>;
    getContentItemsByClassLevel(classLevel: string): Promise<Array<ContentItem>>;
    getGroup(id: string): Promise<GroupView | null>;
    getPerformanceData(user: Principal): Promise<Array<PerformanceData>>;
    getQuizScore(user: Principal): Promise<bigint | null>;
    getRandomContentItemByCategory(category: string): Promise<ContentItem | null>;
    getRandomQuote(): Promise<string | null>;
    getRecentPerformanceData(limit: bigint): Promise<Array<PerformanceData>>;
    getStudyPlan(user: Principal): Promise<string | null>;
    getTopPerformanceData(limit: bigint): Promise<Array<PerformanceData>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getXP(user: Principal): Promise<bigint | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    savePerformanceData(topic: string, score: bigint, total: bigint): Promise<void>;
    saveQuizScore(score: bigint): Promise<void>;
    saveStudyPlan(plan: string): Promise<void>;
    updateContentItem(item: ContentItem): Promise<void>;
}
