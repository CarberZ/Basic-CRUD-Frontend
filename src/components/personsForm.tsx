import * as React from 'react';
import Persons from '../models/persons';
import { Input, Button } from '../common/components/form';


interface Props {
    persons: Persons;
    onChange: (fieldName: string, value: string) => void;
    onSave: () => void;
}

export const PersonsForm: React.FunctionComponent<Props> = (props) => {
    return (
        <form>
            <h1>Manage member</h1>

            <Input
                name="name"
                label="Name"
                value={props.persons.name}
                onChange={props.onChange}
            />

            <Input
                name="password"
                label="Password"
                value={props.persons.password}
                onChange={props.onChange}
            />

            <Input
                name="email"
                label="Email"
                value={props.persons.email}
                onChange={props.onChange}
            />

            <Button
                label="Save"
                className="btn btn-success"
                onClick={props.onSave}
            />
        </form>
    );
};
