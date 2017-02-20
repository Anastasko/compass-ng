import {Component, Input} from '@angular/core';
import {FormGroup}        from '@angular/forms';
import {FieldViewModel} from "../common/model/field-view-model";

@Component({
    selector: 'df-field',
    templateUrl: 'dynamic-form-field.component.html'
})
export class DynamicFormFieldComponent {

    @Input() field: FieldViewModel;
    @Input() form: FormGroup;

    get isValid() {
        return this.form.controls[this.field.fieldName].valid;
    }


}
