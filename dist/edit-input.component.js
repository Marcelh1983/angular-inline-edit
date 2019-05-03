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
var EditInputComponent = /** @class */ (function () {
    function EditInputComponent() {
        this.type = 'text';
        this.onValueChanged = new EventEmitter();
        this.editMode = false;
    }
    EditInputComponent.prototype.ngOnInit = function () { };
    EditInputComponent.prototype.onFocusOut = function () {
        this.onValueChanged.emit(this.value);
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], EditInputComponent.prototype, "type", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], EditInputComponent.prototype, "value", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], EditInputComponent.prototype, "onValueChanged", void 0);
    EditInputComponent = __decorate([
        Component({
            selector: 'edit-input',
            templateUrl: './edit-input.component.html',
            styleUrls: ['./edit-input.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], EditInputComponent);
    return EditInputComponent;
}());
export { EditInputComponent };
//# sourceMappingURL=edit-input.component.js.map