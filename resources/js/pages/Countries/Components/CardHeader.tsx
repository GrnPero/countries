interface Props {
    country: any;
}

const CardHeader = ({ country }: Props) => {
    return (
        <div className="p-4">
            <img alt={country.name.common} src={country.flags.png} className="h-40 w-full object-cover" />
        </div>
    );
};

export default CardHeader;
