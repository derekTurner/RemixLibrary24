// https://remix.run/docs/en/main/guides/data-writes
// https://www.remix-validated-form.io/integrate-your-components
//https://remix.run/docs/en/main/guides/data-writes
//https://www.rvf-js.io/input-types


import { Container } from 'react-bootstrap';
import { withZod } from "@rvf/zod";
import { z } from "zod";
import { useForm, validationError, } from "@rvf/remix";

import Author from '../models/author';
import type { ActionFunctionArgs, } from "@remix-run/node";
import { redirect, } from "@remix-run/node";
import { FormInput, FormSubmit } from '../components/formUI';

const validator = withZod(
    z.object({
        first_name: z.string().min(1, { message: "First name is required" }).max(100).trim(),
        family_name: z.string().min(1, { message: "Last name is required" }).max(100).trim(),
        date_of_birth: z.coerce.date({
            required_error: "Date is required.",
            invalid_type_error: "Wrong date format.",
        }),
        date_of_death: z.union([
            z.string().length(0, { message: "Enter numeric date" }).nullable(),
            z.coerce.date({
                invalid_type_error: "Wrong date format.",
            })
        ]).or(z.undefined()).optional(),
    })
);

async function createAuthor(formData: FormData) {
    const newAuthor = new Author({
        first_name: formData.get('first_name'),
        family_name: formData.get('family_name'),
        date_of_birth: formData.get('date_of_birth'),
        date_of_death: formData.get('date_of_death'),
    });
    await newAuthor.save();
    return;
}


export const action = async ({
    request,
}: ActionFunctionArgs) => {
    const formData = await request.formData();
    const data = await validator.validate(formData);
    console.log(data.error);
    console.log(data.submittedData);
    if (data.error) return validationError(data.error, data.submittedData);
    await createAuthor(formData);
    return redirect('/catalog/authors');
};


const AuthorsForm = () => {
    const form = useForm({
        validator,
        method: "post"
    });

    return (
        <form {...form.getFormProps()} >
            <h1>Enter new author details</h1>
            <Container>
                <FormInput label="First Name" name="first_name" form={form} />
                <FormInput label="Last Name" name="family_name" form={form} />
                <FormInput label="Date of Birth" name="date_of_birth" form={form} />
                <FormInput label="Date of Death" name="date_of_death" form={form} />    
                <FormSubmit form={form} />
            </Container>
        </form>
    );
}


export default function NewAuthor() {
    return (
        <AuthorsForm />
    );
}




