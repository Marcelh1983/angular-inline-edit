import { EventEmitter, OnInit } from '@angular/core';
export declare class EditInputComponent implements OnInit {
    type: string;
    value: string | number;
    onValueChanged: EventEmitter<number | string>;
    editMode: boolean;
    constructor();
    ngOnInit(): void;
    onFocusOut(): void;
}
