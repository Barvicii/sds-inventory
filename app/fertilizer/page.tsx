import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InventoryList from '@/components/InventoryList';

export default function FertilizerPage() {
  const STORES_PATH = '/ChemicalStores_20260108193555.xlsx';
  const CHEMICALS_PATH = '/Chemicals_20260108193431.xlsx';
  
  return (
    <>
      <Header 
        title="Fertilizer Shed" 
        subtitle="Fertilisers - Judco & Patutahi"
        showBackButton={true}
      />
      <InventoryList 
        storesUrl={STORES_PATH}
        chemicalsUrl={CHEMICALS_PATH}
        filterByType="Fert"
      />
      <Footer />
    </>
  );
}
