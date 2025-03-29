export const BASE_URL = "http://montessori.website";

export const API_PATHS = {
  AUTH: {
    LOGIN: "/common/gettoken",
  },
  HEROS: {
    GET_HEROS: "/hero/heroapi/",
    CREATE_HERO: "/hero/heroapi/create",
    UPDATE_HERO: "/hero/heroapi/put/:id",
    DELETE_HERO: "/hero/heroapi/delete/:id",
  },
  FACILITIES: {
    GET_FACILITIES: "/facility/facilityapi/",
    CREATE_FACILITY: "/facility/facilityapi/create",
    UPDATE_FACILITY: "/facility/facilityapi/put/:id",
    DELETE_FACILITY: "/facility/facilityapi/delete/:id",
  },
  ACTIVITIES: {
    GET_ACTIVITIES: "/activity/activityapi/",
    CREATE_ACTIVITY: "/activity/activityapi/create",
    UPDATE_ACTIVITY: "/activity/activityapi/put/:id",
    DELETE_ACTIVITY: "/activity/activityapi/delete/:id",
  },
  CONTACT: {
    GET_CONTACTS: "/contact/contactapi/",
    CREATE_CONTACT: "/contact/contactapi/create",
    UPDATE_CONTACT: "/contact/contactapi/put/:id",
    DELETE_CONTACT: "/contact/contactapi/delete/:id",
  },
};
