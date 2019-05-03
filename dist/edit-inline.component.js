var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output } from '@angular/core';
var NgxEditInlineComponent = /** @class */ (function () {
    function NgxEditInlineComponent() {
        this.type = 'text';
        this.onValueChanged = new EventEmitter();
        this.editMode = false;
    }
    NgxEditInlineComponent.prototype.ngOnInit = function () { };
    NgxEditInlineComponent.prototype.onFocusOut = function () {
        this.onValueChanged.emit(this.value);
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NgxEditInlineComponent.prototype, "type", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NgxEditInlineComponent.prototype, "value", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], NgxEditInlineComponent.prototype, "onValueChanged", void 0);
    NgxEditInlineComponent = __decorate([
        Component({
            selector: 'ngx-edit-inline',
            templateUrl: './edit-inline.component.html',
            styleUrls: ['./edit-inline.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], NgxEditInlineComponent);
    return NgxEditInlineComponent;
}());
export { NgxEditInlineComponent };
//# sourceMappingURL=edit-inline.component.js.map