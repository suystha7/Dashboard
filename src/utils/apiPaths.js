// export const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
export const BASE_URL = "http://starkids.website";
// export const BASE_URL = "https://starkids-backend-leuf.onrender.com";

export const API_PATHS = {
  AUTH: {
    LOGIN: "/common/gettoken",
  },
  HOME:{
    API:"/common/api/count"
  },
  HEROS: {
    GET_HEROS: "/hero/heroapi",
    CREATE_HERO: "/hero/heroapi/create",
    UPDATE_HERO: "/hero/heroapi/patch",
    DELETE_HERO: "/hero/heroapi/delete",
  },
  FACILITIES: {
    GET_FACILITIES: "/facility/facilityapi",
    CREATE_FACILITY: "/facility/facilityapi/create",
    UPDATE_FACILITY: "/facility/facilityapi/patch",
    DELETE_FACILITY: "/facility/facilityapi/delete",
  },
  ACTIVITIES: {
    GET_ACTIVITIES: "/activity/activityapi",
    CREATE_ACTIVITY: "/activity/activityapi/create",
    UPDATE_ACTIVITY: "/activity/activityapi/patch",
    DELETE_ACTIVITY: "/activity/activityapi/delete",
  },
  CONTACT: {
    GET_CONTACTS: "/contact/contactapi",
    CREATE_CONTACT: "/contact/contactapi/create",
    UPDATE_CONTACT: "/contact/contactapi/put/:id",
    DELETE_CONTACT: "/contact/contactapi/delete/:id",
  },
  TESTIMONIALS:{
    GET_TESTIMONIALS: "/testimonial/testimonialapi",
    CREATE_TESTIMONIALS: "/testimonial/testimonialapi/create",
    UPDATE_TESTIMONIALS: "/testimonial/testimonialapi/patch",
    DELETE_TESTIMONIALS: "/testimonial/testimonialapi/delete",
  },
  PASSSWORD:{
      CHANGEPASSWORD:"/user/changePassword"
  },
  SETTINGS:{
    CREATE:"/dashsetting/dashsettingApi/create",
    GET:"/dashsetting/dashsettingApi",
    EDIT:"/dashsetting/dashsettingApi/patch",
    DELETE:"/dashsetting/dashsettingApi/delete"
  },
  WYSISYG:{
    TINYMCE:"/common/image/upload"
  },
};
