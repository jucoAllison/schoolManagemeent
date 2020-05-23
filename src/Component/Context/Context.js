import React from "react";

export default React.createContext({
    termValue: null,
    yearValue: null,
    token: null,
    allowAccess: null,
    main_admin: null,
    login: (token) => {}
});