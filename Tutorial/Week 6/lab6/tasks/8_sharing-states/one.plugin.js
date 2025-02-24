export default class extends HTMLElement {
    // each time a state is changed, the VGA provided `sharedStates` prop would be updated
    // here we implement a prop with getter and setter and use the setter to catch changes of the prop
    #sharedStates;
    get sharedStates() {
        return this.#sharedStates;
    }
    set sharedStates(value) {
        this.#sharedStates = value;
        // when the state is changed, we call `renderUI` again
        this.#renderUI();
    }

    obtainHeaderCallback = () => `One`;

    hostFirstLoadedCallback() {
        this.#renderUI();
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    // note that we specify a state with key of "demo.value"
    // we should update and comsume using the same key
    #renderUI() {
        // `this.shadowRoot` is to get the attached shadow root in the constructor
        this.shadowRoot.innerHTML = /* html */ `
            <span>
                The shared value is: 
                <b>${this.sharedStates["demo.value"]}</b>
            </span>
            <hr/>
            <input type="text" placeholder="enter anything here..." />
            <br/>
            <button>Upate shared value</button>
        `;
        this.shadowRoot.querySelector("button")?.addEventListener(
            "click",
            () => {
                const value = this.shadowRoot.querySelector("input")?.value;
                // we can use the VGA provided `updateSharedStatesDelegate` to update the state
                // note that we should use a copy of the original object
                this.updateSharedStatesDelegate?.({
                    ...this.sharedStates,
                    "demo.value": value,
                });
            },
        );
    }
}
