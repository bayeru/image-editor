import { Image } from "@/common/types";
import { DBSchema, IDBPDatabase, openDB } from "idb";

/**
 * Schema for the IndexedDB database
 */
interface ImageDBSchema extends DBSchema {
	"edited-images": {
		key: string;
		value: Image;
	};
}

/**
 * IndexedDB wrapper for storing edited images
 */
export class ImageDB {
	private _db?: IDBPDatabase<ImageDBSchema>;
	private dbName: string;

	constructor(dbName: string) {
		this.dbName = dbName;
	}

	private async getDB() {
		if (!this._db) {
			this._db = await openDB<ImageDBSchema>(this.dbName, 1, {
				upgrade(db) {
					db.createObjectStore("edited-images", { keyPath: "id" });
				},
			});
		}

		return this._db;
	}

	async put(image: any) {
		const db = await this.getDB();
		await db.put("edited-images", image);
	}

	async get(id: string): Promise<Image | undefined> {
		const db = await this.getDB();
		return await db.get("edited-images", id);
	}

	async getAll(): Promise<Image[]> {
		const db = await this.getDB();
		return await db.getAll("edited-images");
	}

	async delete(id: string) {
		const db = await this.getDB();
		return await db.delete("edited-images", id);
	}

	async clearAll() {
		const db = await this.getDB();
		return await db.clear("edited-images");
	}

	async close() {
		const db = await this.getDB();
		return await db.close();
	}
}
