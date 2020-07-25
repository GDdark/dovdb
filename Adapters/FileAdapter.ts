import * as Fs from 'fs';

import AdapterInterface from './AdapterInterface';

export default class FileAdapter implements AdapterInterface {
    private key: string;

    public constructor(filePath: string) {
        this.key = filePath;
    }

    public set(serializedSchemas: string) {
        Fs.writeFileSync(this.key, serializedSchemas);
    }

    public get() {
        return Fs.readFileSync(this.key).toString();
    }
}