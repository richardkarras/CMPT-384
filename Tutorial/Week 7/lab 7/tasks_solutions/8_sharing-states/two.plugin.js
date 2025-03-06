export default class extends HTMLElement {
    // TODO 1: uncomment below block to track the change of states
    set sharedStates(value) {
        this.#renderUI(value);
    }

    obtainHeaderCallback = () => `Two`;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    hostFirstLoadedCallback() {
        this.#renderUI(this.sharedStates);
    }

    // we want to use the state from this plugin as well
    // this should not just work properly because it would not automatically update
    // unless we recall this function when the state is changed
    #renderUI(states) {
        // this is to get the attached shadow root in the constructor
        const container = this.shadowRoot;

        // container.textContent = `The state value of "demo.value" is ${
        //     states?.["demo.value"]
        // }`;

        // we can specify any state keys
        // now we can specify a new state "demo.value2"
        // TODO 2: comment above `textContent assignment and uncomment the below block`
        container.innerHTML = /* html */ `
        The state value of "demo.value" is ${states?.["demo.value"]}
        <br/>
        The state value of "demo.value2" is ${states?.["demo.value2"]}
        <br/>
        <button>Update "demo.value2"</button>
        `;
        container.querySelector("button").addEventListener("click", () => {
            const value = prompt(
                'Enter the value to be updated for "demo.value2"',
                "foo",
            );
            this.updateSharedStatesDelegate?.({
                ...states,
                "demo.value2": value,
            });
        });

        // TODO 3: go to `one.plugin.js`, try to display the state of "demo.value2"
        // note that the `sharedStates` setter in  `one.plugin.js` should captrue this one as well
        // so we just need to access and display it in the `#renderUI` method
    }
}
