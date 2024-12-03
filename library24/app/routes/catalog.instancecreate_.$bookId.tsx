//https://www.remix-validated-form.io/repeated-field-names
//https://www.npmjs.com/package/zod-form-data/v/1.2.0

import type { LoaderFunctionArgs } from "@remix-run/node";
import { FormInput, SelectInput, SelectEnum, FormSubmit } from '../components/formUI';
import invariant from "tiny-invariant";
import { withZod } from "@rvf/zod";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { useForm, validationError, } from "@rvf/remix";
import type { ActionFunctionArgs, } from "@remix-run/node";//
import { redirect} from "@remix-run/node";
import Book, { IBook } from '../models/book';
import BookInstance, { IBookInstance } from '../models/bookinstance';
import { Container } from 'react-bootstrap';
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { DateTime } from 'luxon';

const statusOptions = z.enum(["Available", "Maintenance", "Loaned", "Reserved"]);


export const loader: unknown = async ({
    params,
  }: LoaderFunctionArgs) => {
    invariant(params.bookId, "Missing contactId param");
    //console.log(params.bookId);
    const [bookData] = await Promise.all([
      Book.findById(params.bookId).populate('authors').populate('genres').exec()
    ]);
  
    if (!bookData) {
      throw new Response("Not Found", { status: 404 });
    }
    return json({ bookData });
  };

export const validator = withZod(
   
    z.object({
        book: z.string().min(1, { message: "Book ID is required" }).max(40).trim(),
        imprint: z.string().min(1, { message: "Imprint detail is required" }).max(40).trim(),
        status: statusOptions,    
        due_back: z.coerce.date().default(() => new Date())
    })
);

async function createInstance(formData: FormData) {
    const newInstance = new BookInstance({
        book: formData.get('book'),
        imprint: formData.get('imprint'),
        status: formData.get('status'),
        due_back: formData.get('due_back'),
    });
    console.log("trying to save");
    await newInstance.save();
    return;
}




export const action = async ({
    request,
}: ActionFunctionArgs) => {
    const formData = await request.formData();
    console.log("submitted book details")
    console.log(formData.get('bookId'));
    console.log(formData.getAll('imprint'));
    console.log(formData.get('status'));
    console.log(formData.get('due_back'));
    const result = await validator.validate(formData);

    if (result.error) return validationError(result.error, result.submittedData);

    await createInstance(formData);
    console.log('/catalog/books/' + formData.get('book'));
    return redirect('/catalog/books/' + formData.get('book'));// redisplay book details

};

const InstanceForm = () => {
    const data = useLoaderData() as { bookData: IBook };
    const form = useForm({ validator, method: "post" });
    return (
        <form {...form.getFormProps()} >

            <h1>Enter new book instance details</h1>
            <Container>
                <FormInput   name="book"     label="BookID"     form={form} defaultValue={data.bookData._id}   />
                <FormInput   name="imprint"  label="Imprint"    form={form} defaultValue={""} /> 
                <SelectEnum  name="status"   label="Status"     form={form} data={statusOptions.options as string[]} />
                <FormInput   name="due_back" label="Due Back"   form={form} defaultValue={new Date().toLocaleDateString()}/>
                <FormSubmit  form={form} />
            </Container>
        </form>
    );
}

export default function NewInstance() {   
    console.log("newInstance"); 
    return (
        <InstanceForm />
    );
}
