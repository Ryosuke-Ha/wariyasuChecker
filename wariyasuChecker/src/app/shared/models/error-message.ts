export interface Message {
  type: string;
  content: ErrorContent;
}

export interface ErrorContent {
  name: string;
  status: number;
  message: string;
}
