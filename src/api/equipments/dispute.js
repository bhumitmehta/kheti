
export const postDisputeData = async ({
    partner_id,
    email,
    name,
    phone_number,
    description,
    topic,
    equipment_id
  }) => {
    try {
      const res = await axios.post(`${url}/enquiry/partner-dispute`, {
        partner_id,
        email,
        name,
        phone_number,
        description,
        topic,
        equipment_id
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err.response?.data?.msg);
    }
  };
  