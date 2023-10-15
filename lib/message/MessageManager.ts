import { Message } from '../../types.ts';

class MessageManager {

  private _messages: Message[] = [];

  get messages(): Message[] {
    return this._messages;
  }

  addUserMessage(content: string) {
    this._messages.push({
      role: 'user',
      content
    });
  }

  addAssistantMessage(message: Message) {
    this._messages.push(message);
  }

  addFunctionMessage(funcName: string, funcReturnedValue: string) {
    this._messages.push({
      role: 'function',
      name: funcName,
      content: funcReturnedValue,
    });
  }

}

export const messageManager = new MessageManager();
