import type { Request } from 'express';
import type { CreateFormDtoType } from 'src/app/zod/form.dto';
import { FormService } from '../service/form.service';
export declare class FormController {
    private readonly formService;
    constructor(formService: FormService);
    createForm(body: CreateFormDtoType, req: Request): Promise<{
        message: string;
        data: import("../../../db/entity/form.entity").Form;
    }>;
    getFormByJobId(jobId: string, req: Request): Promise<{
        message: string;
        data: import("../../../db/entity/form.entity").Form;
    }>;
    getAllForms(req: Request): Promise<{
        message: string;
        data: import("../../../db/entity/form.entity").Form[];
    }>;
    updateForm(formId: string, body: Partial<CreateFormDtoType>, req: Request): Promise<{
        message: string;
        data: import("../../../db/entity/form.entity").Form;
    }>;
    deleteForm(formId: string, req: Request): Promise<{
        message: string;
    }>;
}
