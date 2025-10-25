import { Head, router } from '@inertiajs/react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { ChangeEvent, useState } from 'react';
import CardHeader from './Components/CardHeader';

interface Props {
    countries: Array<any>;
}

const Index = ({ countries }: Props) => {
    const [searchTerm, setSearchTerm] = useState<string | null>(null);

    const handleSearch = () => {
        router.get('/', { search: searchTerm }, { preserveState: true });
    };

    const handleCountryClick = (cca3: string) => {
        router.get(`/countries/${cca3}`);
    };

    return (
        <>
            <Head title="Countries" />
            <div className="mx-auto max-w-[1140px]">
                {/* Web App Logo */}
                <div className="my-8 flex cursor-pointer justify-center" onClick={() => router.visit('/')}>
                    <h3 className="text-4xl font-bold">Countries App</h3>
                </div>

                <div className="mx-4 my-4">
                    <div className="p-inputgroup">
                        <InputText
                            placeholder="Search countries..."
                            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                if (e.key === 'Enter') {
                                    handleSearch();
                                }
                            }}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                        />
                        <Button icon="pi pi-search" onClick={handleSearch} />
                    </div>
                </div>
                <div className="mx-4 mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {countries.map((country) => (
                        <Card
                            className="cursor-pointer hover:brightness-90"
                            onClick={() => handleCountryClick(country.cca3)}
                            key={country.cca3}
                            title={country.name.common}
                            header={<CardHeader country={country} />}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Index;
