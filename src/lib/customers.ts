import { Customer, RawCustomerData } from '@solara/api';
import { ResponseType, fetch } from '@tauri-apps/api/http';

export async function fetchCustomers(query: string) {
  try {
    const res = await fetch(
      `http://solaraenergias.net.br/admin/solar_view_api.php`,
      {
        query: { cliente_nome: query },
        responseType: ResponseType.Binary,
        method: 'GET',
      },
    );

    const buffer = Buffer.from(res.data as number[]);

    if (res.ok && buffer) {
      const decoder = new TextDecoder('iso-8859-1');
      const text =
        decoder
          .decode(buffer)
          .split(',')
          .slice(0, -1)
          .join(',')
          .replace(/(\r|\n|\t)/g, '') + ']';

      const data: RawCustomerData[] = JSON.parse(text);

      return data.map((obj: any) => new Customer(obj));
    }
  } catch (e) {
    console.error(e);
    return undefined;
  }
}
