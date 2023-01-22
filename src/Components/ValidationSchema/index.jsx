import * as Yup from "yup";
import { EM_ERR_EXCLAMATION_MARK, EM_ERR_VALID_EMAIL } from "../Config/emMessages";


export const AddBussFormSchema  = Yup.object({
    name : Yup?.string().required(EM_ERR_EXCLAMATION_MARK),
    yourContact:Yup?.string().required(EM_ERR_EXCLAMATION_MARK),
    bussinessName:Yup?.string().required(EM_ERR_EXCLAMATION_MARK),
    bussinessContact:Yup?.string().required(EM_ERR_EXCLAMATION_MARK),
    emailAddress:Yup?.string().email(EM_ERR_VALID_EMAIL).required(EM_ERR_EXCLAMATION_MARK),
    selectCategory:Yup?.string().required(EM_ERR_EXCLAMATION_MARK),
    selectFeature:Yup?.array().required(EM_ERR_EXCLAMATION_MARK),
    selectWeekDays:Yup?.array().required(EM_ERR_EXCLAMATION_MARK),
    address:Yup?.string().required(EM_ERR_EXCLAMATION_MARK),
    city:Yup?.string().required(EM_ERR_EXCLAMATION_MARK),
    district:Yup?.string().required(EM_ERR_EXCLAMATION_MARK),
});



export const addAdminUserSchema  = Yup.object({
    test : Yup.string().required(EM_ERR_EXCLAMATION_MARK),
})