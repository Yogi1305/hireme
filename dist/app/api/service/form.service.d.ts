import { Form } from 'src/db/entity/form.entity';
import type { CreateFormDtoType } from 'src/app/zod/form.dto';
export declare class FormService {
    createForm(dto: CreateFormDtoType, auth: {
        role?: string;
        companyId?: string;
    }): Promise<Form>;
    getFormByJobId(jobId: string, auth: {
        role?: string;
        companyId?: string;
    }): Promise<Form>;
    getAllForms(auth: {
        role?: string;
        companyId?: string;
    }): Promise<Form[]>;
    updateForm(formId: string, dto: Partial<CreateFormDtoType>, auth: {
        role?: string;
        companyId?: string;
    }): Promise<Form>;
    deleteForm(formId: string, auth: {
        role?: string;
        companyId?: string;
    }): Promise<void>;
}
