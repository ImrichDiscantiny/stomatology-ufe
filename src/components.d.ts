/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { AppointmentListEntry } from "./api/stomatology-al";
export { AppointmentListEntry } from "./api/stomatology-al";
export namespace Components {
    interface IdAlistColumn {
        "appointmentsList": AppointmentListEntry[];
        "name": string;
        "weekDay": Date;
    }
    interface IdAppointmentBox {
        "appointment": AppointmentListEntry;
        "updating": boolean;
    }
    interface IdAppointmentsList {
        "selectedDay": Date | null;
    }
    interface IdAppointmentsPage {
        "apiBase": string;
    }
    interface IdCalendarSearch {
        "apiBase": string;
    }
    interface IdInformationBox {
        "dropdown": boolean;
        "information": string;
        "teeths": string[];
    }
}
export interface IdAppointmentBoxCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLIdAppointmentBoxElement;
}
declare global {
    interface HTMLIdAlistColumnElement extends Components.IdAlistColumn, HTMLStencilElement {
    }
    var HTMLIdAlistColumnElement: {
        prototype: HTMLIdAlistColumnElement;
        new (): HTMLIdAlistColumnElement;
    };
    interface HTMLIdAppointmentBoxElementEventMap {
        "cancelEvent": String;
    }
    interface HTMLIdAppointmentBoxElement extends Components.IdAppointmentBox, HTMLStencilElement {
        addEventListener<K extends keyof HTMLIdAppointmentBoxElementEventMap>(type: K, listener: (this: HTMLIdAppointmentBoxElement, ev: IdAppointmentBoxCustomEvent<HTMLIdAppointmentBoxElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLIdAppointmentBoxElementEventMap>(type: K, listener: (this: HTMLIdAppointmentBoxElement, ev: IdAppointmentBoxCustomEvent<HTMLIdAppointmentBoxElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLIdAppointmentBoxElement: {
        prototype: HTMLIdAppointmentBoxElement;
        new (): HTMLIdAppointmentBoxElement;
    };
    interface HTMLIdAppointmentsListElement extends Components.IdAppointmentsList, HTMLStencilElement {
    }
    var HTMLIdAppointmentsListElement: {
        prototype: HTMLIdAppointmentsListElement;
        new (): HTMLIdAppointmentsListElement;
    };
    interface HTMLIdAppointmentsPageElement extends Components.IdAppointmentsPage, HTMLStencilElement {
    }
    var HTMLIdAppointmentsPageElement: {
        prototype: HTMLIdAppointmentsPageElement;
        new (): HTMLIdAppointmentsPageElement;
    };
    interface HTMLIdCalendarSearchElement extends Components.IdCalendarSearch, HTMLStencilElement {
    }
    var HTMLIdCalendarSearchElement: {
        prototype: HTMLIdCalendarSearchElement;
        new (): HTMLIdCalendarSearchElement;
    };
    interface HTMLIdInformationBoxElement extends Components.IdInformationBox, HTMLStencilElement {
    }
    var HTMLIdInformationBoxElement: {
        prototype: HTMLIdInformationBoxElement;
        new (): HTMLIdInformationBoxElement;
    };
    interface HTMLElementTagNameMap {
        "id-alist-column": HTMLIdAlistColumnElement;
        "id-appointment-box": HTMLIdAppointmentBoxElement;
        "id-appointments-list": HTMLIdAppointmentsListElement;
        "id-appointments-page": HTMLIdAppointmentsPageElement;
        "id-calendar-search": HTMLIdCalendarSearchElement;
        "id-information-box": HTMLIdInformationBoxElement;
    }
}
declare namespace LocalJSX {
    interface IdAlistColumn {
        "appointmentsList"?: AppointmentListEntry[];
        "name"?: string;
        "weekDay"?: Date;
    }
    interface IdAppointmentBox {
        "appointment"?: AppointmentListEntry;
        "onCancelEvent"?: (event: IdAppointmentBoxCustomEvent<String>) => void;
        "updating"?: boolean;
    }
    interface IdAppointmentsList {
        "selectedDay"?: Date | null;
    }
    interface IdAppointmentsPage {
        "apiBase"?: string;
    }
    interface IdCalendarSearch {
        "apiBase"?: string;
    }
    interface IdInformationBox {
        "dropdown"?: boolean;
        "information"?: string;
        "teeths"?: string[];
    }
    interface IntrinsicElements {
        "id-alist-column": IdAlistColumn;
        "id-appointment-box": IdAppointmentBox;
        "id-appointments-list": IdAppointmentsList;
        "id-appointments-page": IdAppointmentsPage;
        "id-calendar-search": IdCalendarSearch;
        "id-information-box": IdInformationBox;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "id-alist-column": LocalJSX.IdAlistColumn & JSXBase.HTMLAttributes<HTMLIdAlistColumnElement>;
            "id-appointment-box": LocalJSX.IdAppointmentBox & JSXBase.HTMLAttributes<HTMLIdAppointmentBoxElement>;
            "id-appointments-list": LocalJSX.IdAppointmentsList & JSXBase.HTMLAttributes<HTMLIdAppointmentsListElement>;
            "id-appointments-page": LocalJSX.IdAppointmentsPage & JSXBase.HTMLAttributes<HTMLIdAppointmentsPageElement>;
            "id-calendar-search": LocalJSX.IdCalendarSearch & JSXBase.HTMLAttributes<HTMLIdCalendarSearchElement>;
            "id-information-box": LocalJSX.IdInformationBox & JSXBase.HTMLAttributes<HTMLIdInformationBoxElement>;
        }
    }
}
