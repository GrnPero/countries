import { Country } from '@/types/types';
import { Head, router } from '@inertiajs/react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { ChangeEvent, useEffect, useState } from 'react';
import { route } from 'ziggy-js';
import CardHeader from './Components/CardHeader';

interface Props {
    countries: Country[];
    error?: string | null;
}

const Index = ({ countries, error }: Props) => {
    const [searchTerm, setSearchTerm] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (countries && countries.length > 0) {
            setLoading(false);
        }
    }, [countries]);

    const handleSearch = () => {
        setLoading(true);

        router.get(route('countries'), { search: searchTerm }, { preserveState: true, onFinish: () => setLoading(false) });
    };

    const handleCountryClick = (cca3: string) => {
        setLoading(true);

        router.get(route('countries.show', cca3), {}, { onFinish: () => setLoading(false) });
    };

    return (
        <>
            <Head title="Countries" />
            <div className="mx-auto max-w-[1140px]">
                {/* Web App Logo */}
                <div className="my-8 flex cursor-pointer justify-center" onClick={() => router.visit(route('countries'))}>
                    <h3 className="text-4xl font-bold">Countries App</h3>
                </div>

                {/* Search bar */}
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

                {/* Countries grid */}
                {loading && !error ? (
                    <div className="flex h-[50vh] items-center justify-center">
                        <ProgressSpinner />
                    </div>
                ) : error ? (
                    <div className="mx-4 mt-6 rounded-lg bg-red-100 p-4 text-center text-red-700 shadow">{error}</div>
                ) : (
                    <div className="mx-4 mt-12">
                        {countries.length === 0 ? (
                            <p className="mt-10 text-center text-lg text-gray-500">No countries found.</p>
                        ) : (
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                                {countries.map((country: Country) => (
                                    <Card
                                        className="cursor-pointer hover:brightness-90"
                                        onClick={() => handleCountryClick(country.cca3)}
                                        key={country.cca3}
                                        title={country.name.common}
                                        header={<CardHeader country={country} />}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default Index;
