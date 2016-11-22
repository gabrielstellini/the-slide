export interface NotificationData {
    message: string;
    type: NotificationTypes;
}

export enum NotificationTypes {
    INFO,
    WARNING,
    DANGER,
    SUCCESS
}