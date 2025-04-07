export interface User {
    id: string;
    username: string;
    url: string;
  }
  
  export interface Channel {
    id: string;
    name: string;
    messages: Array<{
      id: number;
      message: string;
      time: Date;
      sender: string;
    }>;
  }
  
  export interface Conversation {
    _id: string;
    users: User[];
    admins: User[];
    isGroup: boolean;
    channels?: Channel[];
    messages?: Array<{
      id: number;
      message: string;
      time: Date;
      sender: string;
    }>;
  }

  export interface Message {
    id: string;
    senderId: string;
    content: string;
  }

  export interface UserStoredInDB {
    UserID: string;
    Email: string;
    UserName: string;
    PictureURL: string;
    Nickname: string;
  }

  export interface HoverState {
    userId: string;
    startTime: number;
    timer: NodeJS.Timeout | null;
  }