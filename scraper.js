const fetch = require("node-fetch");

// credsString must contain a credentials token at the end of the string. the following examples work:
// "https://www.coursera.org/account/accomplishments/records/TOKEN"
// "www.coursera.org/account/accomplishments/certificate/TOKEN"
// "TOKEN"

export const getCredentials = async (credsString) => {
  const token = credsString.split("/").slice(-1)[0];
  const api = `https://www.coursera.org/api/memberships.v1?fields=courseId,enrolledTimestamp,grade,lastAccessedTimestamp,role,signatureTrackProfile,v1SessionId,vcMembershipId,vcMemberships.v1(certificateCode,grade,grantedAt),courses.v1(categories,certificatePartnerLogo,certificates,description,durationString,instructorIds,name,partnerIds,partnerLogo,photoUrl,startDate,v1Details,workload),partners.v1(classLogo,homeLink,logo,name,shortName),instructors.v1(firstName,fullName,lastName,middleName,prefixName,profileId,shortName,suffixName),v1Details.v1(aboutTheCourse,courseSyllabus,name,sessionIds,shortName),v1Sessions.v1(active,certificatesReleased,courseId,dbEndDate,durationString,eligibleForCertificate,gradingPolicyDistinction,gradingPolicyNormal,hasSigTrack,homeLink,instructorIds,startDay,startMonth,startYear,status,v1VcDetailId),signatureTrackProfiles.v1(firstName,lastName,middleName)&includes=courseId,signatureTrackProfile,vcMembershipId,courses.v1(categories,instructorIds,partnerIds,v1Details),v1Details.v1(sessionIds)&q=byCode&code=${token}&showHidden=true`;

  const response = await fetch(api)
    .then(res => {
      return res.json();
    })
    .then(data => {
      return {
        id: token,
        recipientName: `${
          data.linked["signatureTrackProfiles.v1"][0].firstName
        } ${data.linked["signatureTrackProfiles.v1"][0].lastName}`,
        courseName: data.linked["courses.v1"][0].name,
        courseDescription: data.linked["courses.v1"][0].description,
        issuerName: data.linked["partners.v1"][0].name,
        instructorName: data.linked["instructors.v1"][0].fullName,
        issuedOn: data.linked["vcMemberships.v1"][0].grantedAt
      };
    });

  return response;
}

