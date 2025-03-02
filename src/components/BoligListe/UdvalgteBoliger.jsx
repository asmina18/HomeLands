import PropTypes from "prop-types";
import { BoligListe } from "./BoligListe";

/**
 * 📌 UdvalgteBoliger - Wrapper til `BoligListe`
 * - Viser en liste af udvalgte boliger baseret på de modtagne props
 * - Gør det lettere at genbruge `BoligListe` uden at gentage props
 */

export function UdvalgteBoliger({ url, title, limit, shuffle, onSelectBolig }) {
    return (
        <BoligListe
            url={url}
            title={title}
            limit={limit}
            shuffle={shuffle}
            onSelectBolig={onSelectBolig}
        />
    );
}

UdvalgteBoliger.propTypes = {
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    limit: PropTypes.number.isRequired,
    shuffle: PropTypes.bool,
    onSelectBolig: PropTypes.func.isRequired,
};
