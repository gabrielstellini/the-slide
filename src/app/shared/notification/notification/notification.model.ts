export interface NotificationData {
    message: string;
    type: NotificationTypes;
}

export enum NotificationTypes {
    INFO,
    DANGER,
    SUCCESS
}