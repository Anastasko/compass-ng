export class FieldViewModel {

  id: number;
  fieldKind: string;
  fieldType: {
    id: number,
    typeName: string,
    typeKind: string,
    primitiveEntityType?: string
  };
  fieldName: string;
  label: string;
  order: number;
  required: boolean;
  prefixPath: string;

  constructor(options: any) {
    this.id = options.id;
    this.fieldKind = options.fieldKind;
    this.fieldType = {
      id: options.fieldType.id,
      typeName: options.fieldType.typeName,
      typeKind: options.fieldType.typeKind,
      primitiveEntityType: options.fieldType.primitiveEntityType,
    };
    this.fieldName = options.fieldName;
    this.label = options.label;
    this.order = options.order;
    this.prefixPath = options.prefixPath;
  }

}
