export async function getImagesFromCatApi({
  limit = 10,
  page = 0,
  order = "RAND",
  has_breeds = 0,
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

  const { data } = await axios.get(
    `${CAT_API_URL}/images/search?${params.toString()}`,
  );

  return data;
}
