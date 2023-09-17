export declare class Html {
    elm: HTMLInputElement | HTMLElement;
    constructor(e: string);
    text(val: string): this;
    html(val: string): this;
    cleanup(): void;
    query(selector: any): any;
    class(...val: string[]): this;
    classOn(...val: string[]): this;
    classOff(...val: string[]): this;
    style(obj: {
        [x: string]: string | null;
    }): this;
    on(ev: string, cb: EventListenerOrEventListenerObject): this;
    un(ev: string, cb: EventListenerOrEventListenerObject): this;
    appendTo(parent: HTMLElement | Html | string): this;
    append(elem: string | HTMLElement | Html): Html;
    appendMany(...elements: any[]): this;
    clear(): this;
    attr(obj: {
        [x: string]: string;
    }): this;
    val(str: any): void;
}
