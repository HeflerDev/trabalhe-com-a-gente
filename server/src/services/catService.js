import { catApiClient } from "./index.js";

export async function getImagesFromCatApi({
  limit = 10,
  page = 0,
  order = "RAND",
  has_breeds = 1,
  breed_ids,
  category_ids,
  sub_id,
}) {
  const params = new URLSearchParams({
    limit: limit.toString(),
    page: page.toString(),
    order,
    has_breeds: has_breeds.toString(),
  });

  if (breed_ids?.length) params.append("breed_ids", breed_ids.join(","));
  if (category_ids?.length)
    params.append("category_ids", category_ids.join(","));
  if (sub_id) params.append("sub_id", sub_id);

  const { data } = await catApiClient.get(
    `/images/search?${params.toString()}`,
  );

  console.log(data);

  return data;
}

export async function postVoteForCatApi(image_id, sub_id, value) {
  try {
    const payload = { image_id, sub_id, value };
    console.log("Posting vote with payload:", payload);
    const { data } = await catApiClient.post("/votes", payload);
    return data;
  } catch (err) {
    console.error("Error posting vote:", err.response?.data || err.message);
    throw new Error(err.message);
  }
}
