export const BASE_URL = "http://montessori.website";

export const API_PATHS = {
  AUTH: {
    LOGIN: "/api/v1/auth/login",
  },
  HEROS: {
    GET_HEROS: "/hero/heroapi/",
    GET_HERO: "/api/v1/heros/:id",
    CREATE_HERO: "/api/v1/heros",
    UPDATE_HERO: "/api/v1/heros/:id",
    DELETE_HERO: "/api/v1/heros/:id",
  },
  FACILITIES: {
    GET_FACILITIES: "/facility/facilityapi/",
    GET_FACILITY: "/api/v1/heros/:id",
    CREATE_FACILITY: "/api/v1/heros",
    UPDATE_FACILITY: "/api/v1/heros/:id",
    DELETE_FACILITY: "/api/v1/heros/:id",
  },
  ACTIVITIES: {
    GET_ACTIVITIES: "/activity/activityapi/",
    GET_ACTIVITY: "/api/v1/heros/:id",
    CREATE_ACTIVITY: "/api/v1/heros",
    UPDATE_ACTIVITY: "/api/v1/heros/:id",
    DELETE_ACTIVITY: "/api/v1/heros/:id",
  },
};
