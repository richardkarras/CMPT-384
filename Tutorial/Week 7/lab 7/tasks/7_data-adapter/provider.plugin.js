// in this case, we are not going to implement any UI content for the data provider
export default class extends HTMLElement {
    obtainHeaderCallback = () => `My Data Provider`;

    /** For a data provider plugin, this should be implemented and return a list of data identifiers (type of data) that can be handled by this plugin. */
    obtainDataProviderIdentifiersCallback = () => ["demo"];

    /**
     * For a data provider plugin, this should be implemented.
     * It would be called when another plugin tries to query data for data types that registered by this plugin.
     */
    queryDataCallback = async (_identifier, _dataSource, _queryObject) => {
        // in this case, no matter what the querying is, it always returns the contant value
        return [1, 2, 3, 4, 5];
    };

    // TODO 1: comment out the previous `queryDataCallback` function and uncomment the following one
    // queryDataCallback = async (identifier, dataSource, queryObject) => {
    //     // this time, we are going to make the result rely on the identifier, data source and query object
    //     // this would extract data type identifier from the original data source string
    //     return {
    //         dataTypeIdentifier: identifier,
    //         dataSource,
    //         value: [1, 2, 3, 4, 5].map((d) => d + queryObject.foo),
    //     };
    // };

    // TODO 2: comment out the previous `queryDataCallback` function and uncomment the following one
    // queryDataCallback = async (identifier, dataSource, queryObject) => {
    //     // note that the `queryDataCallback` is async
    //     // this time, we are goint to use a time killer function to simulate the time-consuming data querying
    //     // in real life, this might be a file fetching, DB querying, data calculation, etc.
    //     // you should see the result is getting back after the timeout
    //     await this.#timeKiller(2000);
    //     return {
    //         dataTypeIdentifier: identifier,
    //         dataSource,
    //         value: [1, 2, 3, 4, 5].map((d) => d + queryObject.foo),
    //     };
    // };

    // TODO 3: comment out the previous `queryDataCallback` function and uncomment the following one
    // queryDataCallback = async (identifier, dataSource, queryObject) => {
    //     // A plugin can ask the vis host to show a loading prompt by calling the VGA provided function `notifyLoadingDelegate`,
    //     // which returns a callback that can be called when the time consuming task is finished.
    //     const EndLoadingDelegate = this.notifyLoadingDelegate?.();

    //     await this.#timeKiller(2000);

    //     // we call this callback to tell the vis host that the time-consuming action is done
    //     EndLoadingDelegate?.();

    //     return {
    //         dataTypeIdentifier: identifier,
    //         dataSource,
    //         value: [1, 2, 3, 4, 5].map((d) => d + queryObject.foo),
    //     };
    // };

    /* TODO 4:
        - modify the return value of `obtainDataProviderIdentifiersCallback` from `["demo"]` to `["demo1", "demo2"]`
        - comment out the previous `queryDataCallback` function and uncomment the following one
    */
    // queryDataCallback = async (identifier, _dataSource, _queryObject) => {
    //     // in some cases, we might want to handle multipe data types in a single data provider plugin
    //     // we can use the first arugment to determine our handling logic
    //     // this time, in the data consumer prompt, you need to modify the data source accodingly
    //     switch (identifier) {
    //         case "demo1":
    //             return [1, 2, 3, 4, 5];
    //         case "demo2":
    //             return [5, 4, 3, 2, 1];
    //     }
    // };

    async #timeKiller(timeout) {
        return new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, timeout)
        );
    }
}
