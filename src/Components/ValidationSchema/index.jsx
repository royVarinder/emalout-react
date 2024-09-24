import * as Yup from "yup";
import { EM_ERR_EXCLAMATION_MARK, EM_ERR_VALID_EMAIL } from "../Config/emMessages";


export const AddBussFormSchema = Yup.object({
    // user_name: Yup?.string().required(EM_ERR_EXCLAMATION_MARK),
    // user_contact: Yup?.string().required(EM_ERR_EXCLAMATION_MARK),
    // bussinessName: Yup?.string().required(EM_ERR_EXCLAMATION_MARK),
    // bussinessContact: Yup?.string().required(EM_ERR_EXCLAMATION_MARK),
    // emailAddress: Yup?.string().email(EM_ERR_VALID_EMAIL).required(EM_ERR_EXCLAMATION_MARK),
    // // selectCategory:Yup?.string().required(EM_ERR_EXCLAMATION_MARK),
    // selectFeature: Yup?.array().required(EM_ERR_EXCLAMATION_MARK),
    // selectWeekDays: Yup?.array().required(EM_ERR_EXCLAMATION_MARK),
    // address: Yup?.string().required(EM_ERR_EXCLAMATION_MARK),
    // city: Yup?.string().required(EM_ERR_EXCLAMATION_MARK),
    // district: Yup?.string().required(EM_ERR_EXCLAMATION_MARK),
});



export const addAdminUserSchema = Yup.object({
    admin_username: Yup.string().required(EM_ERR_EXCLAMATION_MARK),
    admin_password: Yup.string().required(EM_ERR_EXCLAMATION_MARK)
    // admin: Yup.string().required(EM_ERR_EXCLAMATION_MARK),
})


export const newsFormValidation = Yup.object({

})