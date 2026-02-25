"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationstatus = exports.jobcategory = exports.jobmode = exports.Role = void 0;
var Role;
(function (Role) {
    Role["ADMIN"] = "admin";
    Role["USER"] = "user";
    Role["Hr"] = "hr";
    Role["Interviewer"] = "interviewer";
})(Role || (exports.Role = Role = {}));
var jobmode;
(function (jobmode) {
    jobmode["REMOTE"] = "remote";
    jobmode["HYBRID"] = "hybrid";
    jobmode["ONSITE"] = "onsite";
})(jobmode || (exports.jobmode = jobmode = {}));
var jobcategory;
(function (jobcategory) {
    jobcategory["FULLTIME"] = "fulltime";
    jobcategory["PARTTIME"] = "parttime";
    jobcategory["CONTRACT"] = "contract";
    jobcategory["INTERN"] = "intern";
})(jobcategory || (exports.jobcategory = jobcategory = {}));
var applicationstatus;
(function (applicationstatus) {
    applicationstatus["APPLIED"] = "applied";
    applicationstatus["REVIEWED"] = "reviewed";
    applicationstatus["INTERVIEW_SCHEDULED"] = "interview_scheduled";
    applicationstatus["SHORTLISTED"] = "shortlisted";
    applicationstatus["SELECTED"] = "selected";
    applicationstatus["REJECTED"] = "rejected";
    applicationstatus["ACCEPTED"] = "accepted";
})(applicationstatus || (exports.applicationstatus = applicationstatus = {}));
//# sourceMappingURL=Role.js.map