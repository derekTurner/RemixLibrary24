import { Container } from 'react-bootstrap';
import { withZod } from "@rvf/zod";
import { z } from "zod";
import { useForm, validationError, } from "@rvf/remix";
import Genre from '../models/genre';
import type { ActionFunctionArgs, } from "@remix-run/node";
import { redirect,json } from "@remix-run/node";
import { FormInput, FormSubmit } from '../components/formUI';


export const validator = withZod(
    z.object({
        name: z.string().min(1, { message: "Genre name is required" }).max(20).trim()
    })
);

async function createGenre(formData: FormData) {
    const newGenre = new Genre({
        name: formData.get('name')?.toString()
    });
    const instances = await Genre.find({ name: formData.get('name')?.toString() }, null, { limit: 1 }).exec();

    if (instances.length > 0) {
        console.log(instances);
        return {
            status: 400,
            body: 'Genre already exists'
        }
    } else {
        await newGenre.save();
    }
    return;
}


export const action = async ({
    request,
}: ActionFunctionArgs) => {
    const formData = await request.formData();
    const result = await validator.validate(formData);

    if (result.error) return validationError(result.error, result.submittedData);

    const duplicate = await createGenre(formData);
    console.log('duplicate');
    console.log(duplicate);
    if (duplicate) {
        return json({ error: duplicate.body });
    } else if (duplicate === undefined) {
        return redirect('/catalog/genres');
    }
}


const GenresForm = () => {
    const form = useForm({
        validator,
        method: "post"
    });

    return (
        <form {...form.getFormProps()} >
            <h1>Enter new genre details</h1>
            <Container>
                <FormInput label="Genre Name" name="name" form={form} />   
                <FormSubmit form={form} />
            </Container>
        </form>
    );
}


export default function NewGenre() {
    return (
        <GenresForm />
    );
}



