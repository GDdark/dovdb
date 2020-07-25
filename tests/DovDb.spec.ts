import * as Lodash from 'lodash';
import DovDb from "..";
import FileAdapter from "../Adapters/FileAdapter";

describe('All', () => {
	test('test find', () => {
		const key: string = String(Lodash.random(1, 99999));

		const db = new DovDb(new FileAdapter('./tests/test.txt'));
		db.key(key).insert({ name: 'A', age: 15, active: true });
		db.key(key).insert({ name: 'B', age: 16, active: true });
		db.key(key).insert({ name: 'C', age: 17, active: true });
		db.key(key).insert({ name: 'D', age: 15, active: true });
		db.key(key).insert({ name: 'E', age: 15, active: false });
		db.key(key).insert({ name: 'F', age: 15, active: false });

		const result1 = db.key(key).find({ age: 15 });
		expect(result1.length).toBe(4);

		const result2 = db.key(key).find({ age: 15, active: true });
		expect(result2.length).toBe(2);

		const result3 = db.key(key).count({ age: 15, active: true });
		expect(result3).toBe(2);

		const result4 = db.key(key).findFirst({ age: 15, active: true });
		// console.log(result4);
	});

	test('test timeout1', async () => {
		const key: string = String(Lodash.random(1, 99999));

		const db = new DovDb(new FileAdapter('./tests/test.txt'));
		
		db.key(key, 1).insert({ name: 'A', age: 15, active: true });
		expect(db.key(key).count()).toBe(1);

		db.key(key, 2).insert({ name: 'A', age: 15, active: true });
		expect(db.key(key).count()).toBe(2);

		await new Promise(r => setTimeout(() => r(), 1100));
		expect(db.key(key).count()).toBe(0);
	});

	test('test timeout2', async () => {
		const key: string = String(Lodash.random(1, 99999));

		const db = new DovDb(new FileAdapter('./tests/test.txt'));
		
		db.key(key, 1, false).insert({ name: 'A', age: 15, active: true });
		expect(db.key(key).count()).toBe(1);

		db.key(key, 2, false).insert({ name: 'A', age: 15, active: true });
		expect(db.key(key).count()).toBe(2);

		await new Promise(r => setTimeout(() => r(), 1100));
		expect(db.key(key).count()).toBe(2);

		await new Promise(r => setTimeout(() => r(), 1100));
		expect(db.key(key).count()).toBe(0);
	});

	test('test timeout3', async () => {
		const key: string = String(Lodash.random(1, 99999));

		const db = new DovDb(new FileAdapter('./tests/test.txt'));
		
		db.key(key).insert({ name: 'A', age: 16, active: true });
		db.key(key).insert({ name: 'A', age: 15, active: true }, 1);
		db.key(key).insert({ name: 'A', age: 15, active: true }, 2);
		db.key(key).insert({ name: 'A', age: 15, active: true }, 3);
		expect(db.key(key).count()).toBe(4);

		await new Promise(r => setTimeout(() => r(), 1000));
		expect(db.key(key).count()).toBe(3);

		await new Promise(r => setTimeout(() => r(), 1000));
		expect(db.key(key).count()).toBe(2);

		await new Promise(r => setTimeout(() => r(), 1000));
		expect(db.key(key).count()).toBe(1);

		const result = db.key(key).findFirst();
		expect(result.age).toBe(16);
	});

	test('test adapter', async () => {
		const key: string = String(Lodash.random(1, 99999));

		const adapter = new FileAdapter('./tests/test.txt')
		adapter.set('');

		expect(Lodash.isEmpty(adapter.get())).toBeTruthy();
		
		const db = new DovDb(adapter);
		
		db.key(key).insert({ name: 'A', age: 16, active: true });
		db.key(key).insert({ name: 'A', age: 15, active: true });
		db.key(key).insert({ name: 'A', age: 15, active: true });
		db.key(key).insert({ name: 'A', age: 15, active: true });
		expect(db.key(key).count()).toBe(4);

		db.save();

		expect(Lodash.isEmpty(adapter.get())).toBeFalsy();

		const db2 = new DovDb(adapter);
		db2.key(key).insert({ name: 'A', age: 16, active: true });
		db2.key(key).insert({ name: 'A', age: 15, active: true });
		db2.key(key).insert({ name: 'A', age: 15, active: true });
		db2.key(key).insert({ name: 'A', age: 15, active: true });
		expect(db2.key(key).count()).toBe(8);
	});
});
