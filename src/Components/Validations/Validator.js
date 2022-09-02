import $ from "jquery";

import moment from "moment";

// const getTimeZone = () => {
//     if (userTimeZone) {
//         return decryptData(userTimeZone);
//     } else {
//         return "";
//     }
// };
export function Validations() {
    const userTimeZone = getDecryptedID(SPD_ORG_ZONE_NAME);
    // console.log("validation called");

    // const timezone = getTimeZone();

    //footer server Timezone
    var d = new Date();
    var orgDate = d.toLocaleString('en-US', { timeZone: "America/Vancouver" });
    // console.log("date", orgDate.split(",")[0]);



    // var update = function () {
    //     date = moment.tz(moment(), timezone);
    //     datetime.html(date.format("dddd, MMMM  YYYY, h:mm:ss a"));
    // };
    // console.log("update", update());


    let aip_digit_characters = 8;
    let aip_lower_case_characters = 1;
    let aip_max_characters = 15;
    let aip_min_characters = 8;
    let aip_special_characters = 1;
    let aip_upper_case_characters = 1;
    let email_pin_length = SPD_EMAIL_PIN_LENGTH;
    let numberMaxLength = 8;
    let checkMaxValue = 0;



    if (getID(SPD_PASS_POLICIES)) {
        let encryptedPolicies = decryptObj(getID(SPD_PASS_POLICIES))
        // console.log(decryptObj(getID(SPD_PASS_POLICIES)));
        aip_digit_characters = encryptedPolicies.aip_digit_characters;
        aip_lower_case_characters = encryptedPolicies.aip_lower_case_characters
        aip_max_characters = encryptedPolicies.aip_max_characters
        aip_min_characters = encryptedPolicies.aip_min_characters
        aip_special_characters = encryptedPolicies.aip_special_characters
        aip_upper_case_characters = encryptedPolicies.aip_upper_case_characters
    }

    // var aip_digit_characters = encryptedPolicies.aip_digit_characters;
    // var aip_lower_case_characters = encryptedPolicies.aip_lower_case_characters;
    // var aip_max_characters = encryptedPolicies.aip_max_characters;
    // var aip_min_characters = encryptedPolicies.aip_min_characters;
    // var aip_special_characters = encryptedPolicies.aip_special_characters;
    // var aip_upper_case_characters = encryptedPolicies.aip_upper_case_characters;
    // var email_pin_length = SPD_EMAIL_PIN_LENGTH;



    // aip_digit_characters: "1"
    // aip_lower_case_characters: "1"
    // aip_max_characters: "15"
    // aip_min_characters: "8"
    // aip_special_characters: "1"
    // aip_upper_case_characters: "1"

    $.extend($.validator.messages, {
        required: "<i class='fa fa-exclamation-triangle'></i>",
        // min: '<div class="error_tool_tip"> Past date not allowed!</div><i class="fa fa-exclamation-triangle"></i>',
        // max: '<div class="error_tool_tip"> Future date not allowed!</div><i class="fa fa-exclamation-triangle"></i>',
        maxlength: '<div class="error_tool_tip"> Please enter no more than {0} characters.</div><i class="fa fa-exclamation-triangle"></i>',
        number: '<div class="error_tool_tip"> Please enter a valid number. </div><i class="fa fa-exclamation-triangle"></i>',
        email: '<div class="error_tool_tip"> Please enter a valid email. </div><i class="fa fa-exclamation-triangle"></i>',
        dateISO: '<div class="error_tool_tip"> Please enter a valid date. </div><i class="fa fa-exclamation-triangle"></i>',
    });




    $.validator.addMethod("charUc", function (value, element, params) {
        const TestCapitalLetter = new RegExp(
            `(?=.*?[A-Z]){${aip_upper_case_characters}}`
        );
        // var value = value.trim();
        // var exp = '!@#$%';

        if (!TestCapitalLetter.test(value.trim())) {
            // alert('in')
            return false;
        } else {
            // alert('out')
            return true;
        }
    }, "<div class='error_tool_tip'>Password must contain at least " + aip_upper_case_characters + " upper character.</div><i class='fa fa-exclamation-triangle'></i>");



    $.validator.addMethod("specialcheck", function (value, element, params) {
        const TestSpecialCharacter = new RegExp(
            `(?=.*?[~@!#$%^&*()_+=-]){${aip_special_characters}}`
        );
        // var value = value.trim();
        // var exp = '!@#$%';

        if (!TestSpecialCharacter.test(value.trim())) {
            // alert('in')
            return false;
        } else {
            // alert('out')
            return true;
        }
    }, "<div class='error_tool_tip'>Password must contain at least " + aip_special_characters + " special character.</div><i class='fa fa-exclamation-triangle'></i> ");

    {/* <div class='error_tool_tip'>Password must contain at least 1 lower character.</div><i class='fa fa-exclamation-triangle'></i> */ }

    $.validator.addMethod("charLc", function (value, element) {
        const TestLowerCaseLetter = new RegExp(
            `(?=.*?[a-z]){${aip_lower_case_characters}}`
        );
        // var value = value.trim();
        // var exp = '!@#$%';

        if (!TestLowerCaseLetter.test(value.trim())) {
            // alert('in')
            return false;
        } else {
            // alert('out')
            return true;
        }
    }, "<div class='error_tool_tip'>Password must contain at least " + aip_lower_case_characters + " lower character.</div><i class='fa fa-exclamation-triangle'></i> ");




    $.validator.addMethod("numCheck", function (value, element, params) {
        const TestNumericLetter = new RegExp(
            `(?=.*?[0-9]){${aip_digit_characters}}`
        );
        // var value = value.trim();
        // var exp = '!@#$%';

        if (!TestNumericLetter.test(value.trim())) {
            // alert('in')
            return false;
        } else {
            // alert('out')
            return true;
        }

    }, "<div class='error_tool_tip'>Password must contain at least " + aip_digit_characters + " numeric character.</div><i class='fa fa-exclamation-triangle'></i>");


    $.validator.addMethod("checkValidEmail", function (value, element, params) {
        const TestNumericLetter = new RegExp(
            `(?=.*?[0-9]){${aip_digit_characters}}`
        );
        // var value = value.trim();
        // var exp = '!@#$%';

        if (!TestNumericLetter.test(value.trim())) {
            // alert('in')
            return false;
        } else {
            // alert('out')
            return true;
        }

    }, "<div class='error_tool_tip'>Password must contain at least " + aip_digit_characters + " numeric character.</div><i class='fa fa-exclamation-triangle'></i>");


    $.validator.addMethod("charMaxlen", function (value, element, params) {
        value = value.trim();
        if (value.length > aip_max_characters) {
            return false;
        } else {
            return true;
        }
    }, "<div class='error_tool_tip'>Password length should not be greater than " + aip_max_characters + " characters.</div><i class='fa fa-exclamation-triangle'></i>");



    $.validator.addMethod("charMinlen", function (value, element, params) {
        // alert(minLength);
        var value = value.trim();
        if (value.trim().length < aip_min_characters) {
            return false;
        } else {
            return true;
        }
    }, "<div class='error_tool_tip'>Password must contain at least " + aip_min_characters + " characters.</div><i class='fa fa-exclamation-triangle'></i>");



    $.validator.addMethod("emailPinLength", function (value, element, params) {
        // alert(minLength);
        var value = value.trim();
        if (value.trim().length < email_pin_length) {
            return false;
        } else {
            return true;
        }
    }, "<div class='error_tool_tip'>Pin must contain " + email_pin_length + " characters.</div><i class='fa fa-exclamation-triangle'></i>");



    $.validator.addMethod("dobMaxDate", function (value, element, params) {
        var now = new Date(orgDate);
        var myDate = new Date(value);
        console.log("dobMax", now, "||", myDate);
        return this.optional(element) || myDate < now;

    }, "<div class='error_tool_tip'>Future date not allowed</div><i class='fa fa-exclamation-triangle'></i>");


    $.validator.addMethod("datePickerMaxDate", function (value, element, params) {
        var now = new Date(orgDate);
        var myDate = new Date(value);
        return this.optional(element) || myDate > now;

    }, "<div class='error_tool_tip'>Past date not allowed</div><i class='fa fa-exclamation-triangle'></i>");


    $.validator.addMethod("datePickerMinimumDate", function (value, element, params) {
        var now = new Date(orgDate);
        var myDate = new Date(value);
        return this.optional(element) || myDate < now;

    }, "<div class='error_tool_tip'>Future date not allowed</div><i class='fa fa-exclamation-triangle'></i>");


    $.validator.addMethod("zipcode", function (value, element) {
        return this.optional(element) || /^\d{5}(?:-\d{4})?$/.test(value);
    }, "<div class='error_tool_tip'>Please provide a valid zipcode.</div><i class='fa fa-exclamation-triangle'></i>");

    $.validator.addMethod("ifDateInCurrentYear", function (value, element, params) {
        // var now = new Date(orgDate);
        // var myDate = new Date(value);
        // now = moment(myDate).subtract(364, "days").toDate();

        // console.log("dates==", now, myDate);
        // if (now) {
        //     return false;
        // } else {
        //     return true;
        // }


    }, "<div class='error_tool_tip'>You can select only previous year only!.</div><i class='fa fa-exclamation-triangle'></i>");



}