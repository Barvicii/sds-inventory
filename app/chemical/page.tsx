import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InventoryList from '@/components/InventoryList';

export default function ChemicalPage() {
  return (
    <>
      <Header 
        title="Chemical Shed" 
        subtitle="Chemical Products - Judco & Patutahi"
        showBackButton={true}
      />
      <InventoryList 
        filterByType="Chem"
      />
      <Footer />
    </>
  );
}
