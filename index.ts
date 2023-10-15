import { program } from 'commander';
import { messageManager } from './lib/message';
import { functionManager } from './lib/function';
import { openai } from './lib/api';

type IProgramOptions = {
  prompt: string;
};

const openaiChatCompletion = async (userMessage?: string) => {
  if (userMessage) {
    messageManager.addUserMessage(userMessage);
  }

  return openai.chatCompletion({
    messages: messageManager.messages,
    functions: functionManager.getFunctionDescriptors()
  });
}

const main = async ({ prompt }: IProgramOptions) => {
  let res = await openaiChatCompletion(prompt);

  while (res.type === 'function_call') {
    await functionManager.callFunction(
      res.function_call!.name,
      res.function_call!.args
    );

    res = await openaiChatCompletion();
  }

  console.log(res.content);
};

program
  .option('-p, --prompt <prompt>', '', 'What is the weather like in Xiamen?')
  .action(main);

program.parse(process.argv);
