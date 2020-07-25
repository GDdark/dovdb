import * as Lodash from 'lodash';
import { createExpiredAt } from "./Helper";
import DovDbValue from './DovDbValue';

export default class DovDbKey {
    private schemas: Object;
    private key: string;

    public constructor(schemas: Object, key: string, ttl: number, once: boolean) {
        this.schemas = schemas;
        this.key = key;

        if (!this.schemas[this.key] || (this.schemas[this.key].expiredAt > 0 && Lodash.now() > this.schemas[this.key].expiredAt)) {
            this.schemas[this.key] = {
                values: [],
                expiredAt: -1,
            };
        }

        this.schemas[this.key].key = key;

        if (Lodash.isNumber(ttl)) {
            this.setTtl(ttl, once);
        }
    }

    private setTtl(ttl: number, once: boolean = true) {
        if (ttl < 0) {
            console.warn('TTL must be greater than 0');

            return;
        }

        if (once && this.schemas[this.key].expiredAt !== -1) {
            return;
        }

        this.schemas[this.key].expiredAt = createExpiredAt(ttl);

        return this;
    }

    public getValues(): DovDbValue {
        return new DovDbValue(this.schemas[this.key].values, this.schemas[this.key].expiredAt);
    }
}