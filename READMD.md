# dovdb

DovDb is a simple json database for Node and the browser. Powered by Lodash

In DovDb you can define the expiration time for each key and each value

>  The project was inspired by lowdb [https://github.com/typicode/lowdb]

## Usage

```
npm install dovdb
```

```typescript
const db = new DovDb(new FileAdapter('db.json'));
db.key(key).insert({ name: 'A', age: 16, active: true }); // insert a row data
db.key(key).insert({ name: 'B', age: 15, active: true });

db.key(key).count(); // 2
db.key(key).find(conditions); // use as Lodash.filter, return matched values
db.key(key).findfirst(conditions); // use as Lodash.find, return only one matched value

db.save();
```

ttl option

```typescript
const db = new DovDb(new FileAdapter('db.json'));
db.key(key, 2); // the all values of this key will expire after 2s

db.key(key, 3); // can not change the setted ttl
db.key(key, 3, false); // can change the ttl

db.key(key).insert({ name: 'A', age: 16, active: true }, 2); // this value will expire after 2s
```




