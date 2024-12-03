import { Row, Col } from 'react-bootstrap';
import {useForm} from "@rvf/remix";
import { IAuthor } from '../models/author';
import { IGenre } from '../models/genre';
//import { IBook } from '~/models/book';

type MyInputProps = {
    label: string;
    name: string;
    form: ReturnType<typeof useForm>;
    defaultValue?: string;
};

type MySubmitProps = {
    form: ReturnType<typeof useForm>;
};

type MySelectProps = {
    label: string;
    name: string;
    form: ReturnType<typeof useForm>;
    data: (IAuthor[] | IGenre[] );
};


type MySelectEnumProps = {
    label: string;
    name: string;
    form: ReturnType<typeof useForm>;
    data: (string[]);
};

export const FormInput = ({ label, name, form, defaultValue }: MyInputProps) => {
    const error = name + "_error";
    return (    
        <div>
            <Row xs={2} md={4} lg={6}>
                <Col><label>{label}</label></Col>
                <Col><input {...form.getInputProps(name)} defaultValue={defaultValue} />
                {form.error(name) && (<div id={error}>{form.error(name)}</div>)}
                </Col>
            </Row>
        </div>
    );
};
export const SelectInput = ({ label, name, form, data }: MySelectProps) => {
    const error = name + "_error";
    return (
        <div>
            <Row xs={2} md={4} lg={6}>
                <Col><label>{label}</label></Col>
                <Col><select name={name} size={4} multiple {...form.getInputProps(name)} >
                    {data.map((item) => (
                        <option key={item._id} value={item._id}>{item.name}</option>
                    ))}
                </select>
                {form.error(name) && (<div id={error}>{form.error(name)}</div>)}
                </Col>
            </Row>
        </div>
    );
};

// drop down for enumerated types
export const SelectEnum = ({ label, name, form, data }: MySelectEnumProps) => {
    const error = name + "_error";
    return (
        <div>
            <Row xs={2} md={4} lg={6}>
                <Col><label>{label}</label></Col>
                <Col><select name={name} size={4} multiple {...form.getInputProps(name)} >
                    {data.map((item) => (
                        <option key={item} value={item}>{item}</option>
                    ))}
                </select>
                {form.error(name) && (<div id={error}>{form.error(name)}</div>)}
                </Col>
            </Row>
        </div>
    );
};


export const FormSubmit = ({ form }: MySubmitProps) => {
    return (
        <button type="submit" >
            {form.formState.isSubmitting ? "Submitting..." : "Submit"}
        </button>
    );
};
