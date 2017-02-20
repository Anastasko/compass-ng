import {Injectable}   from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FieldViewModel} from "../common/model/field-view-model";

@Injectable()
export class QuestionControlService {

    toFormGroup(fields: FieldViewModel[]) {
        let group: any = {};
        fields.forEach(field => {
            group[field.fieldName] = field.required
                ? new FormControl('', Validators.required)
                : new FormControl('');
        });
        return new FormGroup(group);
    }
}
