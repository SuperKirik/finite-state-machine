class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.curState = config.initial;
        this.states = config.states;
        this.prevStates = [];
        this.undos = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.curState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (this.states[state] !== undefined) {
            this.prevStates.push(this.curState);
            this.curState = state;
            if (this.undos.length !== 0)
                this.undos.length = 0;
        } else
            throw new Error();
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        var newState = this.states[this.curState].transitions[event];
        if (newState !== undefined) {
            this.prevStates.push(this.curState);
            this.curState = newState;
            if (this.undos.length !== 0)
                this.undos.length = 0;
        } else
            throw new Error();
    }

    /**
     * Resets FSM state to initial.**************************
     */
    reset() {
        this.curState = 'normal';
        this.prevStates = [];
        this.undos = [];
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        var states = [];
        if (event !== undefined) {
            for (var key in this.states) {
                if (this.states[key].transitions[event] !== undefined)
                    states.push(key);
            }
        } else {
            for (var key in this.states)
                states.push(key);
        }

        return states;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.prevStates.length != 0) {
            this.undos.push(this.curState);
            this.curState = this.prevStates.pop();
            return true;
        } else
            return false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.undos.length != 0) {
            this.prevStates.push(this.curState);
            this.curState = this.undos.pop();
            return true;
        } else
            return false;

    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.prevStates.length = 0;
        this.undos.length = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
