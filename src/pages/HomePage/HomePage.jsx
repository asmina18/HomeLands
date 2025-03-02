
import { Anmeldelser } from '../../components/Anmeldelse/Anmeldelser'
import { UdvalgteBoliger } from "../../components/BoligListe/UdvalgteBoliger"
import { MedarbejderListe } from '../../components/MedarbejderListe/MedarbejderListe'
import { BoligDetails } from '../../components/BoligListe/BoligDetails/BoligDetails'
import { useState } from 'react'



export const HomePage = () => {

  const [selectedBoligId, setSelectedBoligId] = useState(null);

  return (
    <>
    {selectedBoligId ? (
        <>
          <button onClick={() => setSelectedBoligId(null)}>Tilbage</button>
          <BoligDetails boligId={selectedBoligId} />
        </>
      ) : (
        <>
      <UdvalgteBoliger url="https://api.mediehuset.net/homelands/homes" title="Udvalgte boliger" limit={3} shuffle={true}  onSelectBolig={setSelectedBoligId} />
      <MedarbejderListe/>
      <Anmeldelser />
      </>
      )}
    </>
  );
};