export class Debugger {

    static shared: Debugger = (() => {
        let globalObject: any = global || window;
        let instance = globalObject["__ts_debugger_instance"] || new Debugger
        globalObject["__ts_debugger_instance"] = instance
        return instance
    })()

    on(event: "breakpoint", listenner: (...args: any[]) => void) {
        if (this._eventListenners[event] === undefined) {
            this._eventListenners[event] = []
        }
        this._eventListenners[event].push(listenner)
    }

    resume() {
        if (this._breakpointResolver) { this._breakpointResolver() }
        this._breakpointResolver = undefined
    }

    setBreakpoint(file: string, line: number) {
        if (this._breakpoints[file] === undefined) {
            this._breakpoints[file] = {}
        }
        this._breakpoints[file][line] = true
    }

    activeBreakpoint(file: string, line: number) {
        if (this._breakpoints[file]) {
            this._breakpoints[file][line] = true
        }
    }

    deactiveBreakpoint(file: string, line: number) {
        if (this._breakpoints[file]) {
            this._breakpoints[file][line] = false
        }
    }

    // internal methods

    private _eventListenners: { [key: string]: ((...args: any[]) => void)[] } = {}
    private _breakpoints: { [key: string]: { [key: number]: boolean } } = {}
    private _breakpointResolver: (() => void) | undefined = undefined
    private _preventBreakpoint = false

    private _enter() {

    }

    private _exit() {

    }

    private _step(file: string, line: number, column: number) {
        if (!this._preventBreakpoint && this._breakpoints[file] && this._breakpoints[file][line] === true && this._eventListenners["breakpoint"]) {
            return new Promise((resolver) => {
                this._preventBreakpoint = true
                if (this._breakpointResolver) { this._breakpointResolver() }
                this._preventBreakpoint = false
                this._breakpointResolver = resolver
                this._eventListenners["breakpoint"].forEach(it => it(file, line, column))
            })
        }
    }

}