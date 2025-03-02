import PropTypes from "prop-types";
import { createContext, useState } from "react";


export const UserContext = createContext();

/**
 * 📝 UserContextProvider - Administrerer brugerdata
 * - Gemmer brugerdata globalt i Context
 * - Tillader opdatering af brugerdata
 */
export const UserContextProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    );
};

UserContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Lagringstype	Hvornår bruger man det?	Hvad sker der, når fanen lukkes?
// sessionStorage	Når brugerdata kun skal gemmes, mens fanen er åben (f.eks. login-session)	Data forsvinder, når fanen lukkes
// localStorage	Når data skal gemmes permanent (f.eks. brugerpræferencer, tema-indstillinger)	Data forbliver gemt, selv efter browserlukning




// import { createContext, useState, useEffect } from "react";

// export const UserContext = createContext();

// /**
//  * 📌 UserContextProvider - Administrerer brugerdata globalt
//  * - Gemmer brugerdata i state og `sessionStorage`
//  * - Sørger for, at brugeren forbliver logget ind efter en opdatering
//  */
// export const UserContextProvider = ({ children }) => {
//     // 📌 Hent eksisterende brugerdata fra sessionStorage (hvis der er nogen)
//     const [userData, setUserData] = useState(() => {
//         const storedUser = sessionStorage.getItem("user");
//         return storedUser ? JSON.parse(storedUser) : null;
//     });

//     // 📌 Gem brugerdata i sessionStorage, når det ændres
//     useEffect(() => {
//         if (userData) {
//             sessionStorage.setItem("user", JSON.stringify(userData));
//         } else {
//             sessionStorage.removeItem("user"); // Fjern, hvis brugeren logger ud
//         }
//     }, [userData]);

//     return (
        // <UserContext.Provider value={{ userData, setUserData }}>
        //     {children}
        // </UserContext.Provider>
//     );
// };


