import * as Lodash from 'lodash';
import { createExpiredAt } from "./Helper";

export default class DovDbValue {
    private values: any[];
    private keyExpiredAt: number;

    public constructor(values: any[], keyExpiredAt: number) {
        this.values = values;
        this.keyExpiredAt = keyExpiredAt;
    }

    public insert(value: Object, ttl: number = -1): boolean {
        if (!Lodash.isObject(value) || Lodash.isArray(value)) {
            return false;
        }

        this.values.push({ value, expiredAt: createExpiredAt(ttl) })

        return true;
    }

    public count(conditions: any = null): number {
        return Lodash.filter(this.deleteExpiredValuesAndGetValues(), conditions).length;
    }

    public find(conditions: any = null): any[] {
        return Lodash.filter(this.deleteExpiredValuesAndGetValues(), conditions);
    }

    public findFirst(conditions: any = null): any {
        return Lodash.find(this.deleteExpiredValuesAndGetValues(), conditions);
    }

    private deleteExpiredValuesAndGetValues(): any[] {
        const currentTimestamp: number = Lodash.now();
        if (this.keyExpiredAt > 0 && currentTimestamp > this.keyExpiredAt) {
            return [];
        }

        const results: any[] = [];
 
        let i: number = this.values.length;
        while (i--) {
            if (this.values[i].expiredAt >= 0 && currentTimestamp > this.values[i].expiredAt) {
                this.values.splice(i, 1);
            } else {
                results.push(this.values[i].value);
            }
        }

        return results;
    }
}