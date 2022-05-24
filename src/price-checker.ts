import axios from "axios";
import qs from "qs";

let crypto_compare_key = process.env.crypto_compare_key;

export async function getPrices(
  tokens: string[],
  fiatCurrency: string[] = ["USD"]
): Promise<any> {
  let response = await axios.get(
    "https://min-api.cryptocompare.com/data/pricemulti",
    {
      params: {
        api_key: crypto_compare_key,
        fsyms: tokens,
        tsyms: fiatCurrency,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "repeat" });
      },
    }
  );

  return response.data;
}
