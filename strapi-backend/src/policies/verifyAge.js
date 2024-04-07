module.exports = async (policyContext, config, { strapi }) => {
  const { data } = policyContext.request.body;
  const birthday = new Date(data.birthday);
  const today = new Date();
  let age = today.getFullYear() - birthday.getFullYear();
  const m = today.getMonth() - birthday.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
    age--;
  }
  if (age < 18) {
    console.log(`Registration attempt failed: User is under 18. Age calculated: ${age}`);
    return policyContext.response.badRequest('Users must be 18 years or older to register.');
  }
  console.log(`Age verification passed for user. Age calculated: ${age}`);
  return true;
};