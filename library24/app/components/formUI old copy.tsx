
import { Row, Col } from 'react-bootstrap';
import { UseField} from "@rvf/remix";
// import { IAuthor } from '../models/author';
// import { IGenre } from '../models/genre';


{/* 
type MyInputProps = {
    name: string;
    errorName: string;
    label: string;
    form: UseFormReturn<Record<string, unknown>, unknown>;
};


type MySelectProps = {
    name: string;
    label: string;
    data: (IAuthor[] | IGenre[]);
};


type MyButtonProps = {
    description: string;
    sub: string;
    form: UseFormReturn<Record<string, unknown>, unknown>;
};
*/}

export const FormInput = ( inputProps : FormApi<FieldValues>) => {
    return (
        <div>
            <Row xs={2} md={4} lg={6}>
                <Col><label htmlFor={inputProps.name}>{inputProps.label}</label></Col>
                <Col><input {...inputProps} />
                    {inputProps.error && (<span id={inputProps.errorName}>{inputProps.error}</span>)}
                </Col>
            </Row>
        </div>
    );
};





{/* 
export const SelectInput = ({ name, label, data }: MySelectProps) => {
    // const actionData = useActionData<ValidationErrorResponseData>();
    const { error, getInputProps } = useField(name);
    //console.log(actionData);

    return (
        <div>
            <Row xs={2} md={4} lg={6}>
                <Col><label htmlFor={name}>{label}</label></Col>
                <Col><select name={name} className="card-text" multiple
                    {...getInputProps({ id: name })}
                    defaultValue={[]}>
                    {data.map((dt) => (
                        <option key={dt._id} value={dt._id}>{dt.name}</option>
                    ))}
                </select>
                    {error && (
                        <span className="my-error-class">{error}</span>
                    )}
                </Col>
            </Row>
        </div>
    );
};
*/ }

export const SubmitButton = ({ description, sub, form }: MyButtonProps) => {
    return (
        <button type="submit">
             {form.formState.isSubmitting ? sub : description}
        </button>
    );
};


{/*}
import { useActionData } from "@remix-run/react";
import { FormApi } from '@rvf/remix';

export const Alert = () => {
    const actionData = useActionData<{ error?: string }>();

    if (actionData?.error) {
        return <div className="alert alert-danger">{actionData.error}</div>;
    }
    return null;
}   ;

*/}