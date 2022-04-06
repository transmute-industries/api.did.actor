export abstract class StorageDriver {
    driver: String;
    connectionString: String;

    /**
     * Sets up a generic storage driver
     * @param driver the name of the driver or database identifier in use
     * @param connectionString the actual connection string to the database
     */
    constructor(driver: string, connectionString: string, testConnection: boolean = false) {
        this.driver = driver;
        this.connectionString = connectionString;
        if (testConnection) {
            this.open()
        }
    }

    /**
     * Opens up the connection to the db
     * depending on implementation this may be optional
     * @throws {Error}
     * @returns true on suceess
     */
    abstract open(): boolean | never;

    /**
     * Explicitly closes the connection to the db
     * Depending on implementation this may be optional
     * @throws {Error}
     * @returns true on suceess
     */
    abstract close(): boolean | never;

    /**
     * Gets an object from the storage driver
     * @throws {Error}
     * @param id the ID for the element to get
     * @param type the collection or table to query to/from if applicable
     * @returns the object requested
     */
    abstract get(id: any, type?: string): any | never;

    /**
     * Gets one or more (or no) objects from the storage driver
     * @throws {Error}
     * @param query the query for the element(s) to get
     * @param type the collection or table to query to/from if applicable
     * @returns the object requested
     */
    abstract getMany(query: any, type?: string): any[] | never;

    /**
     * Puts an object into the storage driver
     * @throws {Error}
     * @param obj the opbect to put in the db
     * @param type the collection or table to query to/from if applicable
     * @returns the id of the object
     */
    abstract put(obj: any, type?: string): any | never;

    /**
     * Puts one or more objects into the storage driver
     * @throws {Error}
     * @param obj the opbect to put in the db
     * @param type the collection or table to query to/from if applicable
     * @returns an array of the object ids as inserted
     */
    abstract putMany(obj: [any], type?: string): any[] | never;

    /**
     * Updates data in the storage driver
     * @param id the ID of the object to update
     * @param obj the ne value to put into the db over the top of the old
     * @param type the collection or table to query to/from if applicable
     * @returns true on suceess
     */
    abstract update(id: any, obj: any, type?: string): boolean | never;

    /**
     * Execute an abitrary query on the storage driver
     * @throws {Error}
     * @param query the query to execute, likely a string, but perhaps an object
     * @returns the object or return as appropriate to the query
     */
    abstract query(query: any): any | never;
}