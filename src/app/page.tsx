import CustomerTable from '@app/components/customer/table';
import Form from '@app/components/form';
import { SearchProvider } from '@app/context/search';
import Image from 'next/image';
import SolaraLogo from '../../public/solara.png';

export default function Home() {
  return (
    <main className="flex flex-col items-center w-full min-h-screen gap-4 px-10 pt-24 mx-auto">
      <div className="flex flex-col items-center gap-2">
        <Image className="w-12 h-12" src={SolaraLogo} alt="Logo Solara" />
        <h1 className="text-xl font-semibold">Dados do cliente</h1>
      </div>

      <SearchProvider>
        <div className="flex flex-col items-center w-full gap-16">
          <Form />
          <CustomerTable />
        </div>
      </SearchProvider>
    </main>
  );
}
