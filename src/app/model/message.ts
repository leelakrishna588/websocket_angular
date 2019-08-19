import { MessageType } from './message-type.enum';

export interface Message {
    message: string,
    sender: string,
    type:MessageType,
}

