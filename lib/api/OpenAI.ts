import axios from 'axios';
import { ChatCompletion, Message } from '../../types.ts';
import { DEFAULT_OPENAI_API_HOST } from '../../constants.ts';
import { messageManager } from '../message';

type IChatCompletionParams = {
  messages: Message[];
  functions: any[];
}

type IParsedResponse = {
  type: 'text' | 'function_call';
  content?: string;
  function_call?: {
    name: string;
    args: Record<string, string>;
  }
}

class OpenAI {

  async chatCompletion({ messages, functions }: IChatCompletionParams): Promise<IParsedResponse> {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error(`Please set environment variable 'OPENAI_API_KEY'`);
    }

    const apiHost = process.env.OPENAI_API_HOST || DEFAULT_OPENAI_API_HOST;
    const endpoint = `${apiHost}/v1/chat/completions`;

    const res = await axios.post<ChatCompletion>(endpoint, {
      model: 'gpt-3.5-turbo',
      messages,
      functions,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      }
    });

    return this.responseParser(res.data);
  }

  responseParser(response: ChatCompletion): IParsedResponse {
    const assistantMessage = response.choices[0].message;

    messageManager.addAssistantMessage(assistantMessage);

    const functionCall = assistantMessage.function_call;

    if (functionCall) {
      const funcName = functionCall.name;
      const funcArgs = JSON.parse(functionCall.arguments);

      return {
        type: 'function_call',
        function_call: {
          name: funcName,
          args: funcArgs,
        }
      }
    }

    return {
      type: 'text',
      content: assistantMessage.content || '<No content>',
    }
  }

}

export const openai = new OpenAI();
