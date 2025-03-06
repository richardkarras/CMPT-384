export default class extends HTMLElement {
    obtainHeaderCallback = () => `Foo`;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    async hostFirstLoadedCallback() {
        // once we set `"accessLocalFiles"` prop as `true` in the configuration file
        // a dialog would be shown when the dashboard loads and ask for premission to a specific directory
        // in this case, we should select the `my-file-root` directory in this directory
        // if the premission is granted, we can access a VGA provided `rootDirectoryHandle`
        // it is a [`FileSystemDirectoryHandle`](https://developer.mozilla.org/en-US/docs/Web/API/FileSystemDirectoryHandle)
        const directoryHandle = this.rootDirectoryHandle;
        if (!directoryHandle) return;

        // TODO 1: uncomment following block to display the file names
        // this.shadowRoot.innerHTML = "Entries: <br/>";
        // for await (const [key] of directoryHandle.entries()) {
        //     this.shadowRoot.innerHTML += `${key}<br/>`;
        // }

        // TODO 2: uncomment following block to show the content of `foo.json`
        // const fileHandle = await directoryHandle.getFileHandle("foo.json");
        // const file = await fileHandle.getFile();
        // if (!file) return;
        // this.shadowRoot.innerHTML += "<hr/>" + await file.text();

        // TODO 3: modify previous code block to show the content of `bar.txt` instead
    }
}
