import { FIELD_MAPPING, type FieldKey, type BeFieldType, type FeFieldType } from "./adaptor";
export class Adapter {
  private static value: unknown;

  static from<Source>(originData: Source) {
    this.value = originData;
    return this;
  }

  static to<Input, Output>(mapperFn: (value: Input) => Output) {
    return mapperFn(this.value as Input);
  }
}

export class DataFormatAdapter<T extends Record<string, any>> {
  protected value: T;

  constructor(value: T) {
    this.value = value;
  }

  protected convertBe2Fe<K extends FieldKey>(field: K, value: BeFieldType<K>): FeFieldType<K> {
    if (!(field in FIELD_MAPPING) || !(value in FIELD_MAPPING[field])) {
      throw new Error(`Invalid field or value: field=${field}, value=${String(value)}`);
    }
    return FIELD_MAPPING[field][value];
  }

  private convertFe2Be<K extends FieldKey>(field: K, value: FeFieldType<K>): BeFieldType<K> {
    if (!(field in FIELD_MAPPING)) {
      throw new Error(`Invalid field: ${field}`);
    }
    const entry = Object.entries(FIELD_MAPPING[field]).find(([, v]) => v === value);
    if (!entry) {
      throw new Error(`Invalid frontend value for field ${field}: ${String(value)}`);
    }
    return entry[0] as BeFieldType<K>;
  }

  toFrontend(): { [K in keyof T]: K extends FieldKey ? FeFieldType<K> : T[K] } {
    const result: Partial<{ [K in keyof T]: K extends FieldKey ? FeFieldType<K> : T[K] }> = {};
    for (const [key, value] of Object.entries(this.value)) {
      if (key in FIELD_MAPPING && typeof value === "string") {
        result[key as keyof T] = this.convertBe2Fe(
          key as FieldKey,
          value as BeFieldType<FieldKey>
        ) as any;
      } else {
        result[key as keyof T] = value;
      }
    }
    return result as { [K in keyof T]: K extends FieldKey ? FeFieldType<K> : T[K] };
  }

  toBackend(): { [K in keyof T]: K extends FieldKey ? BeFieldType<K> : T[K] } {
    const result: Partial<{ [K in keyof T]: K extends FieldKey ? BeFieldType<K> : T[K] }> = {};
    for (const [key, value] of Object.entries(this.value)) {
      if (key in FIELD_MAPPING && typeof value === "string") {
        result[key as keyof T] = this.convertFe2Be(
          key as FieldKey,
          value as FeFieldType<FieldKey>
        ) as any;
      } else {
        result[key as keyof T] = value;
      }
    }
    return result as { [K in keyof T]: K extends FieldKey ? BeFieldType<K> : T[K] };
  }
}
