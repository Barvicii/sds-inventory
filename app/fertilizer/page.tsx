import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InventoryList from '@/components/InventoryList';

export default function FertilizerPage() {
  return (
    <>
      <Header 
        title="Fertilizer Shed" 
        subtitle="Fertilisers - Judco & Patutahi"
        showBackButton={true}
      />
      <InventoryList 
        filterByType="Fert"
      />
      <Footer />
    </>
  );
}
