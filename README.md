# Open AI: Function calling demo for weather query

## Usage

1. Create `.env` file in the root directory:
   - `Q_WEATHER_API_KEY=XXX` - Your API key for [和风天气](https://console.qweather.com/#/apps)
   - `OPENAI_API_KEY=XXX` - Your API key for [OpenAI](https://platform.openai.com/)
   - `OPENAI_API_HOST=https://XXX` (optional)
2. Run the program:
   ```shell
   bun install
   bun run index.ts --prompt "What's the weather like in Xiamen?"
   ```

## Note

If you haven't installed Bun, one of the most popular Node.js alternatives, please install here:
https://bun.sh

or run `index.ts` with Node and ts-node.
