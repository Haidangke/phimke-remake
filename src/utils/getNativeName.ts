import { Countries } from 'models/configuration';

export default function getNativeName(
    iso_3166_1: string | null,
    countries: Countries[],
    type?: string
) {
    if (!iso_3166_1) return 'No Language';
    return countries.filter((x) => x.iso_3166_1 === iso_3166_1)[0]?.native_name;
}
