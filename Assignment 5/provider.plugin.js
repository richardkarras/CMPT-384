// in this case, we are not going to implement any UI content for the data provider
export default class extends HTMLElement {
    obtainHeaderCallback = () => `My Data Provider`;

    obtainDataProviderIdentifiersCallback = () => ["geojson"];

    queryDataCallback = async (_identifier, dataSource, _queryObject) => {
        const EndLoadingDelegate = this.notifyLoadingDelegate?.();

        const directoryHandle = this.rootDirectoryHandle;
        if (!directoryHandle) return;

        const fileHandle = await directoryHandle.getFileHandle(dataSource);
        const file = await fileHandle.getFile();
        if (!file) return;
        const geojson = JSON.parse(await file.text());

        EndLoadingDelegate?.();
        return geojson;
    };
}
