import NodeCache from "node-cache";
import { StorageDriver } from "../persistence-interface"; '../persistence-interface';
import { v4 as uuidv4 } from "uuid";

export class LocalStorage extends StorageDriver {
    constructor(driver: string, connectionString: string, testConnection: boolean = false) {
        super(driver, connectionString, testConnection);
        this.cache = new NodeCache({ deleteOnExpire: false });
    }

    cache: NodeCache;

    open(): boolean {
        if (this.cache !== undefined) {
            return true;
        } else {
            return false;
        }
    }
    close(): boolean {
        this.cache.close();
        return true;
    }
    get(id: any, type?: string) {
        const obj = this.cache.get(id);
        return obj;
    }
    /**
     * gets several ids
     * @param query in this case an array of ids since we are dealing with local storage
     * @param type not implemented for local caching
     */
    getMany(query: any, type?: string): any[] {
        const objs = this.cache.mget(query);
        var result: any[] = [];
        Object.keys(objs).forEach(key => result.push(objs[key]));
        return result;
    }
    put(obj: any, id?: any, type?: string) {
        var gid: string;
        if (typeof id !== 'undefined') {
            gid = id
        } else {
            gid = uuidv4();
        }
        if (this.cache.set(gid, obj)) {
            return gid;
        } else {
            throw Error("Could not put data");
        }
    }
    putMany(obj: any[], ids?: any[], type?: string): any[] {
        var gids = new Array<string>(obj.length);
        var objs: any = {};
        obj.forEach(function (o, i) {
            var gid: string;
            if (typeof ids !== 'undefined') {
                gid = ids[i];
            } else {
                gid = uuidv4();
            }
            gids.push(gid);
            objs[gid] = o;
        });
        this.cache.mset(objs)
        return gids
    }
    update(id: any, obj: any, type?: string): boolean {
        if (this.cache.set(id, obj)) {
            return id;
        } else {
            throw Error("Could not update data");
        }
    }
    query(query: any) {
        throw new Error("Method not implemented for local caching - come on, this is just key pairs with uuids folks.");
    }
}