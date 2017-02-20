import {Component, Input, OnInit}  from '@angular/core';
import {FormGroup}                 from '@angular/forms';
import {QuestionControlService}    from './field-control.service';
import {Service} from "../common/service.service";
import {FieldViewModel} from "../common/model/field-view-model";

@Component({
    selector: 'dynamic-form',
    templateUrl: 'dynamic-form.component.html',
    providers: [QuestionControlService]
})
export class DynamicFormComponent implements OnInit {

    ngOnInit(): void {
        this.fields = this.service.getFields();
        this.form = this.qcs.toFormGroup(this.fields);
    }

    fields: FieldViewModel[] = [];

    @Input() service: Service<any>;

    form: FormGroup;
    payLoad = '';

    constructor(private qcs: QuestionControlService) {
    }

    render(item : any) {
        this.form.reset(item);
    }

    onSubmit() {
        this.payLoad = JSON.stringify(this.form.value);
    }

}
