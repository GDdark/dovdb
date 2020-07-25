export default interface AdapterInterface {
    set(serializedSchemas: string): any;
    get(): any;
}