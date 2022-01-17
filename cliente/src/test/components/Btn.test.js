import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import {faFileExport} from '@fortawesome/free-solid-svg-icons';
import { MemoryRouter } from 'react-router-dom';
import { Btn } from '../../components/Btn';

test('renders content', () => {
    const titulo='Reportes';
    const icono=faFileExport;
    const size=true;
    const redirect='/reportes';
    const onpress=()=>{};
    const disable=false;
    const component=render(
        <MemoryRouter>
            <Btn titulo={titulo} icono={icono} size={size} redirect={redirect} onpress={onpress} disable={disable}/>
        </MemoryRouter>
    );
    component.getByText("Reportes");
    // console.log(component);
})
