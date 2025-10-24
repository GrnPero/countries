import { Head } from '@inertiajs/react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import CardHeader from './Components/CardHeader';

interface Props {
    countries: Array<any>;
}

const Index = ({ countries }: Props) => {
    return (
        <>
            <Head title="Countries" />
            <div className="mx-auto max-w-[1140px]">
                <div className="mx-4 my-4">
                    <div className="p-inputgroup">
                        <InputText placeholder="Keyword" />
                        <Button icon="pi pi-search" />
                    </div>
                </div>
                <div className="mx-4 mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {countries.map((country) => (
                        <div className="cursor-pointer hover:brightness-90">
                            <Card key={country.cca3} title={country.name.common} header={<CardHeader country={country} />} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Index;
