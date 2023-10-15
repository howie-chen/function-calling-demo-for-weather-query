import { getCoordinateByCityName, getCoordinateByCityNameDescriptor } from './getCoordinateByCityName.ts';
import {
  getRealTimeWeatherByCoordinate,
  getRealTimeWeatherByCoordinateDescriptor
} from './getRealTimeWeatherByCoordinate.ts';
import { messageManager } from '../message';


class FunctionManager {

  private _functionMap: Map<string, Function> = new Map();

  private _functionDescriptorMap: Map<string, any> = new Map();

  constructor() {
    this.addFunction(
      getCoordinateByCityName.name,
      getCoordinateByCityName,
      getCoordinateByCityNameDescriptor
    );

    this.addFunction(
      getRealTimeWeatherByCoordinate.name,
      getRealTimeWeatherByCoordinate,
      getRealTimeWeatherByCoordinateDescriptor
    );
  }

  addFunction(name: string, func: Function, descriptor: any) {
    this._functionMap.set(name, func);
    this._functionDescriptorMap.set(name, descriptor);
  }

  getFunction(name: string): Function | undefined {
    return this._functionMap.get(name);
  }

  getFunctionDescriptors(): any[] {
    return Array.from(this._functionDescriptorMap.values());
  }

  async callFunction(name: string, args: Record<string, string>): Promise<string> {
    const func = this.getFunction(name);
    const values = Object.values(args);

    if (!func) {
      throw new Error(`Function ${name} not found`);
    }

    const res = await func(...values);

    messageManager.addFunctionMessage(name, res);

    return res;
  }

}

const functionManager = new FunctionManager();

export { functionManager };
