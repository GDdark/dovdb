import * as Lodash from 'lodash';
import DovDbKey from './DovDbKey';
import DovDbValue from './DovDbValue';
import AdapterInterface from './Adapters/AdapterInterface';

export default class DovDb {
    public adapter: AdapterInterface;

    private schemas: Object = new Object();

    public constructor(adapter: AdapterInterface) {
        this.adapter = adapter;
        
        const serializedSchemas = this.adapter.get();
        if (!Lodash.isEmpty(serializedSchemas)) {
            this.defaults(serializedSchemas);
        }
    }

    private defaults(serializedSchemas: string) {
        this.schemas = this.unserialize(serializedSchemas);
    }

    public key(key: string, ttl: number = undefined, once: boolean = true): DovDbValue {
        const dovDbKey: DovDbKey = new DovDbKey(this.schemas, key, ttl, once);

        return dovDbKey.getValues();
    }

    public save() {
        this.adapter.set(this.serialize());
    }

    private serialize(): string {
        return JSON.stringify(this.schemas);
    }

    private unserialize(serializeString: string): Object {
        return JSON.parse(serializeString);
    }
}


