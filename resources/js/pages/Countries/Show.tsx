import { Country } from '@/types/types';
import { Head } from '@inertiajs/react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import CardHeader from './Components/CardHeader';

interface Props {
    country: Country;
    error?: string | null;
}

const Show = ({ country, error }: Props) => {
    return (
        <>
            <Head title={country?.name.common} />

            <div className="mx-auto max-w-[1140px] p-4">
                {/* Back button */}
                <div className="my-4">
                    <Button label="Back" icon="pi pi-arrow-left" onClick={() => window.history.back()} />
                </div>

                {error ? (
                    <div className="my-4 rounded border border-red-400 bg-red-100 p-4 text-red-700">
                        <strong>Error:</strong> {error}
                    </div>
                ) : (
                    <>
                        {/* Header: flag and name */}
                        <Card className="shadow-md">
                            <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
                                <CardHeader country={country} />
                                <div className="p-4">
                                    <h1 className="mb-2 text-3xl font-bold">{country.name.common}</h1>
                                    {country.name.official && <p className="text-gray-600">Official: {country.name.official}</p>}
                                    <p className="text-xl">{country.flag}</p>
                                </div>
                            </div>
                        </Card>
                        {/* Info grid */}
                        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                            <Card title="Basic Info">
                                <p>
                                    <strong>Capital:</strong> {country.capital?.join(', ') || 'N/A'}
                                </p>
                                <p>
                                    <strong>Region:</strong> {country.region}
                                </p>
                                <p>
                                    <strong>Subregion:</strong> {country.subregion}
                                </p>
                                <p>
                                    <strong>Population:</strong> {country.population.toLocaleString()}
                                </p>
                                <p>
                                    <strong>Area:</strong> {country.area.toLocaleString()} km²
                                </p>
                                <p>
                                    <strong>Independent:</strong> {country.independent ? 'Yes' : 'No'}
                                </p>
                                <p>
                                    <strong>UN Member:</strong> {country.unMember ? 'Yes' : 'No'}
                                </p>
                                <p>
                                    <strong>Start of Week:</strong> {country.startOfWeek}
                                </p>
                                <p>
                                    <strong>Status</strong> {country.status ?? 'N/A'}
                                </p>
                                <p>
                                    <strong>CCA3</strong> {country.cca3 ?? 'N/A'}
                                </p>
                            </Card>

                            <Card title="Languages & Currencies">
                                <p>
                                    <strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}
                                </p>
                                <p>
                                    <strong>Currencies:</strong>{' '}
                                    {country.currencies
                                        ? Object.values(country.currencies)
                                              .map((c: any) => `${c.name} (${c.symbol})`)
                                              .join(', ')
                                        : 'N/A'}
                                </p>
                                <p>
                                    <strong>Timezones:</strong> {country.timezones.join(', ')}
                                </p>
                                <p>
                                    <strong>Top-Level Domain:</strong> {country.tld?.join(', ')}
                                </p>
                                <p>
                                    <strong>ISO Codes:</strong> {country.cca2}, {country.cca3}, {country.ccn3}
                                </p>
                            </Card>

                            <Card title="Borders & Geography">
                                <p>
                                    <strong>Borders:</strong> {country.borders?.length ? country.borders.join(', ') : 'No bordering countries'}
                                </p>
                                <p>
                                    <strong>Latitude/Longitude:</strong> {country.latlng?.join(', ')}
                                </p>
                                <p>
                                    <strong>Capital Info (Lat/Lng):</strong> {country.capitalInfo?.latlng?.join(', ') || 'N/A'}
                                </p>
                                <p>
                                    <strong>Landlocked:</strong> {country.landlocked ? 'Yes' : 'No'}
                                </p>

                                <p>
                                    <strong>Area:</strong> {country.area ?? 'N/A'} km²
                                </p>
                            </Card>

                            <Card title="Maps & Flag">
                                {country.maps && (
                                    <a href={country.maps.googleMaps} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                        Google Maps
                                    </a>
                                )}
                                <br />
                                {country.maps && (
                                    <a
                                        href={country.maps.openStreetMaps}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 underline"
                                    >
                                        OpenStreetMap
                                    </a>
                                )}
                                {country.coatOfArms?.png && <img src={country.coatOfArms.svg} alt="Coat of Arms" className="mt-2 w-32" />}
                            </Card>

                            <Card title="Miscellaneous">
                                <p>
                                    <strong>Car Side:</strong> {country.car?.side}
                                </p>
                                <p>
                                    <strong>Car Signs:</strong> {country.car?.signs?.join(', ') || 'N/A'}
                                </p>
                                <p>
                                    <strong>FIFA:</strong> {country.fifa || 'N/A'}
                                </p>
                                <p>
                                    <strong>Postal Code:</strong> {country.postalCode?.format || 'N/A'}
                                </p>
                                <p>
                                    <strong>Gini:</strong>{' '}
                                    {country.gini
                                        ? (() => {
                                              const latestYear = Math.max(...Object.keys(country.gini).map(Number));
                                              return `${country.gini[latestYear.toString()]} (${latestYear})`;
                                          })()
                                        : 'N/A'}
                                </p>
                            </Card>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Show;
