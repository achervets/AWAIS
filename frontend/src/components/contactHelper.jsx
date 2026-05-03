const WEB3FORMS_URL = "https://api.web3forms.com/submit";
const ACCESS_KEY = "26492ee7-14d2-445c-9035-5f68b65fc78b";

export const contactHelper = async (formData) => {
    formData.append("access_key", ACCESS_KEY);

    const response = await fetch(WEB3FORMS_URL, {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || "Oops! Something went wrong.");
    }

    return data;
};