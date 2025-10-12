import CardTasks from '@/src/components/cards';
import FilterByStatusAndName from '@/src/components/filters/filterByStatusAndName';
import { ActionsheetFlatList, Box } from '@gluestack-ui/themed';

const data = [
  { id: 1, status: 'Conferência',  nota: '1231', descricao: 'É uma bota com caixa de equipamentoa aisudbnasiudhnsaiu', especi: 'Bota CAT-23435'},
  { id: 2, status: 'Estoque', nota: '13434', descricao: 'Equipamenteo de matraosidjasiuodhasuidhasiu', especi: 'Bota CAT-23435'}
]

export default function ClosedTasks() {
  return (
    <Box gap="$2">
      <FilterByStatusAndName />
      <ActionsheetFlatList
        data={data}
        renderItem={({ item }) => <CardTasks item={item} />}
        keyExtractor={(item: any) => item.id}
      />
    </Box>
  );
}
