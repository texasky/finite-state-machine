class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if(config) {
            this.config = config;
        } else {
            throw new Error("config needed");
        }
        this.state = this.config.initial;
        this.prevState = [];
        this.nextState = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if(this.config.states[state]) {
            this.prevState.push(this.state);
            this.state = state;
            this.nextState = [];
        } else {
            throw new Error("state isn\'t exist");
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if(this.config.states[this.state].transitions[event]) {
            this.prevState.push(this.state);
            this.state = this.config.states[this.state].transitions[event];
            this.nextState = [];
        } else {
            throw new Error("event in current state isn\'t exist");
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let statesArray = Object.keys(this.config.states);
        if (event) {
            return statesArray.filter((state) => Object.keys(this.config.states[state].transitions).includes(event));
        } else {
            return statesArray;
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(this.prevState.length != 0) {
            this.nextState.push(this.state); 
            this.state = this.prevState.pop();
            return true;
        } else {
            return false;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this.nextState != 0){
            this.prevState.push(this.state);
            this.state = this.nextState.pop();
            return true;
        } else {
            return false;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.prevState = [];
        this.nextState = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
