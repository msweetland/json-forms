import { Question, FormType, CheckboxForm, EmailForm, NumForm, RadioForm, RangeForm, TextForm, TimeForm, Form } from './types';
export declare const hasUniqueTitles: (questions: Question[]) => Set<string>;
export declare const isFormType: (s: any) => s is FormType;
export declare const isQuestion: (object: any) => object is Question;
export declare const isCheckboxForm: (object: any) => object is CheckboxForm;
export declare const isEmailForm: (object: any) => object is EmailForm;
export declare const isNumForm: (object: any) => object is NumForm;
export declare const isRadioForm: (object: any) => object is RadioForm;
export declare const isRangeForm: (object: any) => object is RangeForm;
export declare const isTextForm: (object: any) => object is TextForm;
export declare const isTimeForm: (object: any) => object is TimeForm;
export declare const isForm: (object: any) => object is Form;
//# sourceMappingURL=typeGuards.d.ts.map