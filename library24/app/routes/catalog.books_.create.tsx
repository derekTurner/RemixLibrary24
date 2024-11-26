//https://www.remix-validated-form.io/repeated-field-names
//https://www.npmjs.com/package/zod-form-data/v/1.2.0

import { FormInput, SelectInput, FormSubmit } from '../components/formUI';
import { withZod } from "@rvf/zod";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { useForm, validationError, } from "@rvf/remix";
import type { ActionFunctionArgs, } from "@remix-run/node";//
import { redirect, json } from "@remix-run/node";
import Author, { IAuthor } from '../models/author';
import Genre, { IGenre } from '../models/genre';
import Book from '../models/book';
import { Container } from 'react-bootstrap';
import { useLoaderData } from "@remix-run/react";


export const loader: unknown = async () => {

    const authors = await Author.find({}, null, { virtuals: true })
        .sort([['family_name', 'ascending']])
        .exec();

    if (!authors) {
        throw new Response("Not Found", { status: 404 });
    }

    const genres = await Genre.find({}, null, { virtuals: true })
        .sort([['name', 'ascending']])
        .exec();

    if (!genres) {
        throw new Response("Not Found", { status: 404 });
    }

    return json({ authors, genres });
};

export const validator = withZod(
    z.object({
        title: z.string().min(1, { message: "Title is required" }).max(40).trim(),
        authors: zfd.repeatable(z.array(zfd.text()).min(1, { message: "Author selection is required" })),
        summary: z.string().min(1, { message: "Summary is required" }).max(1000).trim(),
        isbn: z.string().min(1, { message: "ISBN is required" }).max(13).trim(),
        genres: zfd.repeatable(z.array(zfd.text()).min(1, { message: "Genre selection is required" }))
    })
);


async function createBook(formData: FormData) {
    const newBook = new Book({
        title: formData.get('title'),
        authors: formData.getAll('authors'),
        summary: formData.get('summary'),
        isbn: formData.get('isbn'),
        genres: formData.getAll('genres'),
    });
    await newBook.save();
    return;
}


export const action = async ({
    request,
}: ActionFunctionArgs) => {
    const formData = await request.formData();
    console.log("submitted book details")
    console.log(formData.get('title'));
    console.log(formData.getAll('authors'));
    console.log(formData.get('summary'));
    console.log(formData.get('isbn'));
    console.log(formData.getAll('genres'));
    const result = await validator.validate(formData);

    if (result.error) return validationError(result.error, result.submittedData);

    await createBook(formData);
    return redirect('/catalog/books');

};

const BooksForm = () => {
    const data = useLoaderData() as { authors: IAuthor[], genres: IGenre[] };
    const form = useForm({ validator, method: "post" });
    return (
        <form {...form.getFormProps()} >

            <h1>Enter new book details</h1>
            <Container>
                <FormInput   name="title"   label="Book Title" form={form} />
                <SelectInput name="authors" label="Authors"    form={form} data={data.authors} /> 
                <FormInput   name="summary" label="Summary"    form={form} />
                <FormInput   name="isbn"    label="ISBN"       form={form} />
                <SelectInput name="genres"  label="Genres"     form={form} data={data.genres} />
                <FormSubmit form={form} />
            </Container>
        </form>
    );
}

export default function NewBook() {
    return (
        <BooksForm />
    );
}