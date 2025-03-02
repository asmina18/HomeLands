import { useParams } from "react-router-dom";
import { BoligListe } from "../../components/BoligListe/BoligListe";
import { BoligDetails } from "../../components/BoligListe/BoligDetails/BoligDetails";

export function BoligTilSalgPage() {
    const { id } = useParams();

    return id ? (
        <BoligDetails boligId={parseInt(id)} />
    ) : (
        <BoligListe
            url="https://api.mediehuset.net/homelands/homes"
            title="Boliger til salg"
            limit={9}
        />
    );
}
