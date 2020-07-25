import AdapterInterface from './AdapterInterface';

export default class StorageAdapter implements AdapterInterface {
    private key: string;

    public constructor(key: string) {
        this.key = key;
    }

    public set(serializedSchemas: string) {
        localStorage.setItem(this.key, serializedSchemas);
    }

    public get() {
        return localStorage.getItem(this.key);
    }
}