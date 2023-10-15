interface Now {
  obsTime: string;
  temp: string;
  feelsLike: string;
  icon: string;
  text: string;
  wind360: string;
  windDir: string;
  windScale: string;
  windSpeed: string;
  humidity: string;
  precip: string;
  pressure: string;
  vis: string;
  cloud: string;
  dew: string;
}

interface Refer {
  sources: string[];
  license: string[];
}

interface WeatherDetails {
  code: string;
  updateTime: string;
  fxLink: string;
  now: Now;
  refer: Refer;
}

interface FunctionCall {
  arguments: string;
  name: string;
}

interface Message {
  content: string | null;
  function_call?: FunctionCall;
  name?: string;
  role: string;
}

interface Choice {
  finish_reason: string;
  index: number;
  message: Message;
}

interface Usage {
  completion_tokens: number;
  prompt_tokens: number;
  total_tokens: number;
}

interface ChatCompletion {
  choices: Choice[];
  created: number;
  model: string;
  object: string;
  usage: Usage;
}

export { WeatherDetails, ChatCompletion, Choice, Message };
