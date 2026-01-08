import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InventoryList from '@/components/InventoryList';

export default function ChemicalPage() {
  const STORES_PATH = '/ChemicalStores_20260108193555.xlsx';
  const CHEMICALS_PATH = '/Chemicals_20260108193431.xlsx';
  
  return (
    <>
      <Header 
        title="Chemical Shed" 
        subtitle="Productos Químicos - Judco & Patutahi"
        showBackButton={true}
      />
      <InventoryList 
        storesUrl={STORES_PATH}
        chemicalsUrl={CHEMICALS_PATH}
        filterByType="Chem"
      />
      <Footer />
    </>
  );
}
